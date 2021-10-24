import { StartDatabaseModule } from './mongo/main';
import { StartAuthModule } from './auth/main';
import { StartSocketModule } from './protocol/main';
import { StartConsoleModule, StartLoggerModule } from './console/main';

// Start
(async () => {
    await StartConsoleModule();
    await StartDatabaseModule();
    await StartAuthModule(7910);
    await StartSocketModule(7911);

    await new Promise((r) => setInterval(r, 200));
    await StartLoggerModule();
})();
