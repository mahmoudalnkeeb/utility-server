import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

interface FilesList {
   folder: string;
   files: string[];
}

interface DownloadResult {
   success: boolean;
   message?: string;
}

export class FilesService {
   dataFolder: string;

   constructor() {
      this.dataFolder = path.resolve(process.cwd(), 'data');
   }

   public getFilesList(): FilesList[] {
      const folders = fs.readdirSync(this.dataFolder);

      return folders.map((folder) => {
         const folderPath = path.resolve(this.dataFolder, folder);
         const files = fs.readdirSync(folderPath);
         return { folder, files };
      });
   }

   public async downloadFiles(selectedFiles: string | string[]): Promise<DownloadResult> {
      try {
         if (!selectedFiles || (Array.isArray(selectedFiles) && selectedFiles.length === 0)) {
            return { success: false, message: 'No files selected' };
         }

         const zipFilePath = path.resolve(this.dataFolder, 'selectedFiles.zip');
         const output = fs.createWriteStream(zipFilePath);
         const archive = archiver('zip', { zlib: { level: 9 } });

         output.on('close', () => {
            console.log('Download started...');
         });

         archive.pipe(output);

         if (typeof selectedFiles === 'string') {
            const filePath = path.resolve(this.dataFolder, selectedFiles);
            archive.append(fs.createReadStream(filePath), { name: selectedFiles });
         } else {
            selectedFiles.forEach((file) => {
               const filePath = path.resolve(this.dataFolder, file);
               archive.append(fs.createReadStream(filePath), { name: file });
            });
         }

         await new Promise<void>((resolve) => {
            output.on('close', () => resolve());
            archive.finalize();
         });

         return { success: true };
      } catch (error) {
         console.error('Error during multiple file download:', error);
         return { success: false, message: 'Something went wrong' };
      }
   }

   public downloadFile(file: string): DownloadResult {
      try {
         const filePath = path.resolve(this.dataFolder, file);

         console.log('Requested file:', file);

         if (!fs.existsSync(filePath)) {
            console.log('File status:', 'NOT FOUND');
            return { success: false, message: 'File not found' };
         }

         console.log('File status:', 'FOUND');
         console.log('Download started...');
         return { success: true };
      } catch (error) {
         console.error('Error during file download:', error);
         return { success: false, message: 'Something went wrong' };
      }
   }
}

export const filesService = new FilesService();
