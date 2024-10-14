import { normalize } from 'node:path';
import {
  FILE_REQUIRED_MSG, INVALID_INPUT, ERROR_TYPE,
  OPERATION_FAILED, FILE_NOT_FOUND,
  COMPRESS_ERROR, DECOMPRESS_ERROR,
  FILE_ALREADY_EXISTS,
} from '../utils/constants.js';
import { fileExists, logger } from '../utils/utils.js';
import compress from '../utils/compress.js';
import decompress from '../utils/decompress.js';

/**
 * Handles compress-related commands from the command line.
 * Expects two arguments: input file path and output file path.
 * This function checks if the input file exists, and if the output file already exists,
 * before attempting to compress the input file into the output file.
 *
 * @param {Array<string>} args - Command-line arguments, where:
 *   - args[0] is the input file path to be compressed.
 *   - args[1] is the output file path for the compressed file.
 * @returns {Promise<void>} - Logs the compression result or an error.
 *   - If input or output files are invalid or if compression fails, appropriate error messages are logged.
 */
export const handleCompressCommand = async (args) => {
  if (args.length < 2) {
    logger(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`, ERROR_TYPE);
    return;
  }

  const inputFilepath = normalize(args[0]);

  const doesInputFileExist = await fileExists(inputFilepath);
  if (!doesInputFileExist) {
    logger(
      `${OPERATION_FAILED}: Input ${FILE_NOT_FOUND} at ${inputFilepath}`,
      ERROR_TYPE,
    );
    return;
  }

  const outputFilepath = normalize(args[1]);

  const doesOutputFileExist = await fileExists(outputFilepath);
  if (doesOutputFileExist) {
    logger(
      `${OPERATION_FAILED}: Output ${FILE_ALREADY_EXISTS} at ${outputFilepath}`,
      ERROR_TYPE,
    );
    return;
  }

  try {
    await compress(inputFilepath, outputFilepath);
  } catch (error) {
    logger(`${OPERATION_FAILED}: ${COMPRESS_ERROR} = ${error}`, ERROR_TYPE);
  }
};

/**
 * Handles decompress-related commands from the command line.
 * Expects two arguments: input file path and output file path.
 * This function checks if the input file exists, and if the output file already exists,
 * before attempting to decompress the input file into the output file.
 *
 * @param {Array<string>} args - Command-line arguments, where:
 *   - args[0] is the input file path to be decompressed.
 *   - args[1] is the output file path for the decompressed file.
 * @returns {Promise<void>} - Logs the decompression result or an error.
 *   - If input or output files are invalid or if decompression fails, appropriate error messages are logged.
 */
export const handleDecompressCommand = async (args) => {
  if (args.length < 2) {
    logger(`${INVALID_INPUT}: ${FILE_REQUIRED_MSG}`, ERROR_TYPE);
    return;
  }

  const inputFilepath = normalize(args[0]);
  const doesInputFileExist = await fileExists(inputFilepath);
  if (!doesInputFileExist) {
    logger(
      `${OPERATION_FAILED}: ${FILE_NOT_FOUND} at ${inputFilepath}`,
      ERROR_TYPE,
    );
    return;
  }

  const outputFilepath = normalize(args[1]);
  const doesOutputFileExist = await fileExists(outputFilepath);
  if (doesOutputFileExist) {
    logger(
      `${OPERATION_FAILED}: ${FILE_ALREADY_EXISTS} at ${outputFilepath}`,
      ERROR_TYPE,
    );
    return;
  }
  try {
    await decompress(inputFilepath, outputFilepath);
  } catch (error) {
    logger(`${OPERATION_FAILED}: ${DECOMPRESS_ERROR} = ${error}`, ERROR_TYPE);
  }
};
