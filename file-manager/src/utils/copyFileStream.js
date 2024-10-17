import { createReadStream, createWriteStream } from 'fs';

/**
 * @function copyFileStream
 * @description Copies a file from the source path to the destination path using streams.
 *              Reads the file in chunks and writes it to the destination using a stream-based approach
 * @param {string} sourcePath - The file path of the source file to be copied.
 * @param {string} destinationPath - The file path where the source file will be copied to.
 * @returns {Promise<void>} Resolves when the file copy is completed successfully, rejects if any error occurs during the process.
 */
const copyFileStream = (sourcePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    const readableStream = createReadStream(sourcePath);
    const writableStream = createWriteStream(destinationPath);

    readableStream.pipe(writableStream);

    writableStream.on('finish', resolve);
    writableStream.on('error', reject);
    readableStream.on('error', reject);
  });
};

export default copyFileStream;
