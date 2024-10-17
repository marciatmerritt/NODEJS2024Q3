# File Manager

## Description

File Manager is a CLI-based application built using Node.js APIs. It allows users to perform basic file operations, utilize the Streams API, gather information about the host machine's operating system, perform hash calculations, and compress/decompress files.

## Features

- **CLI-based operation**: Interact with the file manager through the command line.
- **File operations**: Copy, move, delete, rename files.
- **Streams API**: Utilize Node.js Streams API for file operations.
- **OS information**: Retrieve details about the host machine's operating system.
- **Hash calculations**: Compute hashes for files.
- **Compression**: Compress and decompress files using the Brotli algorithm.

## Technical Requirements

- **Node.js version**: Use version 22.x.x (22.9.0 or higher).
- **No external dependencies**: The application should not require any external libraries.

## Table of Contents
- Installation
- Usage
- Commands
- Examples
- Contributing
- License
- Credits
- Contact
- Troubleshooting
- Additional Resources

## Installation

1. Ensure you have Node.js version 22.9.0 or higher installed.
2. Clone the repository.
3. Navigate to the project directory.
4. Run the following command to start the application:
    ```bash
    npm run start -- --username=your_username
    ```

## Usage

- Upon starting, the program will display:
    ```
    Welcome to the File Manager, Username!
    ```
- To exit the program, press `ctrl + c` or type `.exit`. The program will then display:
    ```
    Thank you for using File Manager, Username, goodbye!
    ```
- The current working directory is displayed at the start and after each operation:
    ```
    You are currently in path_to_working_directory
    ```

## Commands

### Navigation & Working Directory

- **Go upper from current directory**:
    ```bash
    up
    ```
    Moves up one directory level. If you are already at the root directory, this command does nothing.

- **Change directory**:
    ```bash
    cd path_to_directory
    ```
    Changes the current working directory to the specified path. The path can be relative or absolute.


- **List directory contents**:
    ```bash
    ls
    ```
    Lists all files and folders in the current directory. The output is sorted alphabetically, with folders listed first.


### File Operations

- **Read file**:
    ```bash
    cat path_to_file
    ```
    Reads the content of the specified file and prints it to the console using a Readable stream.

    Example:
    ```bash
    You are currently in /home/user/projects

    ENTER COMMAND> cat README.md
    File Manager is a CLI-based application built using Node.js APIs...
    ```

- **Create file**:
    ```bash
    add new_file_name
    ```
    Creates an empty file with the specified name in the current working directory.

    Example:
    ```bash
    You are currently in /home/user/projects

    ENTER COMMAND> add newfile.txt
    File /home/user/projects/newfile.txt created successfully.
    ```

- **Rename file**:
    ```bash
    rn path_to_file new_filename
    ```
    Renames the specified file to the new filename. The file content remains unchanged.

- **Copy file**:
    ```bash
    cp path_to_file path_to_new_directory
    ```
    Copies the specified file to the new directory using Readable and Writable streams.

- **Move file**:
    ```bash
    mv path_to_file path_to_new_directory
    ```
    Moves the specified file to the new directory. This operation is similar to copy but deletes the original file after copying.

- **Delete file**:
    ```bash
    rm path_to_file
    ```
    Deletes the specified file from the file system.

### Operating System Info

- **Get EOL**:
    ```bash
    os --EOL
    ```
    Prints the default system End-Of-Line (EOL) character(s).

- **Get CPUs info**:
    ```bash
    os --cpus
    ```
    Prints information about the host machine's CPUs, including the number of CPUs, model, and clock rate (in GHz).

- **Get home directory**:
    ```bash
    os --homedir
    ```
    Prints the path to the current user's home directory.

- **Get system username**:
    ```bash
    os --username
    ```
    Prints the system username of the current user.

- **Get CPU architecture**:
    ```bash
    os --architecture
    ```
    Prints the CPU architecture for which the Node.js binary was compiled.

### Hash Calculation

- **Calculate file hash**:
    ```bash
    hash path_to_file
    ```
    Calculates and prints the hash of the specified file.

### Compression & Decompression

- **Compress file**:
    ```bash
    compress path_to_file path_to_destination
    ```
    Compresses the specified file using the Brotli algorithm and saves it to the destination path.

- **Decompress file**:
    ```bash
    decompress path_to_file path_to_destination
    ```
    Decompresses the specified file using the Brotli algorithm and saves it to the destination path. The decompressed file should match the original file before compression.

## Error Handling

- **Invalid input**: Displays `Invalid input` and prompts for another command.
- **Operation failure**: Displays `Operation failed` and prompts for another command.

## Examples

### Navigation & Working Directory

- **Go upper from current directory**:
    ```bash
    up
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > up
    You are currently in /home/user
    ```

- **Change directory**:
    ```bash
    cd path_to_directory
    ```
    Example:
    ```bash
    You are currently in /home/user
    > cd projects
    You are currently in /home/user/projects
    ```

- **List directory contents**:
    ```bash
    ls
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > ls
    Folders:
    - src
    - tests
    Files:
    - README.md
    - index.js
    ```

### File Operations

- **Read file**:
    ```bash
    cat path_to_file
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > cat README.md
    File Manager is a CLI-based application built using Node.js APIs...
    ```

- **Create file**:
    ```bash
    add new_file_name
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > add newfile.txt
    File newfile.txt created successfully.
    ```

- **Rename file**:
    ```bash
    rn path_to_file new_filename
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > rn newfile.txt renamedfile.txt
    File renamedfile.txt created successfully.
    ```

- **Copy file**:
    ```bash
    cp path_to_file path_to_new_directory
    ```
    Example:
    ```bash
    You are currently in /home/user/projects
    > cp renamedfile.txt /home/user/backup
    File renamedfile.txt copied

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors


Marcia Merritt


## Version History

* 0.1
    * Initial Release
