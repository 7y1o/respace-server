import chalk from 'chalk';
import { UserSchema } from '../../../../mongo/schemas/user';

/** Create user action */
export async function ActionUserSearch(...args: string[]): Promise<void> {

    // Check args
    if (!args[0]) {
        console.log(chalk.redBright('Cannot create: not enough arguments'));
        return;
    }

    // Check is user exists
    console.log(chalk.cyanBright('Searching...'));
    const users = await UserSchema.find({ name: {
        $regex: new RegExp(args[0]),
        $options: 'i'
    } });

    // Output
    console.log(`Found ${users.length} accounts:\n${users.map((u) => chalk.yellowBright(u.get('name'))).join(', ')}`);
}

/** Create user action man */
export function ActionUserSearchMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.find":'),
        'Description: Search users',
        `Usage: action.user.search ${chalk.yellowBright('<login>')}`,
        'Args:',
        '   - login: user\'s login'
    ].join('\n');
}
