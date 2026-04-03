/* ================================
   Cadde Hot Dog & Burger — script.js
   ================================ */

/* AOS (scroll animasyonları) */
if (window.AOS) {
  AOS.init({
    offset: 80,
    duration: 700,
    easing: "ease-out-cubic",
    once: true
  });
}

/* Yıl */
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

/* Mobil menü */
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {
  hamburger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Menüdeki linke tıklanınca kapat
  menu.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });

  // Dışarı tıklanınca kapat
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

/* Dahili linklere smooth scroll (eski tarayıcılar için) */
document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });
});

/* Ürün kaydırıcı (slider) */
const track = document.getElementById("productTrack");
const btnPrev = document.querySelector(".slider-btn.prev");
const btnNext = document.querySelector(".slider-btn.next");

if (track && btnPrev && btnNext) {
  const getStep = () => {
    // Kart genişliği + gap kadar ilerlet
    const card = track.querySelector(".card");
    const styles = card ? getComputedStyle(track) : null;
    const gap = styles ? parseInt(styles.gap || "16", 10) : 16;
    return card ? card.getBoundingClientRect().width + gap : 300;
  };

  const scrollLeftBy = (dir = -1) =>
    track.scrollBy({ left: dir * getStep(), behavior: "smooth" });

  btnPrev.addEventListener("click", () => scrollLeftBy(-1));
  btnNext.addEventListener("click", () => scrollLeftBy(1));

  // Oklar için durum güncelleme 
  const updateArrows = () => {
    const max = track.scrollWidth - track.clientWidth - 2; // tolerans
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft >= max;
    btnPrev.disabled = atStart;
    btnNext.disabled = atEnd;
  };
  track.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // SADECE MOUSE: Bilgisayarda sürükle / kaydırma için (Mobilde dokunmatik native kayar)
  let isDown = false, startX = 0, startScroll = 0;
  const onDown = (clientX) => {
    isDown = true;
    startX = clientX;
    startScroll = track.scrollLeft;
    track.classList.add("grabbing");
  };
  const onMove = (clientX) => {
    if (!isDown) return;
    const dx = clientX - startX;
    track.scrollLeft = startScroll - dx;
  };
  const onUp = () => {
    isDown = false;
    track.classList.remove("grabbing");
  };

  track.addEventListener("mousedown", (e) => onDown(e.clientX));
  track.addEventListener("mousemove", (e) => onMove(e.clientX));
  document.addEventListener("mouseup", onUp);

  // Klavye ile gezinme (odağa alınmışken sol/sağ)
  track.setAttribute("tabindex", "0");
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollLeftBy(-1); }
    if (e.key === "ArrowRight") { e.preventDefault(); scrollLeftBy(1); }
  });
}

/* Hero video — iOS için küçük iyileştirme */
const heroVideo = document.querySelector(".hero-video");
if (heroVideo) {
  // Sayfa görünmezken akışı durdurup görünürken devam ettir (pil dostu)
  const onVis = () => {
    if (document.hidden) {
      heroVideo.pause();
    } else {
      const playPromise = heroVideo.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {/* autoplay engeli varsa sessiz + muted zaten */});
      }
    }
  };
  document.addEventListener("visibilitychange", onVis);
  // Başlangıçta güvene al
  onVis();
}

/* CTA butonlarına yumuşak giriş (küçük hoşluk) */
window.addEventListener("load", () => {
  document.querySelectorAll(".hero-cta .btn").forEach((btn, i) => {
    btn.style.opacity = "0";
    btn.style.transform = `translateY(${10 + i * 6}px)`;
    setTimeout(() => {
      btn.style.transition = "600ms cubic-bezier(.2,.8,.2,1)";
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    }, 220 + i * 120);
  });
});

/* --- ÜRÜN KATEGORİ FİLTRELEME SİSTEMİ --- */
const filterBtns = document.querySelectorAll('.cat-btn');
const productCards = document.querySelectorAll('.product-track .card');
const productTrack = document.getElementById("productTrack");

if (filterBtns.length > 0 && productCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // Varsayılan tıklama davranışını güvene al

      // 1. Önceki aktif butonun rengini sıfırla
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      
      // 2. Tıklanan butonu aktif (renkli) yap
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      // 3. Kartları eşleştir ve filtrele
      productCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // 4. Farklı kategoriye geçince kaydırma çubuğunu en başa al
      if (productTrack) {
        productTrack.scrollLeft = 0;
      }
    });
  });
}
