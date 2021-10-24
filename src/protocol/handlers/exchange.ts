/**
 * Protocol exchange message handlers
 */

import { connection } from 'websocket';
import { EncodeMessage, MessageData } from '../utils/packets';
import { SendErrorAndClose } from '../utils/errors';
import { MessageCodes } from '../utils/codes';
import { EncryptMessage } from '../utils/crypto';
import { GetConnection } from '../utils/holder';

/** Exchange error */
function ExchangeError(sock: connection, code: MessageCodes): void {
    sock.sendBytes(EncodeMessage({ code, body: false }));
    SendErrorAndClose(sock, 'Exchange error');
}

/** Exchange handler */
export async function HandleExchange(sock: connection, msg: MessageData): Promise<void> {

    // Handle action by code
    switch (msg.code) {

        // Start isolate
        case 'eci0': {
            if (!Array.isArray(msg.body)) {
                sock.sendBytes(await EncryptMessage(
                    EncodeMessage({
                        code: 'esif',
                        body: 'err_invalid_body'
                    }),
                    GetConnection(sock.remoteAddress).pub
                ));
                return;
            }

            // TODO: start isolate
            return;
        }

        // Stop isolate
        case 'eci1': {
            if (!Array.isArray(msg.body)) {
                sock.sendBytes(await EncryptMessage(
                    EncodeMessage({
                        code: 'esif',
                        body: 'err_invalid_body'
                    }),
                    GetConnection(sock.remoteAddress).pub
                ));
            }
        }
    }

    ExchangeError(sock, 'eeu');
}
