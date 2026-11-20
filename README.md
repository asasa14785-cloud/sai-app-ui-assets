# Say — حزمة أصول واجهة التطبيق (App UI Assets)

مستودع يحتوي على أصول واجهة المستخدم والهوية البصرية لتطبيق **Say** (تطبيق ساي — إدارة المصروفات، `com.moments.expenses`)، بالإضافة إلى معاينة تفاعلية مبنية بـ **React + Vite + Tailwind CSS** لعرض الحزمة.

## المحتويات

| المسار | الوصف |
| --- | --- |
| `public/pack/01_store_screenshots/` | لقطات شاشة المتجر (هاتف + تابلت) |
| `public/pack/02_app_screens_cropped/` | شاشات التطبيق المقصوصة |
| `public/pack/03_brand_and_icons/` | الشعار، أيقونة التطبيق، أيقونات المشغّل، ورسومات المتجر |
| `الفديو المرجعي/` | الفيديو المرجعي لحركة الواجهة (`WhatsApp Video 2026-11-20 at 11.35.50 AM.mp4`) |
| `public/downloads/` | سكربتات مساعدة (`1_install_xapk.sh`, `2_record_flows.sh`) |
| `src/` | كود تطبيق المعاينة (React + TypeScript) |
| `src/data/` | بيانات التصميم: `design_tokens.json`, `manifest.json`, `screens_flow_and_transitions.json` |

## التشغيل محليًا

```bash
npm install
npm run dev      # خادم التطوير
npm run build    # بناء نسخة الإنتاج
npm run preview  # معاينة نسخة الإنتاج
```

## التقنيات

- React 19
- Vite 7
- TypeScript 5
- Tailwind CSS 4

## ملاحظات

- جميع الأصول داخل مجلد `public` تُقدَّم كما هي عند البناء.
- ملف `vite.config.ts` يستخدم `vite-plugin-singlefile` لإمكانية إخراج نسخة ملف واحد.
