// Encoding
export const ENCODING_UTF8 = 'utf-8';
export const ENCODING_HEX = 'hex';

// Error Codes
export const ERROR_CODE_NO_ENTITY = 'ENOENT';
export const ERROR_CODE_FILE_EXISTS = 'EEXIST';

// Signals
export const SIGNAL_CTRL_C = 'SIGINT';

// Message Types
export const MESSAGE_TYPE_ERROR = 'error';
export const MESSAGE_TYPE_INFO = 'info';
export const MESSAGE_TYPE_PROMPT = 'prompt';

// User Messages
export const MESSAGE_CURRENT_DIR = 'You are currently in ';
export const MESSAGE_EXIT = 'Exiting...';
export const MESSAGE_CPU_ARCH = 'CPU Architecture: ';
export const MESSAGE_SYS_USERNAME = 'System Username: ';
export const MESSAGE_SYS_EOL = 'System EOL: ';
export const MESSAGE_HOME_DIR = 'Home Directory: ';

// Prompts
export const PROMPT_FILE_REQUIRED = 'File path is required for this command';
export const PROMPT_SRC_DEST_REQUIRED = 'Please specify the source and destination paths.';
export const PROMPT_FILE_PATH_NEW_NAME = 'Please specify the file path and the new file name.';
export const PROMPT_FILE_NAME = 'Please specify a file name.';
export const PROMPT_FILE_TO_DELETE = 'Please specify the file to delete.';

// Error Messages
export const ERROR_INVALID_COMMAND = 'Invalid Command';
export const ERROR_INVALID_DIRECTORY = 'Invalid directory change attempt. Reverting to home directory.';
export const ERROR_INVALID_INPUT = 'Invalid input';
export const ERROR_INVALID_USAGE = 'Invalid usage of os command. No additional arguments expected.';
export const ERROR_OPERATION_FAILED = 'Operation failed';
export const ERROR_HASH_CALCULATION = 'Error while calculating hash';
export const ERROR_FILE_NOT_FOUND = 'File not found';
export const ERROR_FILE_ALREADY_EXISTS = 'File already exists';
export const ERROR_EOL_FETCH = 'Error fetching EOL';
export const ERROR_CPU_FETCH = 'Error fetching CPU details';
export const ERROR_HOME_DIR_FETCH = 'Error fetching home directory';
export const ERROR_SYS_USERNAME_FETCH = 'Error fetching system user name';
export const ERROR_CPU_ARCH_FETCH = 'Error fetching CPU architecture';
export const ERROR_COMPRESS = 'Error while compressing file';
export const ERROR_DECOMPRESS = 'Error while decompressing file';
