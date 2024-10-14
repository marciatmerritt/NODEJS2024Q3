import { argv } from 'process';

/**
 * This function searches for a command-line argument in the form of '--username=<username>'
 * and returns the value of <username>. If no such argument is found, the function returns 'Guest'
 * as the default username.
 *
 * @function getCLIUsername
 * @returns {string} - The username passed via CLI or 'Guest' if not provided.
 */
export const getCLIUsername = () => {
  const usernameArg = argv.find((arg) => arg.startsWith('--username='));
  const username = usernameArg ? usernameArg.split('=')[1] : 'Guest';
  return username;
};
