/**
 * Protocol handlers switcher
 */

import { connection, Message } from 'websocket';
import { DecodeMessage, MessageData } from '../utils/packets';
import { SendErrorAndClose } from '../utils/errors';
import { HandleHandshake } from './handshake';
import { DecryptMessage } from '../utils/crypto';
import { HasConnection, serverKeys } from '../utils/holder';
import { HandleExchange } from './exchange';

/** Check needed handler */
export async function HandleMessage(sock: connection, msg: Message): Promise<void> {

    // Check if message have non-binary type
    if (msg.type !== 'binary') {
        SendErrorAndClose(sock, 'Unexpected type of message');
        return;
    }

    // Check message type
    if (msg.binaryData.toString().charAt(0) === '[') { // Not encrypted
        if (HasConnection(sock.remoteAddress)) {
            SendErrorAndClose(sock, 'Unsecure connection');
            return;
        }

        // Decode message
        let packet: MessageData;
        try {
            packet = DecodeMessage(msg.binaryData);
        } catch (e) {
            SendErrorAndClose(sock, 'Packet parsing error');
            return;
        }

        // Call handshake handler
        await HandleHandshake(sock, packet);
    } else { // Encrypted
        if (!HasConnection(sock.remoteAddress)) {
            SendErrorAndClose(sock, 'Unknown connection');
            return;
        }

        // Decrypt and decode message
        let messageContent: MessageData;
        try {
            messageContent = DecodeMessage(await DecryptMessage(msg.binaryData, serverKeys.priv));
        } catch (e) {
            SendErrorAndClose(sock, 'Decrypt message error');
            return;
        }

        // Check message code and call handler
        if ([ 'hct', 'hce' ].includes(messageContent.code)) {
            await HandleHandshake(sock, messageContent);
        } else {
            await HandleExchange(sock, messageContent);
        }
    }
}
