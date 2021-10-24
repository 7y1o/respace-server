/**
 * Mongo isolate actions
 */

import { IsolateSchema } from '../schemas/isolate';
import { Document, Schema } from 'mongoose';

/** User updatable data */
type IsolateUpdateData = {
    running?: boolean,
    specs?: {
        cpu: number,
        ram: number
    },
    shared: {
        id: Schema.Types.ObjectId,
        rights: 0 | 1
    }[]
};

/** Add new isolate */
export async function AddIsolate(cpu: number, ram: number, owner: Schema.Types.ObjectId): Promise<void> {
    await IsolateSchema.create({
        owner,
        running: false,
        specs: {
            cpu, ram
        },
        shared: []
    });
}

/** Get isolate info */
export async function GetIsolate(id: Schema.Types.ObjectId): Promise<Document> {
    return await IsolateSchema.findOne({ _id: id }).exec();
}

/** Update isolate info */
export async function UpdateIsolate(id: Schema.Types.ObjectId, data: IsolateUpdateData): Promise<void> {
    await IsolateSchema.updateOne({
        _id: id
    }, data);
}

/** Delete user */
export async function DeleteIsolate(id: Schema.Types.ObjectId): Promise<void> {
    await IsolateSchema.deleteOne({ _id: id });
}

/** Get isolate of users */
export async function GetUserIsolates(id: Schema.Types.ObjectId): Promise<Document[]> {
    return await IsolateSchema.find({
        owner: id
    }).exec();
}
