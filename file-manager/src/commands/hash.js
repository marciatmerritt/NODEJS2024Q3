import { normalize } from 'node:path';
import { calculateHash } from '../utils/calcHash.js';
import {
  FILE_REQUIRED_MSG, INVALID_INPUT,
  OPERATION_FAILED, HASH_ERROR, ERROR_TYPE,
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
    logger(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`, ERROR_TYPE);
    return;
  };

  const filepath = normalize(args[0]);

  const doesFileExist = await fileExists(filepath);
  if (!doesFileExist) {
    logger(`${OPERATION_FAILED}: ${FILE_NOT_FOUND} at ${filepath}`, ERROR_TYPE);
    return;
  }

  try {
    await calculateHash(filepath);
  } catch (error) {
    logger(`${OPERATION_FAILED}: ${HASH_ERROR} = ${error}`, ERROR_TYPE);
  }
};

export default handleHashCommands;
