import { createReadStream, createWriteStream } from 'fs';
import { fileExists, logger } from '../utils/utils.js';
import { normalize } from 'node:path';
import { join } from 'path';
import { cwd, stdout } from 'process';
import { ENCODING_UTF8, ERROR_CODE_FILE_EXISTS, ERROR_CODE_NO_ENTITY, ERROR_FILE_ALREADY_EXISTS, ERROR_FILE_NOT_FOUND, ERROR_OPERATION_FAILED, MESSAGE_TYPE_ERROR } from './constants.js';
import { rename, writeFile } from 'fs/promises';

export const handleReadFileCommand = async (filepath) => {
    
  const inputFilepath = normalize(filepath);
  try {
    const readableStream = createReadStream(inputFilepath, ENCODING_UTF8);

    readableStream.on('open', () => {
        logger('\r');
      });

    readableStream.on(('data'), (chunk) => {
        stdout.write(chunk);
      });

    readableStream.on(('end'), () => {
        logger('\n\nFinished reading file.');
    });

    readableStream.on('error', (error) => {
        if (error.code === ERROR_CODE_NO_ENTITY) {
          logger(`${ERROR_OPERATION_FAILED}: ${filepath} does not exist.`, MESSAGE_TYPE_ERROR);
        } else {
          logger(`${ERROR_OPERATION_FAILED} - Unexpected error: ${error}`, MESSAGE_TYPE_ERROR);
        }
      });
  
    } catch (error) {
      logger(`${ERROR_OPERATION_FAILED} - Unexpected error: ${error}`, MESSAGE_TYPE_ERROR);
    }
  };

export const handleCreateFileCommand = async (fileName) => {
  const fileContent = '';
  const filePath = join(cwd(), fileName);

  try {
    await writeFile(filePath, fileContent, { flag: 'wx' });
    logger(`File created successfully: ${filePath}`);
  } catch (error) {
    if (error.code === ERROR_CODE_FILE_EXISTS) {
        logger(
            `${ERROR_OPERATION_FAILED}: Input ${ERROR_FILE_ALREADY_EXISTS} at ${filePath}`, MESSAGE_TYPE_ERROR
          );
    } else {
        logger(`${ERROR_OPERATION_FAILED} - Unexpected error: ${error}`, MESSAGE_TYPE_ERROR);
    }
  }
};

export const handleRenameFileCommand = async (oldPath, newPath) => {

  const oldFilePath = normalize(oldPath);
  const doesOldFileExist = await fileExists(oldFilePath);
  if (!doesOldFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Input ${ERROR_FILE_NOT_FOUND} at ${oldFilePath}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  };

  const newFilePath = normalize(newPath);
  const doesNewFileExist = await fileExists(newFilePath);
  if (doesNewFileExist) {
    logger(
      `${ERROR_OPERATION_FAILED}: Input ${ERROR_FILE_ALREADY_EXISTS} at ${oldFilePath}`,
      MESSAGE_TYPE_ERROR
    );
    return;
  };

  try {
    await rename(oldFilePath, newFilePath);
    logger(`File renamed successfully to ${newFilePath}.`);
  } catch (error) {
    logger(`${ERROR_OPERATION_FAILED}: - Unexpected error: , ${error}`, MESSAGE_TYPE_ERROR);
  }
};

export const handleCopyFileCommand = async (source, destination) => {
  const readableStream = fs.createReadStream(source);
  const writableStream = fs.createWriteStream(destination);

  readableStream.pipe(writableStream).on('finish', () => {
    logger(`File copied successfully to ${destination}.`);
  }).on('error', (error) => {
    logger(`Error copying file: ${error.message}`);
  });
};

export const handleMoveFileCommand = async (source, destination) => {
  handleCopyFileCommand(source, destination);
  fs.unlink(source, (error) => {
    if (error) logger(`Error deleting file after move: ${error.message}`);
    else logger(`File moved successfully to ${destination}.`);
  });
};

export const handleDeleteFileCommand = async (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) logger(`Error deleting file: ${error.message}`);
    else logger(`File ${filePath} deleted successfully.`);
  });
};
