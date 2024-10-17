import {
  PROMPT_FILE_REQUIRED, ERROR_INVALID_INPUT, ERROR_INVALID_COMMAND,
  PROMPT_SRC_DEST_REQUIRED, MESSAGE_TYPE_PROMPT, PROMPT_FILE_NAME,
  PROMPT_FILE_PATH_NEW_NAME, PROMPT_FILE_TO_DELETE,
} from '../utils/constants.js';
import {
  handleReadFileCommand, handleCreateFileCommand, handleRenameFileCommand,
  handleCopyFileCommand, handleMoveFileCommand, handleDeleteFileCommand,
} from '../utils/fsOperations.js';
import { logger } from '../utils/utils.js';
/**
 * @async
 * @description
 * Handles various file operations (read, create, rename, copy, move, delete) based on the provided command.
 * Supported Commands:
 * - `cat`  : Reads and displays the content of a file.
 * - `add`  : Creates a new file with an empty string as the initial content.
 * - `rn`   : Renames an existing file.
 * - `cp`   : Copies a file to a new destination.
 * - `mv`   : Moves a file to a new location (copy + delete).
 * - `rm`   : Deletes an existing file.
 * @function handleFileOperation
 * @param {string} command - The file operation command to be executed. Supported commands: 'cat', 'add', 'rn', 'cp', 'mv', 'rm'.
 * @param {Array<string>} args - The arguments for the command, typically file paths and/or new names.
 *                                - For 'cat', 'rm', 'add': expects one argument (file path or file name).
 *                                - For 'rn', 'cp', 'mv': expects two arguments (source path and destination path/new name).
 * @returns {Promise<void>} - Resolves with void when the file operation is completed or logs an error message.
 * @throws {Error} Logs an appropriate message if invalid input or commands are provided.
 */
const handleFileOperation = async (command, args) => {
  switch (command) {
    case 'cat':
      if (args.length > 0) {
        await handleReadFileCommand(args[0]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_FILE_REQUIRED}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    case 'add':
      if (args.length > 0) {
        await handleCreateFileCommand(args[0]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_FILE_NAME}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    case 'rn':
      if (args.length === 2) {
        await handleRenameFileCommand(args[0], args[1]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_FILE_PATH_NEW_NAME}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    case 'cp':
      if (args.length === 2) {
        await handleCopyFileCommand(args[0], args[1]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_SRC_DEST_REQUIRED}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    case 'mv':
      if (args.length === 2) {
        await handleMoveFileCommand(args[0], args[1]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_SRC_DEST_REQUIRED}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    case 'rm':
      if (args.length > 0) {
        await handleDeleteFileCommand(args[0]);
      } else {
        logger(
          `${ERROR_INVALID_INPUT}: ${PROMPT_FILE_TO_DELETE}`,
          MESSAGE_TYPE_PROMPT,
        );
      }
      break;
    default:
      logger(ERROR_INVALID_COMMAND);
  }
};

export default handleFileOperation;
