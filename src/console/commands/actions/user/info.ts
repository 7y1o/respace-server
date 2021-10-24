import chalk from 'chalk';
import { GetUserActions } from '../../../../mongo/main';

/** Get info about user */
export async function ActionUserInfo(...args: string[]): Promise<void> {
    if (!args[0]) {
        console.log(chalk.redBright('Not enough arguments'));
        return;
    }
    
    // Searching user
    console.log(chalk.cyanBright('Searching user'));
    const user = await GetUserActions().findByName(args[0]);
    if (!user) {
        console.log(chalk.redBright('User not found'));
        return;
    }

    // Log out info
    const userState = user.get('state');
    console.log(chalk.greenBright('Found user:'));
    console.log([
        `   - Name: ${chalk.cyanBright(user.get('name'))}`,
        `   - Is blocked: ${chalk.cyanBright(user.get('blocked'))}`,
        `   - State: ${chalk.cyanBright(userState === 0 ? 'Free' : userState === 1 ? 'Premium' : 'Admin')}`
    ].join('\n'));
}

/** Get man for this cmd */
export function ActionUserInfoMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.info":'),
        'Description: Get info about user by his name',
        `Usage: action.user.info ${chalk.yellowBright('<login>')}`,
        'Args:',
        '   - login: user\'s login'
    ].join('\n');
}
