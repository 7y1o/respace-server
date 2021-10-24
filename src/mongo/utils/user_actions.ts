/**
 * Mongo user actions
 */

import { UserSchema } from '../schemas/user';
import { Document, Schema } from 'mongoose';

/** User updatable data */
type UserUpdateData = {
    password?: string,
    blocked?: boolean,
    state?: 0 | 1 | 2,
    token?: string
};

/** Add new user */
export async function AddUser(name: string, password: string, state: 0 | 1 | 2): Promise<void> {
    await UserSchema.create({
        name, password, state
    });
}

/** Get user info */
export async function GetUserById(id: Schema.Types.ObjectId): Promise<Document> {
    return await UserSchema.findOne({ _id: id }).exec();
}

/** Get user info by username */
export async function GetUserByUsername(username: string): Promise<Document> {
    return await UserSchema.findOne({ name: username }).exec();
}

/** Update user info */
export async function UpdateUser(id: Schema.Types.ObjectId, data: UserUpdateData): Promise<void> {
    await UserSchema.updateOne({
        _id: id
    }, data);
}

/** Delete user */
export async function DeleteUser(id: Schema.Types.ObjectId): Promise<void> {
    await UserSchema.deleteOne({ _id: id });
}
