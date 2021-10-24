import chalk from 'chalk';
import { GetUserActions } from '../../../../mongo/main';

/** Delete user */
export async function ActionUserDelete(...args: string[]): Promise<void> {
    if (!args[0]) {
        console.log(chalk.redBright('Not enough arguments'));
        return;
    }

    // Searching user
    console.log(chalk.cyanBright('Trying to get user'));
    const user = await GetUserActions().findByName(args[0]);
    if (!user) {
        console.log(chalk.redBright('User not found'));
        return;
    }

    // Deleting user
    await GetUserActions().delete(user.get('_id'));
    console.log(chalk.greenBright('User successfully deleted'));
}

/** Delete user man */
export function ActionUserDeleteMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.delete":'),
        'Description: Delete user from database',
        `Usage: action.user.delete ${chalk.yellowBright('<login>')}`,
        'Args:',
        '   - login: user\'s login'
    ].join('\n');
}
