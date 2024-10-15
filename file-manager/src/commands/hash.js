import { normalize } from 'node:path';
import { calculateHash } from '../utils/calcHash.js';
import {
  PROMPT_FILE_REQUIRED, ERROR_INVALID_INPUT, MESSAGE_TYPE_PROMPT,
  ERROR_OPERATION_FAILED, ERROR_HASH_CALCULATION, MESSAGE_TYPE_ERROR,
  ERROR_FILE_NOT_FOUND,
} from '../utils/constants.js';
import { fileExists, logger } from '../utils/utils.js';

/**
 * Handles hash-related commands from the command line.
 * This function validates the input arguments, checks if the specified file exists, and then calculates its hash.
 * Logs appropriate messages depending on the success or failure of the operations.
 *
 * @param {Array<string>} args - Command-line arguments. The first argument should be the file path to be hashed.
 * @returns {Promise<void>} - Logs the outcome of the operation. If the file exists and the hash is calculated, 
 *                            a success message is logged. If there are any errors, the appropriate error message is logged.
 */
const handleHashCommands = async (args) => {
  if (args.length < 1) {
    logger(`${ERROR_INVALID_INPUT}: ${PROMPT_FILE_REQUIRED}`, MESSAGE_TYPE_PROMPT);
    return;
  };

  const filepath = normalize(args[0]);

  const doesFileExist = await fileExists(filepath);
  if (!doesFileExist) {
    logger(`${ERROR_OPERATION_FAILED}: ${ERROR_FILE_NOT_FOUND} at ${filepath}`, MESSAGE_TYPE_ERROR);
    return;
  }

  try {
    await calculateHash(filepath);
  } catch (error) {
    logger(`${ERROR_OPERATION_FAILED}: ${ERROR_HASH_CALCULATION} = ${error}`, MESSAGE_TYPE_ERROR);
  }
};

export default handleHashCommands;
