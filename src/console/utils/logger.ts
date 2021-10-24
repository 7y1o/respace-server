/**
 * Console logger
 */

import dayjs from 'dayjs';
import chalk from 'chalk';
import { WriteStream } from 'fs';

/** Logger observer */
export const LogObserve: WriteStream[] = [];

/** Logger class */
export class Logger {

    /** Generate date-time header for log out */
    private static GenerateHeader(wb?: boolean): string {
        return wb ?
            `${dayjs().format('DD.MM.YYYY-HH:mm:ss')}`
            : chalk.bgGrey(` ${
                chalk.whiteBright(dayjs().format('DD.MM.YYYY-HH:mm:ss'))
            } `);
    }

    /** Log out */
    private static Log(message: string, color: chalk.ChalkFunction, ...markers: string[]): void {
        let outMessage = `${Logger.GenerateHeader()}: ${color(message)}`;

        // Mark message parts
        markers.forEach((m) => outMessage = outMessage.replaceAll(
            m,
            chalk.whiteBright(chalk.underline(chalk.bgYellowBright(m)))
        ));

        // Write to log
        // A console.log(outMessage);
    }

    /** Log to file */
    private static LogFile(message: string, ...markers: string[]): void {
        let outMessage = message;
        markers.forEach((m) => outMessage = outMessage.replaceAll(m, m.toUpperCase()));

        for (const stream of LogObserve) {
            stream.write(`${Logger.GenerateHeader(true)}: ${outMessage}\n`);
        }
    }

    /** Log out info */
    public static Info(message: string, ...markers: string[]): void {
        Logger.Log(message, chalk.blueBright, ...markers);
        Logger.LogFile(message, ...markers);
    }

    /** Log out success */
    public static Success(message: string, ...markers: string[]): void {
        Logger.Log(message, chalk.greenBright, ...markers);
        Logger.LogFile(message, ...markers);
    }

    /** Log out warning */
    public static Warning(message: string, ...markers: string[]): void {
        Logger.Log(message, chalk.yellowBright, ...markers);
        Logger.LogFile(message, ...markers);
    }

    /** Log out error */
    public static Error(message: string, ...markers: string[]): void {
        Logger.Log(message, chalk.redBright, ...markers);
        Logger.LogFile(message, ...markers);
    }
}
