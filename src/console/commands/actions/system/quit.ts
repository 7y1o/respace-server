import chalk from 'chalk';

/** Create user action */
export async function ActionSystemQuit(): Promise<void> {
    console.log(chalk.greenBright('Quiting...'));
    process.exit(0);
}

/** Create user action man */
export function ActionSystemQuitMan(): string {
    return [
        chalk.cyanBright('Help for "action.system.quit":'),
        'Description: Quit ReSpace server',
        'Usage: action.user.quit'
    ].join('\n');
}
