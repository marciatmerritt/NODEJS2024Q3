import { stdin, stdout, argv } from 'process';
import { createInterface } from 'readline';

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

/**
 * The readline interface is set up to use the standard input and output streams (`stdin` and `stdout`).
 * A prompt message, 'Enter Command: ', is displayed when the interface is waiting for the user to input a command.
 *
 * @constant {Interface} readline
 * @see {@link https://nodejs.org/api/readline.html#readline_class_interface}
 *
 */
export const readline = createInterface({
  input: stdin,
  output: stdout,
  prompt: `\nEnter Command: `,
});
