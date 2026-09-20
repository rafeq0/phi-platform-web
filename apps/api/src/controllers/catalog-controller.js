import fs from 'node:fs/promises';
import path from 'node:path';
import { query } from '../database/pool.js';
import { env } from '../config/env.js';
import { projectSchema, serviceSchema } from '../validation/schemas.js';

const projectSelect = `SELECT p.*, COALESCE(json_agg(json_build_object('id', i.id, 'url', '/uploads/' || i.stored_name, 'originalName', i.original_name, 'displayOrder', i.display_order) ORDER BY i.display_order) FILTER (WHERE i.id IS NOT NULL), '[]') AS images FROM projects p LEFT JOIN project_images i ON i.project_id=p.id`;
const normalizeProject = (body) => projectSchema.parse({ ...body, technologies: typeof body.technologies === 'string' ? JSON.parse(body.technologies) : body.technologies, isPublished: body.isPublished === true || body.isPublished === 'true', displayOrder: Number(body.displayOrder || 0) });
export async function publicProjects(_req, res) { const { rows } = await query(`${projectSelect} WHERE p.is_published=TRUE GROUP BY p.id ORDER BY p.display_order, p.created_at DESC`); res.json({ projects: rows }); }
export async function adminProjects(_req, res) { const { rows } = await query(`${projectSelect} GROUP BY p.id ORDER BY p.display_order, p.created_at DESC`); res.json({ projects: rows }); }
export async function createProject(req, res) {
  const p = normalizeProject(req.body); const { rows: [created] } = await query(`INSERT INTO projects(name,description,demo_url,github_url,technologies,category,is_published,display_order) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [p.name,p.description,p.demoUrl||null,p.githubUrl||null,JSON.stringify(p.technologies),p.category,p.isPublished,p.displayOrder]);
  await saveImages(created.id, req.files); res.status(201).json({ project: created });
}
export async function updateProject(req, res) {
  const p = normalizeProject(req.body); const { rows: [updated] } = await query(`UPDATE projects SET name=$1,description=$2,demo_url=$3,github_url=$4,technologies=$5,category=$6,is_published=$7,display_order=$8,updated_at=NOW() WHERE id=$9 RETURNING *`, [p.name,p.description,p.demoUrl||null,p.githubUrl||null,JSON.stringify(p.technologies),p.category,p.isPublished,p.displayOrder,req.params.id]);
  if (!updated) return res.status(404).json({ message: 'Project not found' }); await saveImages(updated.id, req.files); res.json({ project: updated });
}
async function saveImages(projectId, files = []) { for (const [i, file] of files.entries()) await query('INSERT INTO project_images(project_id,original_name,stored_name,mime_type,size_bytes,relative_path,display_order) VALUES($1,$2,$3,$4,$5,$6,$7)', [projectId,path.basename(file.originalname),file.filename,file.mimetype,file.size,`uploads/${file.filename}`,i]); }
export async function deleteProject(req, res) { const { rows: images } = await query('SELECT stored_name FROM project_images WHERE project_id=$1',[req.params.id]); const result=await query('DELETE FROM projects WHERE id=$1',[req.params.id]); if(!result.rowCount) return res.status(404).json({message:'Project not found'}); await Promise.all(images.map(i=>fs.unlink(path.join(env.uploadsDir,i.stored_name)).catch(()=>{}))); res.status(204).end(); }
export async function deleteProjectImage(req,res) { const { rows:[image] }=await query('DELETE FROM project_images WHERE id=$1 RETURNING stored_name',[req.params.imageId]); if(!image) return res.status(404).json({message:'Image not found'}); await fs.unlink(path.join(env.uploadsDir,image.stored_name)).catch(()=>{}); res.status(204).end(); }
export async function publicServices(_req,res) { const {rows}=await query('SELECT * FROM services ORDER BY display_order, created_at'); res.json({services:rows}); }
export const adminServices=publicServices;
export async function createService(req,res) { const s=serviceSchema.parse(req.body); const {rows:[service]}=await query('INSERT INTO services(name,description,category,icon,features,display_order) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[s.name,s.description,s.category,s.icon||null,JSON.stringify(s.features),s.displayOrder]); res.status(201).json({service}); }
export async function updateService(req,res) { const s=serviceSchema.parse(req.body); const {rows:[service]}=await query('UPDATE services SET name=$1,description=$2,category=$3,icon=$4,features=$5,display_order=$6,updated_at=NOW() WHERE id=$7 RETURNING *',[s.name,s.description,s.category,s.icon||null,JSON.stringify(s.features),s.displayOrder,req.params.id]); if(!service)return res.status(404).json({message:'Service not found'});res.json({service}); }
export async function deleteService(req,res) { const result=await query('DELETE FROM services WHERE id=$1',[req.params.id]); if(!result.rowCount)return res.status(404).json({message:'Service not found'});res.status(204).end(); }
