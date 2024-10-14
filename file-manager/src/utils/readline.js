import { createInterface } from 'readline';
import { stdin, stdout, cwd } from 'process';
import { CURRENT_DIR_MSG } from './constants.js';

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
 * Function to update the prompt based on the current working directory.
 * This will dynamically display the prompt with the current directory in the format: 
 * "Enter Command: C:\current\directory"
 *
 * @function updatePrompt
 */
export const updatePrompt = () => {
    readline.setPrompt(`${CURRENT_DIR_MSG} ${cwd()} \n\nEnter Command: `);
    readline.prompt(); // Immediately prompt the user for input after updating
  };