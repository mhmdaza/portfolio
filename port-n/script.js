// Formspree handler
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Mengirim...";
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        formMsg.style.display = "block";
        formMsg.style.background = "rgba(0,255,179,0.08)";
        formMsg.style.border = "1px solid rgba(0,255,179,0.3)";
        formMsg.style.color = "var(--neon)";
        formMsg.textContent =
          "\u2713 Pesan berhasil terkirim! Akan segera dibalas.";
        form.reset();
        btn.textContent = "Kirim Pesan \u2192";
        btn.disabled = false;
      } else {
        throw new Error();
      }
    } catch {
      formMsg.style.display = "block";
      formMsg.style.background = "rgba(255,0,110,0.08)";
      formMsg.style.border = "1px solid rgba(255,0,110,0.3)";
      formMsg.style.color = "var(--neon3)";
      formMsg.textContent =
        "\u2715 Gagal mengirim. Coba lagi atau hubungi via email.";
      btn.textContent = "Kirim Pesan \u2192";
      btn.disabled = false;
    }
  });
}

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + "px";
  cursor.style.top = my - 5 + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + "px";
  ring.style.top = ry - 18 + "px";
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll("a,button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2.5)";
    ring.style.transform = "scale(1.5)";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    ring.style.transform = "scale(1)";
  });
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
// Close nav on link click
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("visible"), i * 100);
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 }
);
reveals.forEach((el) => obs.observe(el));
