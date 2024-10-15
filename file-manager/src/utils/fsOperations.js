import { createReadStream, createWriteStream } from 'fs';
import { logger } from '../utils/utils.js';
import { normalize } from 'node:path';
import { join } from 'path';
import { cwd, stdout } from 'process';
import { ENCODING_UTF8, ERROR_CODE_FILE_EXISTS, ERROR_CODE_NO_ENTITY, ERROR_FILE_ALREADY_EXISTS, ERROR_OPERATION_FAILED, MESSAGE_TYPE_ERROR } from './constants.js';

export const handleReadFileCommand = async (filepath, readline) => {
    
  const inputFilepath = normalize(filepath);
  try {
    const readableStream = createReadStream(inputFilepath, ENCODING_UTF8);

    readline.pause();    

    readableStream.on(('data'), (chunk) => {
        stdout.write(chunk);
      });

    readableStream.on(('end'), () => {
        readline.resume();
    });

    readableStream.on('error', (error) => {
        if (error.code === ERROR_CODE_NO_ENTITY) {
          logger(`${ERROR_OPERATION_FAILED}: ${filepath} does not exist.`);
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
    await fs.writeFile(filePath, fileContent, { flag: 'wx' });
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

export const handleRenameFileCommand = (oldPath, newPath) => {
  fs.rename(oldPath, newPath, (error) => {
    if (error) logger(`Error renaming file: ${error.message}`);
    else logger(`File renamed successfully to ${newPath}.`);
  });
};

export const handleCopyFileCommand = (source, destination) => {
  const readableStream = fs.createReadStream(source);
  const writableStream = fs.createWriteStream(destination);

  readableStream.pipe(writableStream).on('finish', () => {
    logger(`File copied successfully to ${destination}.`);
  }).on('error', (error) => {
    logger(`Error copying file: ${error.message}`);
  });
};

export const handleMoveFileCommand = (source, destination) => {
  handleCopyFileCommand(source, destination);
  fs.unlink(source, (error) => {
    if (error) logger(`Error deleting file after move: ${error.message}`);
    else logger(`File moved successfully to ${destination}.`);
  });
};

export const handleDeleteFileCommand = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) logger(`Error deleting file: ${error.message}`);
    else logger(`File ${filePath} deleted successfully.`);
  });
};
