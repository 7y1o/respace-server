import chalk from 'chalk';

/** Clear console action */
export async function Clear(): Promise<void> {
    console.clear();
}

/** Clear console man */
export function ClearMan(): string {
    return [
        chalk.cyanBright('Help for "clear":'),
        'Description: Clear console'
    ].join('\n');
}
