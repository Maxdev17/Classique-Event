// ================================
//   CLASSIQUE EVENT PLACE
//   VagabondCode | Maxwell Idowu
// ================================

// --- STEP 1: LENIS INIT ---
const lenis = new Lenis({
  duration: 1.3,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  smoothWheel: true,
});

// --- STEP 2: GSAP REGISTER (must be before any ScrollTrigger use) ---
gsap.registerPlugin(ScrollTrigger);

// --- STEP 3: SYNC LENIS + GSAP CORRECTLY ---
// Lenis drives its own RAF loop
lenis.on("scroll", () => ScrollTrigger.update());
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// --- CUSTOM CURSOR ---
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

if (cursor && follower) {
  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" });
  });

  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  })();

  document
    .querySelectorAll(
      "a, button, .hall-card, .gallery-item, .testimonial-card, .package-card, .filter-btn",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("expand");
        follower.classList.add("expand");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("expand");
        follower.classList.remove("expand");
      });
    });
}

// --- NAVBAR ---
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// --- MOBILE NAV ---
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
    document.body.style.overflow = mobileNav.classList.contains("open")
      ? "hidden"
      : "";
  });
}

function closeMobileNav() {
  if (hamburger) hamburger.classList.remove("open");
  if (mobileNav) mobileNav.classList.remove("open");
  document.body.style.overflow = "";
}

// --- ACTIVE NAV LINK ---
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.classList.toggle("active", link.getAttribute("href") === currentPage);
});

// ================================
//   HERO ANIMATIONS (page load)
//   No ScrollTrigger needed here
// ================================
const heroEyebrow = document.getElementById("heroEyebrow");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const heroActions = document.getElementById("heroActions");
const heroStats = document.getElementById("heroStats");
const heroBgImg = document.getElementById("heroBgImg");

if (heroTitle) {
  // Set initial states
  gsap.set([heroEyebrow, heroTitle, heroDesc, heroActions, heroStats], {
    opacity: 0,
    y: 40,
  });

  // Animate in sequence
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .to(heroEyebrow, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
    .to(
      heroTitle,
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      "-=0.5",
    )
    .to(
      heroDesc,
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6",
    )
    .to(
      heroActions,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5",
    )
    .to(
      heroStats,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.4",
    );
}

if (heroBgImg) {
  gsap.to(heroBgImg, { scale: 1.07, duration: 14, ease: "none" });
}

// ================================
//   SCROLL ANIMATIONS
//   Using onEnter callbacks only
//   — no toggleActions, no reversal
// ================================

function animateOnEnter(selector, vars, triggerEl) {
  const els = gsap.utils.toArray(selector);
  if (!els.length) return;

  els.forEach((el, i) => {
    // Set initial state via GSAP — not CSS
    gsap.set(el, {
      opacity: 0,
      y: vars.y ?? 0,
      x: vars.x ?? 0,
      scale: vars.scale ?? 1,
    });

    ScrollTrigger.create({
      trigger: triggerEl || el,
      start: "top 88%",
      once: true, // fires once, never reverses
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: vars.duration || 0.9,
          ease: vars.ease || "power3.out",
          delay: (vars.stagger || 0) * i,
        });
      },
    });
  });
}

// Halls header
const hallsHeader = document.getElementById("hallsHeader");
if (hallsHeader) {
  gsap.set(hallsHeader, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: hallsHeader,
    start: "top 88%",
    once: true,
    onEnter: () =>
      gsap.to(hallsHeader, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }),
  });
}

// Hall cards
const hallCard1 = document.getElementById("hallCard1");
const hallCard2 = document.getElementById("hallCard2");

if (hallCard1) {
  gsap.set(hallCard1, { opacity: 0, x: -50 });
  ScrollTrigger.create({
    trigger: hallCard1,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(hallCard1, {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: "power3.out",
      }),
  });
}

if (hallCard2) {
  gsap.set(hallCard2, { opacity: 0, x: 50 });
  ScrollTrigger.create({
    trigger: hallCard2,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(hallCard2, {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.15,
      }),
  });
}

// About section
const aboutImgWrap = document.getElementById("aboutImgWrap");
const aboutContent = document.getElementById("aboutContent");

if (aboutImgWrap) {
  gsap.set(aboutImgWrap, { opacity: 0, x: -60 });
  ScrollTrigger.create({
    trigger: aboutImgWrap,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(aboutImgWrap, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
      }),
  });
}

if (aboutContent) {
  gsap.set(aboutContent, { opacity: 0, x: 60 });
  ScrollTrigger.create({
    trigger: aboutContent,
    start: "top 85%",
    once: true,
    onEnter: () =>
      gsap.to(aboutContent, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: "power3.out",
      }),
  });
}

// About points stagger
const aboutPoints = gsap.utils.toArray(".about-point");
if (aboutPoints.length) {
  gsap.set(aboutPoints, { opacity: 0, y: 30 });
  ScrollTrigger.create({
    trigger: ".about-points",
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.to(aboutPoints, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });
    },
  });
}

// Gallery preview
const galleryPreviewHeader = document.getElementById("galleryPreviewHeader");
if (galleryPreviewHeader) {
  gsap.set(galleryPreviewHeader, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: galleryPreviewHeader,
    start: "top 88%",
    once: true,
    onEnter: () =>
      gsap.to(galleryPreviewHeader, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }),
  });
}

const galleryPreviewItems = gsap.utils.toArray(".gallery-item");
if (galleryPreviewItems.length) {
  gsap.set(galleryPreviewItems, { opacity: 0, scale: 0.92 });
  ScrollTrigger.create({
    trigger: galleryPreviewItems[0],
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap.to(galleryPreviewItems, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
      });
    },
  });
}

// Testimonials
const testimonialsHeader = document.getElementById("testimonialsHeader");
if (testimonialsHeader) {
  gsap.set(testimonialsHeader, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: testimonialsHeader,
    start: "top 88%",
    once: true,
    onEnter: () =>
      gsap.to(testimonialsHeader, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }),
  });
}

const testimonialCards = gsap.utils.toArray(".testimonial-card");
if (testimonialCards.length) {
  gsap.set(testimonialCards, { opacity: 0, y: 50 });
  ScrollTrigger.create({
    trigger: ".testimonials-grid",
    start: "top 82%",
    once: true,
    onEnter: () => {
      gsap.to(testimonialCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
  });
}

// CTA
const ctaContent = document.getElementById("ctaContent");
if (ctaContent) {
  gsap.set(ctaContent, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: ctaContent,
    start: "top 88%",
    once: true,
    onEnter: () =>
      gsap.to(ctaContent, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }),
  });
}

// Gold lines
gsap.utils.toArray(".gold-line").forEach((line) => {
  gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
  ScrollTrigger.create({
    trigger: line,
    start: "top 90%",
    once: true,
    onEnter: () =>
      gsap.to(line, { scaleX: 1, duration: 0.8, ease: "power3.out" }),
  });
});

// About image parallax
const aboutImgMain = document.querySelector(".about-img-main");
if (aboutImgMain) {
  gsap.to(aboutImgMain, {
    y: -40,
    ease: "none",
    scrollTrigger: {
      trigger: ".about-img-wrap",
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
    },
  });
}

// Hall card image hover
document.querySelectorAll(".hall-card").forEach((card) => {
  const img = card.querySelector("img");
  if (!img) return;
  card.addEventListener("mouseenter", () =>
    gsap.to(img, { scale: 1.06, duration: 0.7, ease: "power2.out" }),
  );
  card.addEventListener("mouseleave", () =>
    gsap.to(img, { scale: 1, duration: 0.7, ease: "power2.out" }),
  );
});

// Package cards (packages page)
const packageCards = gsap.utils.toArray(".package-card");
if (packageCards.length) {
  gsap.set(packageCards, { opacity: 0, y: 50 });
  ScrollTrigger.create({
    trigger: ".packages-grid",
    start: "top 82%",
    once: true,
    onEnter: () => {
      gsap.to(packageCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.14,
      });
    },
  });
}

// ================================
//   GALLERY PAGE
// ================================
const galleryGrid = document.querySelector(".gallery-grid");

if (galleryGrid) {
  const allItems = document.querySelectorAll(".gallery-item");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Entrance animation
  gsap.set(allItems, { opacity: 0, y: 36, scale: 0.95 });
  ScrollTrigger.create({
    trigger: galleryGrid,
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap.to(allItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
      });
    },
  });

  // Filter
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      allItems.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        if (match) {
          item.style.display = "block";
          gsap.to(item, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          });
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.92,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              item.style.display = "none";
            },
          });
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxCounter = document.getElementById("lightboxCounter");

  let currentIndex = 0;
  const images = [...allItems].map((item) => ({
    src: item.querySelector("img").src,
  }));

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    if (lightboxCounter)
      lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lenis.stop();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    lenis.start();
  }

  allItems.forEach((item, i) =>
    item.addEventListener("click", () => openLightbox(i)),
  );
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      gsap.fromTo(
        lightboxImg,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3 },
      );
      lightboxImg.src = images[currentIndex].src;
      if (lightboxCounter)
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      gsap.fromTo(
        lightboxImg,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3 },
      );
      lightboxImg.src = images[currentIndex].src;
      if (lightboxCounter)
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox?.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxPrev?.click();
    if (e.key === "ArrowRight") lightboxNext?.click();
  });
}

// ================================
//   CONTACT FORM
// ================================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const eventType = document.getElementById("eventType")?.value;
    const eventDate = document.getElementById("eventDate")?.value;
    const guests = document.getElementById("guests")?.value;
    const message = document.getElementById("message")?.value.trim();

    if (!name || !phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    const dateText = eventDate ? `%0AEvent Date: ${eventDate}` : "";
    const guestsText = guests ? `%0AExpected Guests: ${guests}` : "";
    const waMsg = `Hello Classique Event Place 🥂%0A%0AMy name is *${name}*%0APhone: ${phone}%0AEvent Type: ${eventType}${dateText}${guestsText}%0A%0A${message || "I would like to enquire about hall availability."}`;
    window.open(`https://wa.me/2348183196423?text=${waMsg}`, "_blank");
  });
}

// ================================
//   REFRESH AFTER LOAD
// ================================
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
