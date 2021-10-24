/**
 * Protocol packets encoder and decoder
 */

import { MessageCodes } from './codes';

/** Message type */
export type MessageData = {
    code: MessageCodes,
    body?: JsonWebKey | string | number | boolean | unknown[] | {
        [key: string]: MessageData['body']
    }
};

/** Encode message */
export function EncodeMessage(message: MessageData): Buffer {
    return Buffer.from(JSON.stringify([
        [ message.code ],
        message.body
    ]));
}

/** Decode message */
export function DecodeMessage(message: Buffer): MessageData {
    const decoded = JSON.parse(message.toString());
    return {
        code: decoded[0][0],
        body: decoded[1]
    };
}
