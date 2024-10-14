import { stderr, stdout } from 'process';
import { promises as fs } from 'fs';
import { ERROR_NO_ENTITY_CODE, ERROR_TYPE, FILE_NOT_FOUND } from './constants.js';

/**
 * Converts a speed in MHz to GHz by dividing the value by 1000.
 *
 * @param {number} speedMHz - The speed in MHz to convert to GHz.
 * @returns {number} The equivalent speed in GHz.
 */
export const convertMHzToGHz = (speedMHz) => {
  return speedMHz / 1000;
};

/**
 * Logs a message to stdout (standard output) or stderr (standard error) based on the log type.
 * Error messages are displayed in red text.
 *
 * @param {string} message - The message to log.
 * @param {string} [type='info'] - The type of log ('info' for stdout, 'error' for stderr).
 *                                Defaults to 'info' for standard output logging.
 */
export const logger = (message, type = 'info') => {

  const redText = '\x1b[31m';
  const resetText = '\x1b[0m';

  if (type === 'error') {
    stderr.write(`${redText}${message}${resetText}\n`);
  } else {
    stdout.write(message + '\n');
  }
};

/**
 * Asynchronously checks whether a file exists at the given file path.
 * 
 * This function returns `false` when the file doesn't exist, and only logs an error
 * when there is a more serious issue (e.g., permission issues).
 * 
 * @param {string} filePath - Path to the file.
 * @returns {Promise<boolean>} - True if file exists, false otherwise.
 */
export const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    // Only log if the error is not related to the file not existing
    if (error.code !== ERROR_NO_ENTITY_CODE) {
      logger(
        `Error accessing file at: ${filePath}. Error: ${error.message}`,
        ERROR_TYPE,
      );
    }
    return false;
  }
};
