import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { FilesService, filesService } from '../services/files.service';
import path from 'path';
import fs from 'fs';

class FilesController {
   private filesService: FilesService;

   constructor(filesService: FilesService) {
      this.filesService = filesService;
   }

   public async getFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
      try {
         const foldersWithFiles = this.filesService.getFilesList();
         this.renderFoldersPage(res, foldersWithFiles);
      } catch (error) {
         next(error);
      }
   }

   public async postDownload(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return this.handleValidationError(res, errors.array());
         }

         const selectedFiles = req.body.files;

         if (typeof selectedFiles === 'string') {
            return this.handleSingleFileDownload(res, selectedFiles);
         }

         if (!selectedFiles || !Array.isArray(selectedFiles)) {
            return this.handleBadRequest(res, 'Invalid request: No files selected');
         }

         this.validateFiles(selectedFiles);

         const result = await this.filesService.downloadFiles(selectedFiles);

         if (result.success) {
            return this.handleZipDownload(res);
         } else {
            return this.handleBadRequest(res, result.message || 'Bad request');
         }
      } catch (error) {
         next(error);
      }
   }

   public async getDownload(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
      const file = req.query.file as string;
      try {
         const result = this.filesService.downloadFile(file);

         if (result.success) {
            return this.handleSingleFileDownload(res, file);
         } else {
            return this.handleNotFound(res, result.message || 'Not found');
         }
      } catch (error) {
         next(error);
      }
   }

   private renderFoldersPage(res: Response, foldersWithFiles: any): void {
      res.render('folders', { foldersWithFiles });
   }

   private validateFiles(selectedFiles: string[]): void {
      for (const file of selectedFiles) {
         if (typeof file !== 'string' || file.includes('..')) {
            throw new Error('Invalid file selected');
         }
      }
   }

   private handleValidationError(res: Response, errors: any[]): Response {
      return res.status(400).json({ errors });
   }

   private handleBadRequest(res: Response, message: string): Response {
      return res.status(400).send(message);
   }

   private handleNotFound(res: Response, message: string): Response {
      return res.status(404).send(message);
   }

   private handleSingleFileDownload(res: Response, file: string): void {
      res.download(path.resolve(this.filesService.dataFolder, file), file, (err) => {
         if (err) {
            console.error('Error during download:', err);
         }
      });
   }

   private handleZipDownload(res: Response): void {
      res.download(path.resolve(this.filesService.dataFolder, 'selectedFiles.zip'), 'selectedFiles.zip', (err) => {
         if (err) {
            console.error('Error during download:', err);
         }

         fs.unlinkSync(path.resolve(this.filesService.dataFolder, 'selectedFiles.zip'));
      });
   }
}

export const filesController = new FilesController(filesService);
