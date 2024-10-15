import { createReadStream } from 'fs';
import { checkFileExistence, fileExists, logError, logger } from '../utils/utils.js';
import { normalize } from 'node:path';
import { join } from 'path';
import { cwd, stdout } from 'process';
import {
  ENCODING_UTF8,
  ERROR_CODE_FILE_EXISTS,
  ERROR_CODE_NO_ENTITY,
  ERROR_FILE_ALREADY_EXISTS,
  ERROR_FILE_NOT_FOUND,
  ERROR_OPERATION_FAILED,
  MESSAGE_TYPE_ERROR,
} from './constants.js';
import { rename, unlink, writeFile } from 'fs/promises';
import copyFileStream from './copyFileStream.js';

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

export const handleMoveFileCommand = async (source, destination) => {
  try {
    await handleCopyFileCommand(source, destination);
    await handleDeleteFileCommand(source);
  } catch (error) {
    logError(`Error during file move: ${source} to ${destination}`, error);
    return;
  };
};
