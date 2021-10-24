import { commands } from '../commands';
import chalk from 'chalk';

/** Help cmd */
export async function Help(): Promise<void> {
    console.log(chalk.cyanBright('Commands list:'));
    
    // Iterate all commands
    for (const command in commands) {
        console.log(`   - ${chalk.yellowBright(command)}: ${commands[command].man().split('\n')[1]?.substr(13) ?? 'Unknown'}`);
    }
}

/** Help cmd man */
export function HelpMan(): string {
    return [
        chalk.cyanBright('Help for "help" :D'),
        'Description: Clear console'
    ].join('\n');
}
