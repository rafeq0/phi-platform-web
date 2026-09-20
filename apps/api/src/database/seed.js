import bcrypt from 'bcrypt';
import { pool } from './pool.js';

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password) throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set before seeding');

const services = [
  ['تطوير المواقع', 'مواقع سريعة ومتجاوبة ومصممة لتحقيق أهداف عملك.', 'maintenance', 'fa-code', ['تصميم متجاوب', 'أداء محسّن', 'لوحة تحكم']],
  ['تطبيقات الموبايل', 'تطبيقات iOS وAndroid بتجربة استخدام سلسة.', 'maintenance', 'fa-mobile-alt', ['iOS وAndroid', 'واجهة حديثة', 'ربط API']],
  ['الأمن السيبراني', 'فحص وحماية البنية الرقمية والأنظمة الحساسة.', 'security', 'fa-shield-alt', ['فحص الثغرات', 'تقارير واضحة', 'توصيات عملية']],
  ['DevOps والبنية السحابية', 'أتمتة النشر ومراقبة الأنظمة واستقرارها.', 'security', 'fa-cloud', ['CI/CD', 'مراقبة مستمرة', 'نسخ احتياطي']],
  ['تحسين الأداء', 'تسريع المواقع وتحسين تجربة المستخدم ومحركات البحث.', 'growth', 'fa-tachometer-alt', ['Core Web Vitals', 'تحليل الأداء', 'خطة تحسين']]
];
const projects = [
  ['متجر الأناقة', 'منصة تجارة إلكترونية متكاملة.', 'https://example.com', null, ['React', 'Node.js', 'PostgreSQL'], 'متجر إلكتروني'],
  ['نظام المستشفى الذكي', 'إدارة موارد طبية متكاملة.', null, null, ['Express', 'PostgreSQL'], 'نظام ERP'],
  ['تطبيق توصيل الطعام', 'تطبيق iOS وAndroid للطلب والتوصيل.', null, null, ['React Native', 'Node.js'], 'تطبيق موبايل'],
  ['منصة التعلم الذكي', 'منصة تعليمية مع فيديو واختبارات.', null, null, ['React', 'PostgreSQL'], 'منصة تعليمية']
];

const hash = await bcrypt.hash(password, 12);
await pool.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2)
  ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = NOW()`, [email.toLowerCase(), hash]);

for (let i = 0; i < services.length; i++) {
  const [name, description, category, icon, features] = services[i];
  await pool.query(`INSERT INTO services (name, description, category, icon, features, display_order)
    SELECT $1::varchar, $2, $3, $4, $5::jsonb, $6 WHERE NOT EXISTS (SELECT 1 FROM services WHERE name = $1::varchar)`, [name, description, category, icon, JSON.stringify(features), i]);
}
for (let i = 0; i < projects.length; i++) {
  const [name, description, demo, github, technologies, category] = projects[i];
  await pool.query(`INSERT INTO projects (name, description, demo_url, github_url, technologies, category, is_published, display_order)
    SELECT $1::varchar, $2, $3, $4, $5::jsonb, $6, TRUE, $7 WHERE NOT EXISTS (SELECT 1 FROM projects WHERE name = $1::varchar)`, [name, description, demo, github, JSON.stringify(technologies), category, i]);
}
console.log('Seed complete');
await pool.end();
