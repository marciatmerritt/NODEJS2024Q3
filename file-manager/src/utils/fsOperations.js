import { createReadStream } from 'fs';
import { checkFileExistence, logError, logger } from '../utils/utils.js';
import { normalize } from 'node:path';
import { join } from 'path';
import { cwd, stdout } from 'process';
import {
  ENCODING_UTF8,
  ERROR_CODE_FILE_EXISTS,
  ERROR_CODE_NO_ENTITY,
  ERROR_FILE_ALREADY_EXISTS,
  ERROR_OPERATION_FAILED,
  MESSAGE_TYPE_ERROR,
} from './constants.js';
import { rename, unlink, writeFile } from 'fs/promises';
import copyFileStream from './copyFileStream.js';

/**
 * @function handleReadFileCommand
 * @description Reads a file and outputs its content to stdout. 
 *              Handles errors if the file doesn't exist or other unexpected issues occur.
 * @param {string} filepath - The path to the file to be read.
 * @returns {Promise<void>} Resolves when file reading is complete, logs errors if any occur.
 */
export const handleReadFileCommand = async (filepath) => {
  const inputFilepath = normalize(filepath);
  try {
    await checkFileExistence(inputFilepath);
    const readableStream = createReadStream(inputFilepath, ENCODING_UTF8);

    readableStream.on('open', () => {
      logger('\r');
    });

    readableStream.on('data', (chunk) => {
      stdout.write(chunk);
    });

    readableStream.on('end', () => {
      logger('\n\nFinished reading file.');
    });

    readableStream.on('error', (error) => {
      if (error.code === ERROR_CODE_NO_ENTITY) {
        logError(`${inputFilepath} does not exist.`, error);
      } else {
        logError(`Unexpected error: ${inputFilepath}`, error);
      }
    });
  } catch (error) {
    logError(`Unexpected error: ${inputFilepath}`, error);
  }
};

/**
 * @function handleCreateFileCommand
 * @description Creates a new file with an empty content. Logs errors if the file already exists or other issues occur.
 * @param {string} fileName - The name of the file to be created.
 * @returns {Promise<void>} Resolves when file is created, logs errors if any occur.
 */
export const handleCreateFileCommand = async (fileName) => {
  const fileContent = '';
  const filePath = join(cwd(), fileName);

  try {
    checkFileExistence(filePath);
    await writeFile(filePath, fileContent, { flag: 'wx' });
    logger(`File created successfully: ${filePath}`);
  } catch (error) {
    if (error.code === ERROR_CODE_FILE_EXISTS) {
      logError(`Input ${ERROR_FILE_ALREADY_EXISTS} at ${filePath}`, error);
    } else {
        logError(`Unexpected error: ${filePath}`, error);
    }
  }
};

/**
 * @function handleRenameFileCommand
 * @description Renames a file from the old path to the new path.
 *              Ensures the old file exists and the new file does not already exist.
 * @param {string} oldPath - The original file path.
 * @param {string} newPath - The new file path.
 * @returns {Promise<void>} Resolves when file is renamed, logs errors if any occur.
 */
export const handleRenameFileCommand = async (oldPath, newPath) => {
  const oldFilePath = normalize(oldPath);
  const newFilePath = normalize(newPath);

  try {
    await checkFileExistence(oldFilePath);
    await checkFileExistence(newFilePath, false);
    await rename(oldFilePath, newFilePath);
    logger(`File renamed successfully to ${newFilePath}.`);
  } catch (error) {
    logError(`Renaming file`, error);
  }
};

/**
 * @function handleCopyFileCommand
 * @description Copies a file from the source path to the destination path.
 *              Ensures the old file exists and the new file does not already exist.
 * @param {string} source - The path of the file to be copied.
 * @param {string} destination - The path where the file will be copied to.
 * @returns {Promise<void>} Resolves when file is copied, logs errors if any occur.
 */
export const handleCopyFileCommand = async (source, destination) => {
  const sourcePath = normalize(source);
  const destinationPath = normalize(destination);

  try {
    await checkFileExistence(sourcePath);
    await checkFileExistence(destinationPath, false);
    await copyFileStream(sourcePath, destinationPath);
    logger(`File copied successfully to ${destinationPath}.`);
  } catch (error) {
    logError(`Error during file copy`, error);
  }
};

/**
 * @function handleDeleteFileCommand
 * @description Deletes a file from the file system. Logs an error if the file doesn't exist or if there are unexpected issues.
 * @param {string} filePath - The path to the file to be deleted.
 * @returns {Promise<void>} Resolves when file is deleted, logs errors if any occur.
 */
export const handleDeleteFileCommand = async (filePath) => {
  const delFilePath = normalize(filePath);

  try {
    await checkFileExistence(delFilePath);
    await unlink(delFilePath);
    logger(`File ${filePath} deleted successfully.`);
  } catch (error) {
    if (error.code === ERROR_CODE_NO_ENTITY) {
      logger(
        `${ERROR_OPERATION_FAILED}: ${delFilePath} does not exist.`,
        MESSAGE_TYPE_ERROR,
      );
    } else {
      logger(
        `${ERROR_OPERATION_FAILED} - Unexpected error: ${error}`,
        MESSAGE_TYPE_ERROR,
      );
    }
  }
};

/**
 * @function handleMoveFileCommand
 * @description Moves a file from the source path to the destination by copying it first and then deleting the original. 
 *              Logs any errors encountered.
 * @param {string} source - The original file path.
 * @param {string} destination - The destination file path.
 * @returns {Promise<void>} Resolves when the file is moved, logs errors if any occur.
 */
export const handleMoveFileCommand = async (source, destination) => {
  try {
    await handleCopyFileCommand(source, destination);
    await handleDeleteFileCommand(source);
  } catch (error) {
    logError(`Error during file move: ${source} to ${destination}`, error);
    return;
  };
};
