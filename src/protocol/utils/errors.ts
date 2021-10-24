/**
 * Protocol errors
 */

import { connection } from 'websocket';
import { Logger } from '../../console/utils/logger';

/** Respond with error and close connection */
export function SendErrorAndClose(sock: connection, msg?: string): void {
    Logger.Error('Protocol error: ' + msg);
    sock.close(1002, msg ?? 'Protocol error');
}
