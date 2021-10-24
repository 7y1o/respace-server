/**
 * Console prompt module
 */

import { Logger } from './logger';
import { commands } from '../commands';
import prompt from 'prompts';
import chalk from 'chalk';

/** Start prompt cycle */
export async function StartPrompt(): Promise<void> {
    const askPrompt = async () => {
        // Create whitespace between commands
        console.log();

        // Get command
        const gotCMD = (await prompt([
            {
                name: 'cmd',
                type: 'text',
                message: 'CMD',
                validate: (v: string) => {
                    return commands[v.split(' ')[0].trim()] ? true : chalk.redBright('Command not found');
                }
            }
        ])).cmd;

        // Parse and get command
        const parsedCMD: string[] = gotCMD.split(' ').map((i) => i.trim());
        const command = commands[parsedCMD[0]];

        // Get command
        if (!command) {
            console.log(chalk.redBright('Command not found'));
        } else {
            await command.executor(...parsedCMD.slice(1));
        }

        // New cycle
        askPrompt().catch((err) => {
            Logger.Error(err.message);
            StartPrompt();
        });
    };

    // Start prompt
    askPrompt().catch((err) => {
        Logger.Error(err.message);
        StartPrompt();
    });
}
