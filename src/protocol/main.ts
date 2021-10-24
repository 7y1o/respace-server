/**
 * Protocol main script
 */

import { StartSocket } from './socket';

/** Self-run in async context */
export async function StartSocketModule(port: number): Promise<boolean> {
    try {
        await StartSocket(port);
        return true;
    } catch (e) {
        return false;
    }
}
