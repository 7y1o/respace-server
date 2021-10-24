/**
 * Logger main module
 */

import { CreateLogStream } from './utils/file_logger';
import { Logger, LogObserve } from './utils/logger';
import dayjs from 'dayjs';
import { StartPrompt } from './utils/prompt';

/** Start logger */
export async function StartConsoleModule(): Promise<void> {
    LogObserve.push(await CreateLogStream([
            __dirname,
            'logs'
        ].join('/'),
        `${dayjs().format('DD-MM-YYYY_HH-mm-ss')}.log`
    ));
    Logger.Success('Logger module started successfully');
}

/** Start console */
export async function StartLoggerModule(): Promise<void> {
    Logger.Success('Console module started successfully');
    StartPrompt().catch((err) => Logger.Error('Prompt module error: ' + err.message));
}
