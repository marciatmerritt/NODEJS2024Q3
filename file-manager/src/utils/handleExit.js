import { readline } from './readline.js';
import { logger } from './utils.js';

/**
 * Handles the exit procedure for the File Manager application.
 *
 * This function gracefully terminates the application by:
 * - Logging a farewell message to the user based on their username.
 * - Closing the `readline` interface, which will automatically trigger the application to exit.
 *
 * @param {string} username - The username to include in the farewell message.
 */
const handleExit = (username) => {
  const exitMsg = `\nThank you for using File Manager, ${username}, goodbye!`;
  logger(exitMsg);
  readline.close();
};

export default handleExit;
