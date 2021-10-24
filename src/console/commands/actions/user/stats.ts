import chalk from 'chalk';
import { UserSchema } from '../../../../mongo/schemas/user';

/** Get users collection statistics */
export async function ActionUserStats(): Promise<void> {
    console.log(chalk.cyanBright('Collecting user statistics...'));

    // Get count of all documents
    const allCount = await UserSchema.countDocuments();
    const freeCount = await UserSchema.countDocuments({ state: 0 });
    const premiumCount = await UserSchema.countDocuments({ state: 1 });
    const adminCount = await UserSchema.countDocuments({ state: 2 });
    const blockedCount = await UserSchema.countDocuments({ blocked: true });

    // Log out
    console.log([
        'Statistics:',
        '   - ' + chalk.cyanBright('All') + ': ' + chalk.yellowBright(allCount) + ' documents',
        '   - ' + chalk.cyanBright('Free') + ' accounts: ' + chalk.yellowBright(freeCount) + ' documents',
        '   - ' + chalk.cyanBright('Premium') + ' accounts: ' + chalk.yellowBright(premiumCount) + ' documents',
        '   - ' + chalk.cyanBright('Admin') + ' accounts: ' + chalk.yellowBright(adminCount) + ' documents',
        '   - ' + chalk.cyanBright('Blocked') + ' accounts: ' + chalk.yellowBright(blockedCount) + ' documents'
    ].join('\n'));
}

/** Get user collection statistics man */
export function ActionUserStatsMan(): string {
    return [
        chalk.cyanBright('Help for "action.user.stats":'),
        'Description: Get user collection statistics',
        'Usage: action.user.stats'
    ].join('\n');
}
