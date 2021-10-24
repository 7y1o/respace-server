/**
 * Mongo main module
 */

import { ConnectMongo } from './utils/connect';
import { AddUser, DeleteUser, GetUserById, GetUserByUsername, UpdateUser } from './utils/user_actions';
import { AddIsolate, DeleteIsolate, GetIsolate, GetUserIsolates, UpdateIsolate } from './utils/isolate_actions';
import { Logger } from '../console/utils/logger';

/** Setup mongodb */
export async function StartDatabaseModule(): Promise<void> {
    await ConnectMongo({
        username: 're',
        password: 'space',
        database: 'respace',
        host: 'localhost',
        port: 27017
    });
    Logger.Success('MongoDB successfully connected');
}

/** Get user actions */
export function GetUserActions() {
    return {
        findById: GetUserById,
        findByName: GetUserByUsername,
        add: AddUser,
        update: UpdateUser,
        delete: DeleteUser
    };
}

/** Get isolate actions */
export function GetIsolateActions() {
    return {
        find: GetIsolate,
        add: AddIsolate,
        update: UpdateIsolate,
        delete: DeleteIsolate,
        listByUser: GetUserIsolates
    };
}
