import { Router } from 'express';
import * as auth from '../controllers/auth-controller.js';
import * as catalog from '../controllers/catalog-controller.js';
import * as requests from '../controllers/request-controller.js';
import { requireAdmin } from '../middleware/auth.js';
import { projectImagesUpload, requestFilesUpload } from '../middleware/upload.js';

export const router = Router();
router.post('/auth/login', auth.login); router.post('/auth/logout', auth.logout); router.get('/auth/me', requireAdmin, auth.me); router.put('/auth/password', requireAdmin, auth.changePassword);
router.get('/projects', catalog.publicProjects); router.get('/services', catalog.publicServices); router.post('/requests', requestFilesUpload, requests.createRequest);
router.get('/admin/projects', requireAdmin, catalog.adminProjects); router.post('/admin/projects', requireAdmin, projectImagesUpload, catalog.createProject); router.put('/admin/projects/:id', requireAdmin, projectImagesUpload, catalog.updateProject); router.delete('/admin/projects/:id', requireAdmin, catalog.deleteProject); router.delete('/admin/project-images/:imageId', requireAdmin, catalog.deleteProjectImage);
router.get('/admin/services', requireAdmin, catalog.adminServices); router.post('/admin/services', requireAdmin, catalog.createService); router.put('/admin/services/:id', requireAdmin, catalog.updateService); router.delete('/admin/services/:id', requireAdmin, catalog.deleteService);
router.get('/admin/requests', requireAdmin, requests.listRequests); router.patch('/admin/requests/:id/status', requireAdmin, requests.updateRequestStatus); router.delete('/admin/requests/:id', requireAdmin, requests.deleteRequest);
