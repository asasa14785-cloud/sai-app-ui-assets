import { useState } from "react";
import manifest from "./data/manifest.json";
import tokens from "./data/design_tokens.json";
import flow from "./data/screens_flow_and_transitions.json";

type Item = { src: string; name: string; kb: number };
const M = manifest as Record<string, Item[]>;

const DL = [
  {
    title: "حزمة الأصول الكاملة (ZIP)",
    desc: "لقطات المتجر + شاشات مقصوصة + الأيقونات + بيانات الشاشات والانتقالات والتصميم + الكود المفكوك + سكربتات التسجيل",
    href: "downloads/say_motion_asset_pack.zip",
    size: "8 MB",
    primary: true,
  },
  {
    title: "ملف التطبيق XAPK (الإصدار 1.0.4)",
    desc: "تم تنزيله من APKPure والتحقق من SHA-256. يُثبَّت بـ adb install-multiple (السكربت جاهز).",
    href: "downloads/say_com.moments.expenses_1.0.4.xapk",
    size: "84 MB",
  },
  { title: "README.md", desc: "شرح المحتويات والتنبيهات", href: "downloads/README.md", size: "3 KB" },
  { title: "1_install_xapk.sh", desc: "تثبيت الـXAPK على جهاز/محاكي", href: "downloads/1_install_xapk.sh", size: "1 KB" },
  { title: "2_record_flows.sh", desc: "تسجيل 16 تدفّقًا كفيديو + لقطات بدقة أصلية", href: "downloads/2_record_flows.sh", size: "2 KB" },
];

function Gallery({ items, ratio = "9/16", contain = false }: { items: Item[]; ratio?: string; contain?: boolean }) {
  const [open, setOpen] = useState<Item | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((it) => (
          <button
            key={it.src}
            onClick={() => setOpen(it)}
            className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-right transition hover:border-cyan-400/60"
          >
            <div
              className="flex items-center justify-center bg-slate-800"
              style={{ aspectRatio: ratio }}
            >
              <img
                src={it.src}
                alt={it.name}
                loading="lazy"
                className={`h-full w-full ${contain ? "object-contain" : "object-cover object-top"}`}
              />
            </div>
            <div className="px-2 py-1.5 text-[11px] text-slate-400">
              <div dir="ltr" className="truncate text-left text-slate-200">{it.name}</div>
              <div>{it.kb} KB</div>
            </div>
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setOpen(null)}>
          <div className="flex max-h-full flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img src={open.src} alt={open.name} className="max-h-[80vh] max-w-full rounded-lg object-contain" />
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <span dir="ltr">{open.name}</span>
              <a href={open.src} download className="rounded-lg bg-cyan-500 px-3 py-1.5 font-semibold text-slate-900">
                تنزيل
              </a>
              <button onClick={() => setOpen(null)} className="rounded-lg border border-white/20 px-3 py-1.5">
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Section({ id, title, sub, children }: { id: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-2xl font-extrabold text-white">{title}</h2>
      {sub ? <p className="mt-1 mb-5 max-w-3xl text-sm leading-7 text-slate-400">{sub}</p> : <div className="mb-5" />}
      {children}
    </section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
      <div className="h-9 w-9 shrink-0 rounded-md border border-white/20" style={{ background: value }} />
      <div className="min-w-0 text-xs">
        <div className="truncate text-slate-200">{name}</div>
        <div dir="ltr" className="text-right text-slate-400">
          {value}
        </div>
      </div>
    </div>
  );
}

type Screen = {
  id: string;
  route: string | null;
  file?: string;
  copy?: string[];
  states?: string[];
  components?: string[];
  modals?: string[];
  stories?: string[];
  notes?: string;
  next?: string[];
};

export default function App() {
  const [tab, setTab] = useState<"screens" | "transitions" | "design">("screens");
  const screens = flow.screens as Screen[];
  const flat: [string, string][] = [];
  const c = tokens.colors as Record<string, unknown>;
  Object.entries(c).forEach(([k, v]) => {
    if (typeof v === "string" && v.startsWith("#")) flat.push([k, v]);
  });
  Object.entries(c.status as Record<string, string>).forEach(([k, v]) => flat.push(["status / " + k, v]));
  (c.stories_palette as string[]).forEach((v, i) => flat.push(["stories " + (i + 1), v]));
  (c.pro_card_gradient as string[]).forEach((v, i) => flat.push(["pro gradient " + (i + 1), v]));

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 text-slate-200"
      style={{ fontFamily: "system-ui, 'Segoe UI', Tahoma, sans-serif" }}
    >
      <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#0a3a4d] via-slate-950 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center gap-4">
            <img src="pack/03_brand_and_icons/play_store_icon_512.png" alt="Say" className="h-16 w-16 rounded-2xl shadow-xl" />
            <div>
              <div className="text-xs tracking-widest text-cyan-300" dir="ltr">
                com.moments.expenses
              </div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">حزمة أصول Say للفيديو الموشن</h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            لقطات المتجر، شاشات التطبيق الفعلية مقصوصة، الأيقونات، ونسخة التطبيق (XAPK) مع خريطة كل الشاشات والانتقالات والألوان
            المستخرجة من الكود.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2 text-sm">
            {[
              ["dl", "التنزيلات"],
              ["warn", "تنبيه النسخ"],
              ["store", "لقطات المتجر"],
              ["crops", "الشاشات المقصوصة"],
              ["brand", "الهوية"],
              ["flow", "الشاشات والانتقالات"],
              ["record", "التسجيل الحقيقي"],
            ].map(([id, t]) => (
              <a key={id} href={"#" + id} className="rounded-full border border-white/15 px-3 py-1.5 hover:bg-white/10">
                {t}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <Section id="dl" title="التنزيلات">
        <div className="grid gap-3 md:grid-cols-2">
          {DL.map((d) => (
            <a
              key={d.href}
              href={d.href}
              download
              className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 ${
                d.primary ? "border-cyan-400/60 bg-cyan-500/10" : "border-white/10 bg-white/5"
              }`}
            >
              <div>
                <div className="font-bold text-white">{d.title}</div>
                <div className="mt-1 text-xs leading-6 text-slate-400">{d.desc}</div>
              </div>
              <div className="shrink-0 rounded-lg bg-cyan-500 px-3 py-2 text-center text-xs font-bold text-slate-900">⬇ {d.size}</div>
            </a>
          ))}
        </div>
        <p dir="ltr" className="mt-3 break-all text-left text-[11px] text-slate-500">
          XAPK SHA-256: 46540a335162dcde64c3786456e4c52650b6f1929429fded502d61fb1a722fab · v1.0.4 (code 16) · min SDK 24 · arm64-v8a
        </p>
      </Section>

      <Section id="warn" title="⚠️ تنبيه مهم عن النسخ">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm leading-7">
            <b className="text-amber-300">لقطات الهاتف 1–8 = التطبيق الحديث (v2)</b>
            <br />
            حسابات، رسائل البنك، Say AI، Wealth، Subscriptions، Installments، Goals. هذه النسخة <b>لا يتوفر لها ملف APK علني</b> — المرايا
            (APKPure / APKMirror) محجوبة أو تحمل 1.0.4 فقط، وتنزيلها من Google Play يتطلب حساب Google.
          </div>
          <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 p-4 text-sm leading-7">
            <b className="text-cyan-300">XAPK + لقطات التابلت 9–12 = التطبيق القديم (v1.0.4)</b>
            <br />
            تطبيق Expo/React Native لتسجيل المصاريف بالصوت. استخرجت منه كل المسارات والشاشات والانتقالات والألوان من كود Hermes. لا يمكن تشغيله
            هنا (لا يوجد محاكي: بيئة بلا KVM)، لذلك لا توجد لقطات حقيقية له من التشغيل — استخدم سكربت التسجيل.
          </div>
        </div>
      </Section>

      <Section
        id="store"
        title="لقطات المتجر الأصلية"
        sub="8 لقطات هاتف 1080×1920 (التصميم الحديث) و4 لقطات تابلت 2048×2732 (التصميم القديم). اضغط لعرض/تنزيل."
      >
        <h3 className="mb-2 text-sm font-bold text-cyan-300">هاتف</h3>
        <Gallery items={M["01_store_screenshots"].filter((i) => i.src.includes("/phone/"))} />
        <h3 className="mt-8 mb-2 text-sm font-bold text-cyan-300">تابلت</h3>
        <Gallery items={M["01_store_screenshots"].filter((i) => i.src.includes("/tablet/"))} ratio="3/4" />
      </Section>

      <Section
        id="crops"
        title="شاشات التطبيق مقصوصة (بلا إطار الجهاز والعناوين)"
        sub="جاهزة للإدخال في After Effects / Figma / Rive داخل إطار جهاز من اختيارك. الملفات المعلّمة PARTIAL جزء من الشاشة فقط (اللقطة الأصلية مركّبة). اللقطات المائلة 8 و10 و12 لا يمكن قصّها دون تشويه."
      >
        <Gallery items={M["02_app_screens_cropped"]} ratio="3/5" contain />
      </Section>

      <Section id="brand" title="الهوية والأيقونات">
        <Gallery items={M["03_brand_and_icons"].filter((i) => !i.name.includes("foreground"))} ratio="1/1" contain />
      </Section>

      <Section
        id="flow"
        title="كل الشاشات والانتقالات (النسخة 1.0.4)"
        sub="مستخرجة من index.android.bundle (Hermes) بفك الـbytecode: 5 شاشات عامة + 5 شاشات محمية + Modals وحالات. كل شيء متاح كـ JSON داخل الـZIP."
      >
        <div className="mb-4 flex gap-2 text-sm">
          {(
            [
              ["screens", `الشاشات (${screens.length})`],
              ["transitions", `الانتقالات (${flow.transitions.length})`],
              ["design", "التصميم"],
            ] as const
          ).map(([k, t]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 ${tab === k ? "bg-cyan-500 font-bold text-slate-900" : "border border-white/15"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "screens" && (
          <div className="grid gap-3 md:grid-cols-2">
            {screens.map((s, i) => (
              <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-slate-900">
                      {i + 1}
                    </span>
                    <b className="text-white" dir="ltr">
                      {s.id}
                    </b>
                  </div>
                  <code dir="ltr" className="rounded bg-black/40 px-2 py-0.5 text-[11px] text-cyan-200">
                    {s.route ?? "native"}
                  </code>
                </div>
                {s.file && (
                  <div dir="ltr" className="mt-1 text-left text-[11px] text-slate-500">
                    {s.file}.tsx
                  </div>
                )}
                {(
                  [
                    ["نصوص", s.copy],
                    ["مكوّنات", s.components],
                    ["حالات", s.states],
                    ["نوافذ", s.modals],
                    ["Stories", s.stories],
                  ] as [string, string[] | undefined][]
                ).map(([label, arr]) =>
                  arr && arr.length ? (
                    <div key={label} className="mt-2 text-xs leading-6">
                      <span className="text-slate-500">{label}: </span>
                      <span dir="ltr" className="text-slate-300">
                        {arr.join("  ·  ")}
                      </span>
                    </div>
                  ) : null
                )}
                {s.notes && <div className="mt-2 text-xs text-amber-200/80">{s.notes}</div>}
                {s.next && (
                  <div dir="ltr" className="mt-2 text-left text-[11px] text-emerald-300">
                    → {s.next.join(" | ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "transitions" && (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {flow.transitions.map((t, i) => (
              <div key={i} className="grid gap-1 border-b border-white/10 bg-white/5 p-3 text-sm last:border-0 md:grid-cols-[1fr_1fr_2fr]">
                <div dir="ltr" className="text-left text-cyan-200">
                  {t.from}
                </div>
                <div dir="ltr" className="text-left text-emerald-300">
                  → {t.to}
                </div>
                <div className="text-slate-300">{t.type}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "design" && (
          <div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {flat.map(([k, v]) => (
                <Swatch key={k} name={k} value={v} />
              ))}
              <div className="col-span-2 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2">
                <div className="h-9 w-24 rounded-md" style={{ background: "linear-gradient(#F8FAFB,#E6F3F7)" }} />
                <div className="text-xs text-slate-300">شاشات المصادقة: تدرّج #F8FAFB → #E6F3F7</div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <b className="text-white">فئات المصاريف ({tokens.categories.length})</b>
                <div dir="ltr" className="mt-2 flex flex-wrap gap-1.5 text-left text-xs">
                  {tokens.categories.map((x) => (
                    <span key={x.id} className="rounded-full bg-black/40 px-2 py-1">
                      {x.name} · {x.ionicon}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <b className="text-white">العملات ({tokens.currencies.length})</b>
                <div dir="ltr" className="mt-2 flex max-h-40 flex-wrap gap-1.5 overflow-auto text-left text-xs">
                  {tokens.currencies.map((x) => (
                    <span key={x.code} className="rounded-full bg-black/40 px-2 py-1">
                      {x.flag} {x.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <pre dir="ltr" className="mt-4 overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-left text-xs leading-6 text-slate-300">
              {JSON.stringify({ typography: tokens.typography, shape: tokens.shape }, null, 2)}
            </pre>
          </div>
        )}
      </Section>

      <Section
        id="record"
        title="كيف تحصل على لقطات وفيديو حقيقية لكل تدفّق"
        sub="بما أن تشغيل التطبيق غير ممكن داخل هذه البيئة، جهّزت لك خطوات تُنتج فيديو MP4 بدقة الجهاز الأصلية + لقطة PNG لكل تدفّق (16 تدفّقًا) مع شريط حالة نظيف (9:41)."
      >
        <ol className="space-y-2 text-sm leading-7">
          {[
            "فعّل Developer options و USB debugging على هاتفك (أو افتح محاكي Android Studio بصورة Google Play).",
            "للنسخة الحديثة v2: ثبّتها من Google Play. للقديمة 1.0.4: شغّل ./1_install_xapk.sh say_com.moments.expenses_1.0.4.xapk",
            "شغّل ./2_record_flows.sh وانفّذ كل تدفّق بيدك (Enter للبدء/الإيقاف).",
            "لإخراج Frames للموشن: ffmpeg -i captured/xx.mp4 -vf fps=30 frames/xx_%04d.png",
          ].map((t, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-slate-900">
                {i + 1}
              </span>
              <span dir="auto">{t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-6 text-slate-500">
          المواد ملك مطوّر التطبيق (Roberto Joseph). استخدمها بعد الحصول على إذنه أو ضمن الاستخدام العادل.
        </p>
      </Section>
    </div>
  );
}
