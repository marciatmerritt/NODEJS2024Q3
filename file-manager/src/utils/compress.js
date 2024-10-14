import { createReadStream, createWriteStream } from 'node:fs';
import { normalize } from 'node:path';
import { pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { fileExists, logger } from './utils.js';
import {
  ERROR_TYPE,
  FILE_ALREADY_EXISTS,
  FILE_NOT_FOUND,
  OPERATION_FAILED,
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
      `${OPERATION_FAILED}: Input ${FILE_NOT_FOUND} at ${inputFile}`,
      ERROR_TYPE,
    );
    return;
  };

  const outputFile = normalize(outputFilepath);
  const doesOutputFileExist = await fileExists(outputFile);
  if (doesOutputFileExist) {
    logger(
      `${OPERATION_FAILED}: Output ${FILE_ALREADY_EXISTS} at ${outputFile}`,
      ERROR_TYPE,
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
      `${OPERATION_FAILED}: Compression failed due to ${error.message}`,
      ERROR_TYPE,
    );
  }
};

export default compress;
