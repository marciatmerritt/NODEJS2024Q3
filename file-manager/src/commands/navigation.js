import fs from 'fs';
import { dirname, isAbsolute, join } from 'path';
import { logger } from '../utils/utils.js'; // Assuming you have a logger utility
import { chdir, cwd } from 'process';
import { MESSAGE_TYPE_ERROR } from '../utils/constants.js';

/**
 * Function to change the working directory to the parent (up one level).
 */
export const handleUpCommand = async () => {
  const currentDir = cwd();
  const parentDir = dirname(currentDir);

  // Prevent going above the root directory
  if (parentDir === currentDir) {
    logger('You are already at the root directory.');
  } else {
    chdir(parentDir);
  }
};

/**
 * Function to change the working directory to a specific folder (relative or absolute).
 * @param {string} dir - The directory to change to.
 */
export const handleCdCommand = async (dir) => {
  try {
    const newDir = isAbsolute(dir) ? dir : join(cwd(), dir);

    if (fs.existsSync(newDir) && fs.statSync(newDir).isDirectory()) {
      chdir(newDir);
      logger(`Changed to directory: ${newDir}`);
    } else {
      logger('Directory does not exist.');
    }
  } catch (error) {
    logger(`Error changing directory: ${error.message}`);
  }
};

/**
 * Function to list the contents of the current directory.
 */

export const handleLsCommand = async () => {
  const currentDir = cwd();

  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(currentDir, { withFileTypes: true }, (error, files) => {
        if (error) {
          reject(
            new Error('Error reading directory: ' + error.message, MESSAGE_TYPE_ERROR),
          );
        } else {
          resolve(files);
        }
      });
    });
    // Separate directories and files
    const dirs = [];
    const filesList = [];

    files.forEach((file) => {
      if (file.isDirectory()) {
        dirs.push(file.name);
      } else if (file.isFile()) {
        filesList.push(file.name);
      }
    });

    // Sort directories and files separately
    dirs.sort();
    filesList.sort();

    // Combine both arrays (directories first, followed by files)
    const allFiles = [...dirs, ...filesList];

    // Print the list with index, name, and type
    logger('(index) | Name          | Type');
    logger('----------------------------------');

    allFiles.forEach((file, index) => {
      const isDirectory = dirs.includes(file);
      const type = isDirectory ? 'directory' : 'file';
      logger(`${index + 1}     | ${file.padEnd(15)} | ${type}`);
    });
  } catch (error) {
    logger(`${error.message}, ERROR`, MESSAGE_TYPE_ERROR);
  }
};
