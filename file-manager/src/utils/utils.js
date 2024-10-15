import { parse, relative } from 'node:path';
import { stderr, stdout } from 'process';
import { promises as fs } from 'fs';
import { ERROR_CODE_NO_ENTITY, ERROR_OPERATION_FAILED, MESSAGE_TYPE_ERROR } from './constants.js';

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
 * - Error messages are displayed in red text.
 * - Prompt messages are displayed in yellow text.
 *
 * @param {string} message - The message to log.
 * @param {string} [type='info'] - The type of log:
 *   - 'info' (default) for logging to stdout (standard output).
 *   - 'error' for logging error messages to stderr (standard error) in red text.
 *   - 'prompt' for logging prompt-like messages to stderr (standard error) in yellow text.
 */
export const logger = (message, type = 'info') => {
  const redText = '\x1b[31m';
  const yellowText = '\u001b[33m';
  const resetText = '\x1b[0m';

  if (type === 'error') {
    stderr.write(`${redText}${message}${resetText}\n`);
    return;
  }

  if (type === 'prompt') {
    stderr.write(`${yellowText}${message}${resetText}\n`);
    return;
  }

  stdout.write(message + '\n');
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
    if (error.code !== ERROR_CODE_NO_ENTITY) {
      logger(
        `$${ERROR_OPERATION_FAILED} Error accessing file at: ${filePath}. Error: ${error.message}`,
        MESSAGE_TYPE_ERROR,
      );
    }
    return false;
  }
};

/**
 * Checks if the provided directory is valid and not above the root directory.
 *
 * @param {string} newDir - The directory to check.
 * @returns {boolean} - Returns true if the directory is valid, false otherwise.
 */
export const isValidDirectory = (newDir) => {
  const rootDir = parse(newDir).root;
  const isAboveRoot = relative(rootDir, newDir).startsWith('..');
  return !isAboveRoot;
};
