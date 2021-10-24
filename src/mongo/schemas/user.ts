/**
 * Mongo user schema
 */

import { Schema, model } from 'mongoose';

/** User schema */
export const UserSchema = model('user', new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    blocked: {
        type: Boolean,
        default: false
    },
    state: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
        default: 0 // 0 - free plan, 1 - premium plan, 2 - admin
    },
    token: {
        type: String,
        default: ''
    }
}), 'users');
