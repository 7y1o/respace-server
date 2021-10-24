import chalk from 'chalk';
import { GetUserActions } from '../../../../mongo/main';

/** Block user action */
export async function ActionUserBlock(...args: string[]): Promise<void> {

    // Check args
    if (!args[0] || !args[1]) {
        console.log(chalk.redBright('Cannot change block status: not enough arguments'));
        return;
    }

    // Check is second argument is boolean
    let state: boolean;
    if ([ 'true', 'false' ].includes(args[1])) {
        state = Boolean(args[1] === 'true');
    } else {
        console.log(chalk.redBright('Cannot change block status: unexpected argument'));
        return;
    }

    // Check is user exists
    console.log(chalk.cyanBright('Checking username in database'));
    const user = await GetUserActions().findByName(args[0]);
    if (!user) {
        console.log(chalk.redBright('User not exists!'));
        return;
    }

    // Create new user and add it to the db
    await GetUserActions().update(user.id, {
        blocked: state
    });
    console.log(chalk.greenBright('Successfully updated!'));
}

/** Create user action man */
export function ActionUserBlockMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.block":'),
        'Description: Block or unblock user',
        `Usage: action.user.block ${chalk.yellowBright('<login> <true / false>')}`,
        'Args:',
        '   - login: user\'s login',
        '   - password: user\'s password',
        '   - state: account state, where: 0 - user on free plan, 1 - user on premium plan, 2 - admin'
    ].join('\n');
}
