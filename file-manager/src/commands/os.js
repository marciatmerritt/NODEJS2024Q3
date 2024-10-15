import {
  getEOL, getCPUs, getHomeDir,
  getSystemUserName, getCPUArchitecture,
} from '../utils/osInfo.js';
import {
  MESSAGE_SYS_EOL, MESSAGE_HOME_DIR, MESSAGE_TYPE_ERROR, MESSAGE_SYS_USERNAME,
  MESSAGE_CPU_ARCH, ERROR_INVALID_INPUT, ERROR_INVALID_USAGE, ERROR_OPERATION_FAILED,
} from '../utils/constants.js';
import { logger } from '../utils/utils.js';

/**
 * Handles operating system-related commands by interpreting the first argument (`args[0]`), then logs the result.
 *
 * @param {Array} args - An array of command-line arguments where args[0] specifies the OS command to execute.
 *
 * Supported commands:
 *   --EOL         : Logs the system's default end-of-line marker.
 *   --cpus        : Logs the number of CPUs and their details (model and clock rate in GHz).
 *   --homedir     : Logs the user's home directory.
 *   --username    : Logs the current system's username.
 *   --architecture: Logs the CPU architecture that Node.js was compiled for.
 *   Default       : Logs an invalid input message if the command is not recognized.
 *
 * @returns {void} - Logs the result or an error message to the console.
 */
const handleOSCommands = async (args) => {
  if (args.length === 0) {
    logger(ERROR_INVALID_INPUT, MESSAGE_TYPE_ERROR);
    return;
  };

  if (args.length > 1) {
    logger(`${ERROR_OPERATION_FAILED}: ${ERROR_INVALID_USAGE}`, MESSAGE_TYPE_ERROR);
    return;
  };

  try {
    switch (args[0]) {
      case '--EOL':
        logger(MESSAGE_SYS_EOL + JSON.stringify(await getEOL()));
        break;

      case '--cpus':
        const { numCPUs, cpuDetails } = await getCPUs();
        logger(`Number of CPUs: ${numCPUs}`);
        cpuDetails.forEach((cpu) => {
          logger(`CPU ${cpu.id}: ${cpu.model}, ${cpu.speedGHz} GHz`);
        });
        break;

      case '--homedir':
        logger(MESSAGE_HOME_DIR + await getHomeDir());
        break;

      case '--username':
        logger(MESSAGE_SYS_USERNAME + await getSystemUserName());
        break;

      case '--architecture':
        logger(MESSAGE_CPU_ARCH + await getCPUArchitecture());
        break;

      default:
        logger(ERROR_INVALID_INPUT, MESSAGE_TYPE_ERROR);
    }
  } catch (error) {
    logger(`${ERROR_OPERATION_FAILED}: ${error.message}`, MESSAGE_TYPE_ERROR);
  }
};

export default handleOSCommands;
