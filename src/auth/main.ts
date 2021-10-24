/**
 * Auth main module
 */

import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { RegisterSignIn } from './routes/sign_in';
import { RegisterSignUp } from './routes/sign_up';
import { Logger } from '../console/utils/logger';

/** Setup auth module */
export async function StartAuthModule(port: number): Promise<void> {
    const app = express();
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.use((req,res,next) => {
        res.header('Content-Type', 'application/json');
        next();
    });
    app.listen(port, () => {
        Logger.Success(`Auth module start successfully (port: ${port})`, port.toString());
    });

    // Setup Express routers
    await SetupRoutes(app);
}

/** Setup routes */
async function SetupRoutes(router: Express): Promise<void> {
    await RegisterSignIn(router);
    await RegisterSignUp(router);
}
