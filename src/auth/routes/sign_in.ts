/**
 * Auth sign in path
 */

import { Express } from 'express';
import { GetUserActions } from '../../mongo/main';
import * as crypto from 'crypto-js';
import { GenerateJWT } from '../utils/jwt';
import { Logger } from '../../console/utils/logger';

/** Sign in */
export async function RegisterSignIn(router: Express): Promise<void> {
    router.post('/sign/in', async (req, res) => {
        Logger.Info(`New sign up request from ${req.ip}`, req.ip);
        if (!req.body || !req.body.login || !req.body.password) {
            Logger.Warning(`Sign up request from ${req.ip} declined: unexpected body`, req.ip);
            res.status(400).end(JSON.stringify({
                success: false,
                msg: 'err_invalid_body'
            }));
            return;
        }

        // Try to get user
        const user = await GetUserActions().findByName(req.body.login);
        if (!user) {
            Logger.Warning(`No user found with login ${req.body.login} for request from ${req.ip}`, req.body.login, req.ip);
            Logger.Warning(`Sign up request from ${req.ip} declined: user not found`, req.ip);
            res.status(401).end(JSON.stringify({
                success: false,
                msg: 'err_not_found'
            }));
            return;
        }

        // Make password hash
        const hasher = crypto.algo.SHA256.create();
        hasher.update(req.body.password);
        const hash = hasher.finalize().toString();

        // Check if name and password approach
        if (user.get('name') !== req.body.login || user.get('password') !== hash) {
            Logger.Warning(`Sign up request from ${req.ip} declined: incorrect password`, req.ip);
            res.status(401).end(JSON.stringify({
                success: false,
                msg: 'err_not_found'
            }));
            return;
        }

        // All ok, authorize
        const jwt = GenerateJWT(user.get('name'));
        await GetUserActions().update(user.get('_id'), {
            token: jwt
        });

        Logger.Success(`Success login from ${req.ip}, sending JWT: ${jwt}`, req.ip, jwt);
        res.cookie('RS_JWT', jwt, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            secure: false,
            httpOnly: true
        }).status(200).end(JSON.stringify({
            success: true,
            token: jwt
        }));
    });
}
