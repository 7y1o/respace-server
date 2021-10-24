/**
 * Protocol server holder script
 */

import { connection, server as WebSocketServer } from 'websocket';
import { RemoveConnection, serverKeys } from './utils/holder';
import { HandleMessage } from './handlers/switcher';
import { GenerateRSA } from './utils/crypto';
import { createServer } from 'http';
import { CheckOrigin } from './utils/origin';
import { Logger } from '../console/utils/logger';

/** Start server */
export async function StartSocket(port: number): Promise<void> {

    // Setup server keys
    const keys = await GenerateRSA();
    [ serverKeys.pub, serverKeys.priv ] = [ keys.pub, keys.priv ];

    // Setup HTTP server
    const httpServer = createServer();
    httpServer.listen(port, () => {
        Logger.Success(`Protocol module started on ${port}`, port.toString());
    });

    // Setup WebSocket server
    const wss = new WebSocketServer({
        httpServer,
        autoAcceptConnections: false
    });

    // Setup messages
    wss.on('request', async (req) => {
        Logger.Info(`New connection from ${req.remoteAddress}`, req.remoteAddress);
        
        // Check origin
        if (!CheckOrigin(req.origin)) {
            Logger.Warning(`Connection from ${req.remoteAddress} rejected: origin is not allowed`, req.remoteAddress);
            req.reject(1008, 'err_origin');
            return;
        }

        // Create connection
        let connection;
        try {
            connection = req.accept('rstp', req.origin);
        } catch (e) {
            Logger.Warning(`Cannot accept connection from ${req.remoteAddress}: accept exception`, req.remoteAddress);
            return;
        }

        // Setup socket events
        try {
            SetupSocketEvents(connection);
        } catch (e) {
            Logger.Warning(`Error on socket events setup for ${req.remoteAddress}: ${e.message}`, req.remoteAddress, e.message);
        }
    });
}

/** Setup handlers for message and close events */
function SetupSocketEvents(conn: connection): void {

    // Message event
    conn.on('message', async (msg) => await HandleMessage(conn, msg));

    // Close event
    conn.on('close', () => {
        Logger.Info(`Connection from ${conn.remoteAddress} closed`, conn.remoteAddress);
        RemoveConnection(conn.remoteAddress);
    });

    // Error event
    conn.on('error', (err) => {
        Logger.Info(`Error from ${conn.remoteAddress}: ${err.message}`, conn.remoteAddress, err.message);
    });
}
