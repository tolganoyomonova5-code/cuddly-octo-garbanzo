// ====== SHU YERNI O’ZGARTIRING: butun sayt shu ma’lumotlardan yasaladi ======
const CONFIG = {
  name: "Cuddly Octo Garbanzo",
  icon: "🐙",
  badge: "v1.0 · Open source",
  tagline: "Qisqa va aniq tavsif: loyiha nima qiladi va u kimlar uchun. Bu matnni o‘zingizning loyihangizga moslab o‘zgartiring.",
  repo: "https://github.com/USERNAME/cuddly-octo-garbanzo",
  clone: "git clone https://github.com/USERNAME/cuddly-octo-garbanzo.git",
  license: "MIT",
  author: "USERNAME",
  stats: [
    {value: 128, suffix: "+", label: "Yulduzchalar"},
    {value: 24, suffix: "", label: "Hissa qo‘shuvchilar"},
    {value: 56, suffix: "", label: "Relizlar"},
    {value: 99, suffix: "%", label: "Testlar qamrovi"}
  ],
  features: [
    {icon: "⚡", title: "Tez", text: "Yengil va tezkor ishlaydi, ortiqcha bog‘liqliklarsiz."},
    {icon: "🧩", title: "Modulli", text: "Kerakli qismlarni ulang, keraksizini olib tashlang."},
    {icon: "🔒", title: "Xavfsiz", text: "Xavfsizlik birinchi o‘rinda, doimiy yangilanadi."},
    {icon: "📱", title: "Moslashuvchan", text: "Istalgan qurilma va muhitda bir xil ishlaydi."},
    {icon: "📚", title: "Hujjatlashtirilgan", text: "Aniq qo‘llanma va misollar bilan keladi."},
    {icon: "🤝", title: "Ochiq", text: "Hamjamiyat bilan birga rivojlanadi, PR’lar xush kelibsiz."}
  ],
  install: {
    "Git": "git clone https://github.com/USERNAME/cuddly-octo-garbanzo.git\ncd cuddly-octo-garbanzo",
    "npm": "npm install cuddly-octo-garbanzo\nnpm run start",
    "pip": "pip install cuddly-octo-garbanzo\npython -m cuddly_octo_garbanzo",
    "Docker": "docker pull USERNAME/cuddly-octo-garbanzo\ndocker run -p 3000:3000 USERNAME/cuddly-octo-garbanzo"
  },
  faq: [
    {q: "Bu loyiha nima uchun kerak?", a: "Bu yerga loyihangiz hal qiladigan muammo haqida yozing."},
    {q: "Uni qanday ishga tushiraman?", a: "Yuqoridagi O’rnatish bo‘limidagi buyruqlardan birini bajaring."},
    {q: "Hissa qo‘shsam bo‘ladimi?", a: "Albatta! Repozitoriyni fork qiling, o‘zgartirish kiriting va Pull Request yuboring."},
    {q: "Litsenziya qanday?", a: "Loyiha MIT litsenziyasi ostida tarqatiladi."}
  ]
};
// =============================================================================
const $ = s => document.querySelector(s);
document.title = CONFIG.name;
$("#logoIcon").textContent = CONFIG.icon;
$("#logoName").textContent = CONFIG.name;
$("#badge").textContent = CONFIG.badge;
$("#tagline").textContent = CONFIG.tagline;
$("#cloneCmd").textContent = CONFIG.clone;
["#ghLink","#ctaGh"].forEach(s => $(s).href = CONFIG.repo);
const words = CONFIG.name.split(" ");
$("#title").innerHTML = "";
const first = document.createTextNode(words.slice(0,-1).join(" ") + " ");
const last = document.createElement("span"); last.textContent = words.slice(-1)[0];
$("#title").append(first, last);
$("#foot").textContent = "© " + new Date().getFullYear() + " " + CONFIG.author + " · " + CONFIG.license + " litsenziyasi";

// Features
CONFIG.features.forEach(f => {
  const d = document.createElement("div"); d.className = "card reveal";
  d.innerHTML = '<div class="ic"></div><h3></h3><p></p>';
  d.children[0].textContent = f.icon; d.children[1].textContent = f.title; d.children[2].textContent = f.text;
  $("#featureGrid").appendChild(d);
});

// Stats with count-up
CONFIG.stats.forEach(s => {
  const d = document.createElement("div"); d.className = "stat reveal";
  d.innerHTML = '<b data-to="' + s.value + '" data-suf="' + s.suffix + '">0</b><span></span>';
  d.querySelector("span").textContent = s.label;
  $("#statsBox").appendChild(d);
});
function countUp(el){
  const to = +el.dataset.to, suf = el.dataset.suf, t0 = performance.now(), dur = 1200;
  (function step(t){
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

// Install tabs
const names = Object.keys(CONFIG.install);
names.forEach((n, i) => {
  const b = document.createElement("button");
  b.className = "tab"; b.role = "tab"; b.textContent = n;
  b.setAttribute("aria-selected", i === 0);
  b.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", t === b));
    $("#tabCode").textContent = CONFIG.install[n];
  };
  $("#tabs").appendChild(b);
});
$("#tabCode").textContent = CONFIG.install[names[0]];

// FAQ
CONFIG.faq.forEach(f => {
  const d = document.createElement("details"); d.className = "reveal";
  d.innerHTML = "<summary></summary><p></p>";
  d.children[0].textContent = f.q; d.children[1].textContent = f.a;
  $("#faqBox").appendChild(d);
});

// Copy buttons
document.querySelectorAll(".copy").forEach(btn => btn.onclick = async () => {
  const text = $(btn.dataset.copy).textContent;
  try { await navigator.clipboard.writeText(text); btn.textContent = "Nusxalandi ✓"; }
  catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
    ta.select(); try { document.execCommand("copy"); btn.textContent = "Nusxalandi ✓"; } catch (e2) { btn.textContent = "Xato"; }
    ta.remove();
  }
  setTimeout(() => btn.textContent = "Nusxa", 1600);
});

// Theme toggle (remembered when storage is available)
const root = document.documentElement;
try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
$("#themeBtn").onclick = () => {
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
};

// Scroll reveal
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in");
  const b = en.target.querySelector("b[data-to]"); if (b) countUp(b);
  io.unobserve(en.target);
}), {threshold: .15});
document.querySelectorAll(".reveal").forEach(el => io.observe(el));