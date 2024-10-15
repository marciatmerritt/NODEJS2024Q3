import { createInterface } from 'readline';
import { stdin, stdout, cwd } from 'process';
import { MESSAGE_CURRENT_DIR } from './constants.js';

/**
 * The readline interface is set up to use the stdin and stdout streams
 * A prompt message, 'Enter Command: ', is displayed when the interface is waiting for the user to input a command.
 *
 * @constant {Interface} readline - The readline interface instance used to interact with the user.
 * @see {@link https://nodejs.org/api/readline.html#readline_class_interface} - Node.js Readline API documentation.
 */
export const readline = createInterface({
  input: stdin,
  output: stdout,
});

/**
 * Updates the command line prompt to dynamically display the current working directory.
 * 
 * @function updatePrompt
 */
export const updatePrompt = () => {
    readline.setPrompt(`\n${MESSAGE_CURRENT_DIR} ${cwd()} \n\nEnter Command: `);
    setTimeout(() => {
      readline.prompt();
    }, 50);
    
  };