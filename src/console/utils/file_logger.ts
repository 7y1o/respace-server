/**
 * Log file
 */

import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { resolve, normalize } from 'path';
import { Logger } from './logger';

/** Create stream */
export function CreateLogStream(dir: string, file: string): Promise<WriteStream> {
    const logDisExists = existsSync(resolve(normalize(dir)));

    if (logDisExists) {
        Logger.Success('Log dir exists');
    } else {
        Logger.Warning('Log dir doesn\'t exists, creating...');
        mkdirSync(resolve(normalize(dir)));
        Logger.Success('Log dir created successfully');
    }

    return new Promise((res) => {
        const stream = createWriteStream(resolve(dir, file), {
            autoClose: true,
            encoding: 'utf8',
            flags: 'w'
        });
        stream.on('open', () => res(stream));
    });
}
