import { exit } from 'node:process';
import { CTRL_C_TERMINATE, CURRENT_DIR_MSG } from './utils/constants.js';
import { getHomeDir } from './utils/osInfo.js';
import { getCLIUsername, readline } from './utils/cli.js';
import { logger } from './utils/utils.js';
import handleCommands from './commands/commandHandler.js';
import { handleExit } from './utils/exit.js';

/**
 * File Manager application
 *
 * This asynchronous function handles the initialization and management of the CLI-based
 * file manager, which includes:
 * - Fetching the username passed via the command-line argument.
 * - Displaying a welcome message along with the current directory.
 * - Setting up event listeners for user input (`line` event), closing the program (`CTRL+C`), and
 *   handling specific commands.
 *
 * Features:
 * - Listens for the `.exit` command to terminate the application.
 * - Pauses and resumes the `readline` interface for command handling.
 * - Gracefully handles application termination via `handleExit`.
 *
 * Any errors during the startup are logged, and the process exits with a non-zero status code.
 *
 * @async
 * @function fileManagerStart
 * @throws Will log an error and exit with status code 1 if there's a failure during initialization.
 */
const fileManagerStart = async () => {
  try {
    // get username from CLI argument passed on app start
    const username = getCLIUsername();
    const userHomeDir = await getHomeDir();

    const welcomeMsg = `Welcome to the File Manager, ${username}!`;

    logger(welcomeMsg);
    logger(CURRENT_DIR_MSG + userHomeDir);
    readline.prompt();

    readline.on(CTRL_C_TERMINATE, () => {
      handleExit(username);
    });

    readline.on('close', () => {
      exit(0);
    });

    readline.on('line', async (input) => {
      const trimmedInput = input.trim();

      if (trimmedInput === '.exit') {
        handleExit(username);
      } else {
        readline.pause();
        await handleCommands(trimmedInput);
        readline.resume();
        readline.prompt();
      }
    });
  } catch (error) {
    logger(`Error starting File Manager: ${error.message}`);
    exit(1);
  }
};

fileManagerStart();
