import handleOSCommands from './os.js';
import handleHashCommands from './hash.js';
import { handleCompressCommand, handleDecompressCommand } from './zip.js';
import { logger } from '../utils/utils.js';
import { INVALID_COMMAND } from '../utils/constants.js';

/**
 * This asynchronous function takes a user input string, splits it into the command and its arguments,
 * and then routes the command to the appropriate handler. Supported commands include:
 * 
 * - `os`: Handles operating system-related commands.
 * - `hash`: Handles hashing-related commands.
 * - `compress`: Compresses files.
 * - `decompress`: Decompresses files.
 * 
 * If the command is unrecognized, an error message is logged.
 * 
 * @async
 * @function handleCommands
 * @param {string} input - The command string entered by the user.
 * @returns {Promise<void>} - The function does not return a value but performs the necessary actions based on the command.
 * 
 * @throws Will log an error message if the command fails to execute.
 */
const handleCommands = async (input) => {
  const [command, ...args] = input.split(' ');

  try {
    switch (command) {
      case 'os':
        await handleOSCommands(args);
        break;
      case 'hash':
        await handleHashCommands(args);
        break;
      case 'compress':
        await handleCompressCommand(args);
        break;
      case 'decompress':
        await handleDecompressCommand(args);
        break;
      default:
        logger(INVALID_COMMAND);
    }
  } catch (error) {
    logger(`Error executing command: ${error.message}`);
  }
};

export default handleCommands;
