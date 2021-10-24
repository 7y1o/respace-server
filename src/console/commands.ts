/**
 * Console commands list
 */

import { Help, HelpMan } from './commands/help';
import { Man, ManMan } from './commands/man';
import { Clear, ClearMan } from './commands/clear';

import { ActionCreateUser, ActionCreateUserMan } from './commands/actions/user/create';
import { ActionUserInfo, ActionUserInfoMan } from './commands/actions/user/info';
import { ActionUserDelete, ActionUserDeleteMan } from './commands/actions/user/delete';
import { ActionUserStats, ActionUserStatsMan } from './commands/actions/user/stats';
import { ActionUserBlock, ActionUserBlockMan } from './commands/actions/user/block';
import { ActionUserSearch, ActionUserSearchMan } from './commands/actions/user/search';

import { ActionSystemQuit, ActionSystemQuitMan } from './commands/actions/system/quit';

/** Commands list */
export const commands: {
    [command: string]: {
        // eslint-disable-next-line no-unused-vars
        executor: (...args: string[]) => Promise<void>,
        man: () => string
    }
} = {

    // Common
    'help': {
        executor: Help,
        man: HelpMan
    },
    'man': {
        executor: Man,
        man: ManMan
    },
    'clear': {
        executor: Clear,
        man: ClearMan
    },

    // Users
    'action.user.create': {
        executor: ActionCreateUser,
        man: ActionCreateUserMan,
    },
    'action.user.info': {
        executor: ActionUserInfo,
        man: ActionUserInfoMan
    },
    'action.user.delete': {
        executor: ActionUserDelete,
        man: ActionUserDeleteMan,
    },
    'action.user.stats': {
        executor: ActionUserStats,
        man: ActionUserStatsMan
    },
    'action.user.block': {
        executor: ActionUserBlock,
        man: ActionUserBlockMan
    },
    'action.user.find': {
        executor: ActionUserSearch,
        man: ActionUserSearchMan,
    },

    // System
    'action.system.quit': {
        executor: ActionSystemQuit,
        man: ActionSystemQuitMan
    }
};
