import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';
import { env } from '../config/env.js';

fs.mkdirSync(env.uploadsDir, { recursive: true });
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const attachmentTypes = new Set([...imageTypes, 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.uploadsDir),
  filename: (_req, file, cb) => cb(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
});
const makeUpload = (allowed) => multer({ storage, limits: { fileSize: 10 * 1024 * 1024, files: 8 }, fileFilter: (_req, file, cb) => cb(null, allowed.has(file.mimetype)) });
export const projectImagesUpload = makeUpload(imageTypes).array('images', 8);
export const requestFilesUpload = makeUpload(attachmentTypes).array('attachments', 8);
