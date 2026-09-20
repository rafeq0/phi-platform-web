import fs from 'node:fs/promises';
import path from 'node:path';
import { query } from '../database/pool.js';
import { env } from '../config/env.js';
import { requestSchema, requestStatusSchema } from '../validation/schemas.js';

export async function createRequest(req, res) {
  const data = requestSchema.parse(req.body);
  const { rows: [created] } = await query('INSERT INTO client_requests(name,email,phone,service,message,budget) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [data.name,data.email.toLowerCase(),data.phone||null,data.service,data.message,data.budget||null]);
  for (const file of req.files || []) await query('INSERT INTO request_attachments(request_id,original_name,stored_name,mime_type,size_bytes,relative_path) VALUES($1,$2,$3,$4,$5,$6)', [created.id,path.basename(file.originalname),file.filename,file.mimetype,file.size,`uploads/${file.filename}`]);
  res.status(201).json({ request: created });
}
export async function listRequests(_req,res) { const {rows}=await query(`SELECT r.*, COALESCE(json_agg(json_build_object('id',a.id,'url','/uploads/' || a.stored_name,'originalName',a.original_name)) FILTER(WHERE a.id IS NOT NULL),'[]') attachments FROM client_requests r LEFT JOIN request_attachments a ON a.request_id=r.id GROUP BY r.id ORDER BY r.created_at DESC`);res.json({requests:rows}); }
export async function updateRequestStatus(req,res) { const {status}=requestStatusSchema.parse(req.body);const {rows:[request]}=await query('UPDATE client_requests SET status=$1,updated_at=NOW() WHERE id=$2 RETURNING *',[status,req.params.id]);if(!request)return res.status(404).json({message:'Request not found'});res.json({request}); }
export async function deleteRequest(req,res) { const {rows:files}=await query('SELECT stored_name FROM request_attachments WHERE request_id=$1',[req.params.id]);const result=await query('DELETE FROM client_requests WHERE id=$1',[req.params.id]);if(!result.rowCount)return res.status(404).json({message:'Request not found'});await Promise.all(files.map(f=>fs.unlink(path.join(env.uploadsDir,f.stored_name)).catch(()=>{})));res.status(204).end(); }
