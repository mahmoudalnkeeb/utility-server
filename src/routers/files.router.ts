import express, { Router } from 'express';
import { filesController } from '../controllers/files.controller';

const filesRouter: Router = express.Router();

filesRouter.get('/files', filesController.getFiles.bind(filesController));

filesRouter.post('/download', filesController.postDownload.bind(filesController));

filesRouter.get('/download', filesController.getDownload.bind(filesController));

export default filesRouter;
