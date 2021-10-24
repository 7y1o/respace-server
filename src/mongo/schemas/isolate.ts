/**
 * Mongo isolate schema
 */

import { Schema, model } from 'mongoose';

/** User schema */
export const IsolateSchema = model('isolate', new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    running: {
        type: Boolean,
        required: true,
        default: false
    },
    specs: {
        cpu: {
            type: Number,
            required: true,
            min: 5,
            max: 100,
            default: 15
        },
        ram: {
            type: Number,
            required: true,
            min: 128,
            max: 2048,
            default: 128
        }
    },
    shared: [ {
        id: Schema.Types.ObjectId,
        rights: {
            type: Number,
            min: 0,
            max: 1,
            default: 0 // 0 - base user, 1 - admin
        }
    } ]
}), 'isolates');
