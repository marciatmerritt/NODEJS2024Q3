import { exit, chdir } from 'node:process';
import { SIGNAL_CTRL_C, ERROR_INVALID_DIRECTORY, MESSAGE_TYPE_ERROR } from './utils/constants.js';
import { getHomeDir } from './utils/osInfo.js';
import { getCLIUsername } from './utils/cli.js';
import { isValidDirectory, logger } from './utils/utils.js';
import handleCommands from './commands/commandHandler.js';
import handleExit from './utils/handleExit.js';
import { readline, updatePrompt } from './utils/readline.js';

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
 * @function fileManager
 * @throws Will log an error and exit with status code 1 if there's a failure during initialization.
 */
const fileManager = async () => {
  try {
    // get username from CLI argument passed on app start
    const username = getCLIUsername();
    const userHomeDir = await getHomeDir();

    // Set the working directory to the user's home directory
        if (isValidDirectory(userHomeDir)) {
            chdir(userHomeDir);
          } else {
            logger(ERROR_INVALID_DIRECTORY, MESSAGE_TYPE_ERROR);
            chdir(userHomeDir);
          }

    logger(`Welcome to the File Manager, ${username}!`);
    updatePrompt();

    readline.on(SIGNAL_CTRL_C, () => {
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
        await handleCommands(trimmedInput, readline);
        readline.resume();
        updatePrompt();
      }
    });
  } catch (error) {
    logger(`Error starting File Manager: ${error.message}`, MESSAGE_TYPE_ERROR);
    exit(1);
  }
};

fileManager();
