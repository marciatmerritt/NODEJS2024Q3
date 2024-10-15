import { normalize } from 'node:path';
import {
  MESSAGE_TYPE_ERROR, ERROR_INVALID_INPUT, ERROR_FILE_NOT_FOUND,
  ERROR_COMPRESS, ERROR_DECOMPRESS, ERROR_OPERATION_FAILED,
  ERROR_FILE_ALREADY_EXISTS, PROMPT_SRC_DEST_REQUIRED,
  MESSAGE_TYPE_PROMPT,
} from '../utils/constants.js';
import { fileExists, logger } from '../utils/utils.js';
import compress from '../utils/compress.js';
import decompress from '../utils/decompress.js';

/**
 * Handles both compress and decompress commands from the command line.
 * Determines the operation (compress/decompress) based on the provided action.
 *
 * @param {Array<string>} args - Command-line arguments, where:
 *   - args[0] is the input file path.
 *   - args[1] is the output file path.
 * @param {string} action - The action to be performed ('compress' or 'decompress').
 * @returns {Promise<void>} - Logs the operation result or an error.
 */
const handleZipOperations = async (action, args) => {
  if (args.length < 2) {
    logger(`${ERROR_INVALID_INPUT}: ${PROMPT_SRC_DEST_REQUIRED}`, MESSAGE_TYPE_PROMPT);
    return;
  }

  const inputFilepath = normalize(args[0]);

  const doesInputFileExist = await fileExists(inputFilepath);
  if (!doesInputFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Input ${ERROR_FILE_NOT_FOUND} at ${inputFilepath}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  }

  const outputFilepath = normalize(args[1]);

  const doesOutputFileExist = await fileExists(outputFilepath);
  if (doesOutputFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Output ${ERROR_FILE_ALREADY_EXISTS} at ${outputFilepath}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  }

  try {
    if (action === 'compress') {
      await compress(inputFilepath, outputFilepath);
    } else if (action === 'decompress') {
      await decompress(inputFilepath, outputFilepath);
    } else {
      logger(`${ERROR_OPERATION_FAILED}: Invalid zip action ${action}`, MESSAGE_TYPE_ERROR);
    }
  } catch (error) {
    const errorMsg = action === 'compress' ? ERROR_COMPRESS : ERROR_DECOMPRESS;
    logger(`${ERROR_OPERATION_FAILED}: ${errorMsg} = ${error}`, MESSAGE_TYPE_ERROR);
  }
};

export default handleZipOperations;
