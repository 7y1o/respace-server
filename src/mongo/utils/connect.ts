/**
 * Mongo connect module
 */

import { connect } from 'mongoose';

/** Connection info type */
type ConnectionInfo = {
    username: string,
    password: string,
    database: string
    host    : string,
    port    : number,
};

/** Make mongodb connection */
export async function ConnectMongo(info: ConnectionInfo): Promise<void> {
    const url = `mongodb://${info.username}:${info.password}@${info.host}:${info.port}/${info.database}?authSource=admin`;
    await connect(url);
}
