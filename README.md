Certainly! Here's the updated README with "Features Added" and "Features Will Be Added" sections:

# Utility Server

A simple utility server for managing files, video streaming, chat, and suggestions with TypeScript and Express.

## Table of Contents

-  [Introduction](#introduction)
-  [Features](#features)
-  [Soon](#soon)
-  [Prerequisites](#prerequisites)
-  [Installation](#installation)
-  [Usage](#usage)
-  [Configuration](#configuration)
-  [Endpoints](#endpoints)
-  [Folder Structure](#folder-structure)
-  [Contributing](#contributing)
-  [License](#license)

## Introduction

Utility Server is a TypeScript-based Express server designed for managing files, video streaming, chat, and suggestions in local network. It provides functionality to list folders and files, download single files, and download selected files as a zip archive. Additionally, it will support file uploads, video streaming, and a simple chat and suggestion system.

## Features

-  List folders and files dynamically.
-  Download single files.
-  Download selected files as a zip archive.

## Soon

-  File upload for users.
-  Video streaming feature.
-  Simple chat functionality.
-  Suggestion page where admin can suggest websites for users.
-  User authentication.
-  ...

## Prerequisites

Make sure you have the following installed:

-  Node.js
-  npm

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/utility-server.git
   ```

2. Install dependencies:

   ```bash
   cd utility-server
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will be running at [http://localhost](http://localhost).

## Usage

1. Access the file list at [http://localhost/files](http://localhost/files) or machine local ip if not the same device running on it.
2. Download single files or select multiple files and download them as a zip archive.

## Configuration

-  [ ] TODO: add config file to configure server

## Endpoints

-  `/files`: List all folders and files.
-  `/download`: Download selected files (POST) or a single file (GET).

## Folder Structure

```
utility-server/
|-- src/
|   |-- controllers/
|   |-- services/
|   |-- views/
|   |-- app.ts
|-- .gitignore
|-- package.json
|-- README.md
|-- tsconfig.json
```

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
