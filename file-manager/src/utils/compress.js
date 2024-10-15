import { createReadStream, createWriteStream } from 'node:fs';
import { normalize } from 'node:path';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { fileExists, logger } from './utils.js';
import {
  MESSAGE_TYPE_ERROR, ERROR_FILE_ALREADY_EXISTS,
  ERROR_FILE_NOT_FOUND, ERROR_OPERATION_FAILED,
} from './constants.js';

/**
 * Compresses a file using Gzip.
 * @param {string} inputFilepath - Path to the input file.
 * @param {string} outputFilepath - Path where the compressed file should be saved.
 * @returns {Promise<void>} - Resolves when compression is complete.
 */
const compress = async (inputFilepath, outputFilepath) => {
  const inputFile = normalize(inputFilepath);

  const doesInputFileExist = await fileExists(inputFile);
  if (!doesInputFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Input ${ERROR_FILE_NOT_FOUND} at ${inputFile}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  };

  const outputFile = normalize(outputFilepath);
  const doesOutputFileExist = await fileExists(outputFile);
  if (doesOutputFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Output ${ERROR_FILE_ALREADY_EXISTS} at ${outputFile}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  };

  const readStream = createReadStream(inputFile);
  const writeStream = createWriteStream(outputFile);
  const gzipStream = createGzip();

  try {
    await new Promise((resolve, reject) => {
      pipeline(readStream, gzipStream, writeStream, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    logger('File successfully compressed!');
  } catch (error) {
    logger(
      `${ERROR_OPERATION_FAILED}: Compression failed due to ${error.message}`,
      MESSAGE_TYPE_ERROR
    );
  }
};

export default compress;
