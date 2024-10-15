import {
  PROMPT_FILE_REQUIRED, ERROR_INVALID_INPUT,
  ERROR_INVALID_COMMAND, PROMPT_SRC_DEST_REQUIRED,
  MESSAGE_TYPE_PROMPT,
  PROMPT_FILE_NAME,
  PROMPT_FILE_PATH_NEW_NAME,
  PROMPT_FILE_TO_DELETE,
} from '../utils/constants.js';
import { handleReadFileCommand, handleCreateFileCommand, handleRenameFileCommand, handleCopyFileCommand, handleMoveFileCommand, handleDeleteFileCommand } from '../utils/fsOperations.js';
import { fileExists, logger } from '../utils/utils.js';
/**
 * Handles various file operations (read, create, rename, copy, move, delete) based on the command.
 *
 * @async
 * @function handleFileOperation
 * @param {string} command - The command to be executed (cat, add, rn, cp, mv, rm).
 * @param {Array<string>} args - The arguments for the command (file paths, new names, etc.).
 * @returns {Promise<void>} - Logs the result of the file operation or an error.
 */
const handleFileOperation = async (command, args) => {
    switch (command) {
      case 'cat':
        if (args.length > 0) {
          await handleReadFileCommand(args[0]);
        } else {
            logger(`${ERROR_INVALID_INPUT}: ${PROMPT_FILE_REQUIRED}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      case 'add':
        if (args.length > 0) {
          await handleCreateFileCommand(args[0]);
        } else {
          logger(`${ERROR_INVALID_INPUT}: ${PROMPT_FILE_NAME}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      case 'rn':
        if (args.length === 2) {
          await handleRenameFileCommand(args[0], args[1]);
        } else {
            logger(`${ERROR_INVALID_INPUT}: ${PROMPT_FILE_PATH_NEW_NAME}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      case 'cp':
        if (args.length === 2) {
          await handleCopyFileCommand(args[0], args[1]);
        } else {
            logger(`${ERROR_INVALID_INPUT}: ${PROMPT_SRC_DEST_REQUIRED}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      case 'mv':
        if (args.length === 2) {
          await handleMoveFileCommand(args[0], args[1]);
        } else {
            logger(`${ERROR_INVALID_INPUT}: ${PROMPT_SRC_DEST_REQUIRED}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      case 'rm':
        if (args.length > 0) {
          await handleDeleteFileCommand(args[0]);
        } else {
            logger(`${ERROR_INVALID_INPUT}: ${PROMPT_FILE_TO_DELETE}`, MESSAGE_TYPE_PROMPT);
        }
        break;
      default:
        logger(ERROR_INVALID_COMMAND);
    }
  };
  
  export default handleFileOperation;
  