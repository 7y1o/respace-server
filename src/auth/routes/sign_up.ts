/**
 * Auth sign in path
 */

import { Express } from 'express';
import { GetUserActions } from '../../mongo/main';
import * as crypto from 'crypto-js';

/** Sign in */
export async function RegisterSignUp(router: Express): Promise<void> {
    router.post('/sign/up', async (req, res) => {

        console.log('Got new sign up request from ' + req.ip);

        if (!req.body || !req.body.login || !req.body.password) {
            res.status(400).end(JSON.stringify({
                success: false,
                msg: 'err_invalid_body'
            }));
            return;
        }

        // Try to get user
        const user = await GetUserActions().findByName(req.body.login);
        if (user) {
            res.status(400).end(JSON.stringify({
                success: false,
                msg: 'err_user_already_exists'
            }));
            return;
        }

        // Make password hash
        const hasher = crypto.algo.SHA256.create();
        hasher.update(req.body.password);
        const hash = hasher.finalize().toString();

        // Add new user
        await GetUserActions().add(req.body.login, hash, 0);

        res.status(200).end(JSON.stringify({
            success: true
        }));
    });
}
