import chalk from 'chalk';
import * as crypto from 'crypto-js';
import { GetUserActions } from '../../../../mongo/main';

/** Create user action */
export async function ActionCreateUser(...args: string[]): Promise<void> {
    console.log('Trying to create user with');

    // Check args
    if (!args[0] || !args[1]) {
        console.log(chalk.redBright('Cannot create: not enough arguments'));
        return;
    }
    
    // Create password hash
    console.log(chalk.cyanBright('Generating password hash'));
    const hasher = crypto.algo.SHA256.create();
    hasher.update(args[1]);
    const passwordHash = hasher.finalize().toString();
    
    // Create form
    console.log(chalk.cyanBright('Generating form'));
    const newUserForm = {
        name: args[0],
        password: passwordHash,
        state: parseInt(args[2] || '0') as (0 | 1 | 2)
    };

    // Check state field
    if (newUserForm.state < 0 || newUserForm.state > 2) {
        console.log(chalk.redBright('Invalid state'));
        return;
    }

    // Check is user exists
    console.log(chalk.cyanBright('Checking username in database'));
    const user = await GetUserActions().findByName(newUserForm.name);
    if (user) {
        console.log(chalk.redBright('User with same name already exists!'));
        return;
    }

    // Create new user and add it to the db
    console.log(chalk.greenBright('User with same username not found, adding...'));
    await GetUserActions().add(newUserForm.name, newUserForm.password, newUserForm.state);
    console.log(chalk.greenBright('User successfully added'));
}

/** Create user action man */
export function ActionCreateUserMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.create":'),
        'Description: Creating new user',
        `Usage: action.user.create ${chalk.yellowBright('<login> <password> [state]')}`,
        'Args:',
        '   - login: user\'s login',
        '   - password: user\'s password',
        '   - state: account state, where: 0 - user on free plan, 1 - user on premium plan, 2 - admin'
    ].join('\n');
}
