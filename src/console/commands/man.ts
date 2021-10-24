import { commands } from '../commands';
import chalk from 'chalk';

/** Get info about command */
export async function Man(...args: string[]): Promise<void> {
    if (!args[0]) {
        console.log(chalk.yellowBright('Usage: man <command>'));
        return;
    }

    // Check command exists
    if (!commands[args[0]]) {
        console.log(chalk.redBright('Command not found'));
    } else {
        console.log(commands[args[0]].man().split('\n').map((i) => '  ' + i).join('\n'));
    }
}

/** Get man of man ;) */
export function ManMan(): string {
    return 'Are you sure? Seriously?';
}
