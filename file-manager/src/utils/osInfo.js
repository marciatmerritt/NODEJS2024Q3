import { EOL, arch, cpus, homedir, userInfo } from 'node:os';
import { convertMHzToGHz } from './utils.js';
import {
  CPU_ARCH_ERROR, CPU_ERROR, EOL_ERROR,
  HOME_DIR_ERROR, SYS_USERNAME_ERROR,
} from './constants.js';

/**
 * Get the system End-of-Line marker (os --EOL)
 * @returns {Promise<string>} Resolves to the system-specific EOL character(s).
 */
export const getEOL = async () => {
  try {
    return Promise.resolve(EOL);
  } catch (error) {
    throw new Error(`${EOL_ERROR}: ${error.message}`);
  }
};

/**
 * Get information about the host machine's CPUs. (os --cpus)
 * @returns {Promise<Object>} Resolves to an object containing the number of CPUs and clock rate in GHZ
 */
export const getCPUs = async () => {
  const cpusArray = cpus();
  const numCPUs = cpus().length;
  const cpuDetails = cpusArray.map((cpu, index) => ({
    id: index + 1,
    model: cpu.model,
    speedGHz: convertMHzToGHz(cpu.speed),
  }));

  try {
    return Promise.resolve({ numCPUs, cpuDetails });
  } catch (error) {
    throw new Error(`${CPU_ERROR}: ${error.message}`);
  }
};

/**
 * Get the home directory of the current user. (os --homedir)
 * @returns {Promise<string>} Resolves to the path of the home directory.
 */
export const getHomeDir = async () => {
  try {
    return Promise.resolve(homedir());
  } catch (error) {
    throw new Error(`${HOME_DIR_ERROR}: ${error.message}`);
  }
};

/**
 * Get the username of the current system user. (os --username)
 * @returns {Promise<string>} Resolves to the current user's username.
 */
export const getSystemUserName = async () => {
  try {
    return Promise.resolve(userInfo().username);
  } catch (error) {
    throw new Error(`${SYS_USERNAME_ERROR}: ${error.message}`);
  }
};

/**
 * Get the CPU architecture for which the Node.js binary was compiled. (os --architecture)
 * @returns {Promise<string>} Resolves to the system's CPU architecture.
 */
export const getCPUArchitecture = async () => {
  try {
    return Promise.resolve(arch());
  } catch (error) {
    throw new Error(`${CPU_ARCH_ERROR}: ${error.message}`);
  }
};
