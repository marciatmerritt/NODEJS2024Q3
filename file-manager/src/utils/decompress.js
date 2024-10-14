import { createReadStream, createWriteStream } from 'node:fs';
import { normalize } from 'node:path';
import { pipeline } from 'node:stream';
import { createGunzip } from 'node:zlib';
import {
  ERROR_TYPE, FILE_NOT_FOUND,
  FILE_ALREADY_EXISTS, OPERATION_FAILED,
} from './constants.js';
import { fileExists, logger } from './utils.js';

/**
 * Decompresses a Gzip-compressed file and writes the output to a specified file path.
 * 
 * This function checks whether the input file exists and whether the output file already exists.
 * If the input file does not exist, or if the output file already exists, it logs an error and exits.
 * If both files are valid, it proceeds with decompression and logs success or failure.
 *
 * @param {string} inputFilepath - The path to the Gzip-compressed input file.
 * @param {string} outputFilepath - The path where the decompressed file will be written.
 * @returns {Promise<void>} - Resolves when the decompression is successful or logs an error if it fails.
 * 
 * @throws {Error} - If the decompression fails due to issues with the input file, output file, or pipeline.
 */
const decompress = async (inputFilepath, outputFilepath) => {
  const inputFile = normalize(inputFilepath);
  const doesInputFileExist = await fileExists(inputFile);
  if (!doesInputFileExist) {
    logger(
      `${OPERATION_FAILED}: Input ${FILE_NOT_FOUND} at ${inputFile}`,
      ERROR_TYPE,
    );
    return;
  }

  const outputFile = normalize(outputFilepath);
  const doesOutputFileExist = await fileExists(outputFile);
  if (doesOutputFileExist) {
    logger(
      `${OPERATION_FAILED}: Output ${FILE_ALREADY_EXISTS} at ${outputFile}`,
      ERROR_TYPE,
    );
    return;
  }

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gunzipStream = createGunzip();

  try {
    await new Promise((resolve, reject) => {
      pipeline(readStream, gunzipStream, writeStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    logger('File successfully decompressed!');
  } catch (error) {
    logger(
      `${OPERATION_FAILED}: Decompression failed due to ${error.message}`,
      ERROR_TYPE,
    );
  }
};

export default decompress;
