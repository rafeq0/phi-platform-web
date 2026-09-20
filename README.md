# Phi Platform

تطبيق Phi Platform: React/Vite للواجهة، Express/PostgreSQL للـAPI، وملفات مرفوعة محليًا.

## التشغيل المحلي

1. أنشئ قاعدة PostgreSQL باسم `phi_platform`، ثم عدّل `DATABASE_URL` في `.env`.
2. غيّر `JWT_SECRET` إلى قيمة عشوائية قوية، وحدد بيانات المدير في `.env`.
3. ثبّت الاعتماديات: `npm install`.
4. أنشئ الجداول والبيانات الأولية: `npm run migrate` ثم `npm run seed`.
5. شغّل الواجهة والـAPI: `npm run dev`.

واجهة الويب: `http://localhost:5173`، والـAPI: `http://localhost:4000`.

## النشر

اضبط متغيرات البيئة على الاستضافة، نفّذ migrations، ثم `npm run build` و`npm start`. عند `NODE_ENV=production` يقدم Express ناتج `apps/web/dist` نفسه.

لا ترفع `.env` أو `storage/uploads` إلى Git. خذ نسخة احتياطية من PostgreSQL ومجلد الرفع معًا.
