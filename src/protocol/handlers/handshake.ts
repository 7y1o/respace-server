/**
 * Protocol handshake message handlers
 */

import { connection } from 'websocket';
import { EncodeMessage, MessageData } from '../utils/packets';
import { SendErrorAndClose } from '../utils/errors';
import { EncryptMessage } from '../utils/crypto';
import { AddConnection, GetConnection, HasConnection, serverKeys, UpdateConnection } from '../utils/holder';
import { MessageCodes } from '../utils/codes';

/** Handshake error */
function HandshakeError(sock: connection, code: MessageCodes): void {
    sock.sendBytes(EncodeMessage({ code, body: false }));
    SendErrorAndClose(sock, 'Handshake error');
}

/** Handshake handler */
export async function HandleHandshake(sock: connection, msg: MessageData): Promise<void> {

    // Handle action by code
    switch (msg.code) {

        // Handshake start
        case 'hsr': {

            // Add new connection and respond with server pub key
            AddConnection(sock.remoteAddress, msg.body as JsonWebKey);
            sock.sendBytes(EncodeMessage({
                code: 'hsy',
                body: serverKeys.pub
            }));
            return;
        }
        
        // Handshake test
        case 'hct': {
            
            // Check is connection exists
            if (!HasConnection(sock.remoteAddress)) {
                HandshakeError(sock, 'htf');
                return;
            }
            
            // Check message
            if (msg.body !== 'Ave, ReSpace') {
                sock.sendBytes(await EncryptMessage(
                    EncodeMessage({
                        code: 'hts',
                        body: 'Ave, ReSpace'
                    }),
                    GetConnection(sock.remoteAddress).pub
                ));
            } else {
                sock.sendBytes(EncodeMessage({
                    code: 'htf',
                    body: 'ok'
                }));
            }
            return;
        }

        // Handshake end
        case 'hce': {

            // Check is connection exists
            if (!HasConnection(sock.remoteAddress)) {
                HandshakeError(sock, 'hef');
                return;
            }

            // Check message
            if (msg.body !== 'ok') {
                HandshakeError(sock, 'hef');
                return;
            } else {
                sock.sendBytes(await EncryptMessage(
                    EncodeMessage({
                        code: 'hes',
                        body: false
                    }),
                    GetConnection(sock.remoteAddress).pub
                ));

                // Now connection between user and server is secure
                UpdateConnection(sock.remoteAddress, {
                    auth: true
                });
                return;
            }
        }
    }

    HandshakeError(sock, 'hue');
}
