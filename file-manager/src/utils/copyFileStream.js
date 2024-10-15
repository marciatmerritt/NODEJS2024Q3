import { createReadStream, createWriteStream } from 'fs';

/**
 * Promisify the stream-based file copy process
 * @param {string} sourcePath - The source file path.
 * @param {string} destinationPath - The destination file path.
 * @returns {Promise<void>}
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