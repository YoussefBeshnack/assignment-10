/*
  TODO:
  - [✅] Navbar: Update active link on scroll
  - [✅] Navbar: Toggle Mobile Menu
  - [✅] Theme Switch: Toggle dark class on `<html>` tag
  - [✅] Portfolio: Custom JS Navs & Tabs (No Bootstrap)
  - [✅] Testimonials: Custom JS Carousel
  - [✅] Sidebar: Gear icon toggles color & font options
  - [✅] Scroll-to-Top: Button to return to top on click
  - [✅] Optimize all functions
*/

// Helper Functions
var $ = function (id) {
  return document.getElementById(id);
};

// Navbar: Update active link on scroll
// [✅] Optimized
var section = document.querySelectorAll("section");
var links = document.querySelectorAll(".nav-links a");

var linkCache = {};
links.forEach((link) => {
  var href = link.getAttribute("href");
  var id = href.substring(1);
  linkCache[id] = link;
});

window.addEventListener("scroll", function () {
  var top = window.scrollY;

  section.forEach((sec) => {
    var offset = sec.offsetTop - 150;
    var height = sec.offsetHeight;
    var id = sec.getAttribute("id");

    var isInStartRange = top >= offset;
    var isInEndRange = top < offset + height;

    if (isInStartRange && isInEndRange) {
      var activeLink = linkCache[id];

      if (activeLink && !activeLink.classList.contains("active")) {
        links.forEach((link) => link.classList.remove("active"));
        activeLink.classList.add("active");
      }
    }
  });
});

// Portfolio: Custom JS Navs & Tabs (No Bootstrap)
// [✅] Optimized
var toggleMenu = $("mobile-menu-btn");
var linksMenu = document.querySelector(".nav-links");

toggleMenu.addEventListener("click", function () {
  linksMenu.classList.toggle("active");
});

// Theme Switch: Toggle dark class on `<html>` tag
// [✅] Optimized
var html = document.documentElement;
var toggleTheme = $("theme-toggle-button");

toggleTheme.addEventListener("click", function () {
  html.classList.toggle("dark");
});

// Portfolio: Custom JS Navs & Tabs (No Bootstrap)
// [✅] Optimized
var portfolio = {
  tabs: document.querySelectorAll(".portfolio-filter"),
  projects: document.querySelectorAll("#portfolio-grid > div"),
};

portfolio.tabs.forEach((clickedTab) => {
  clickedTab.addEventListener("click", () => {
    if (clickedTab.classList.contains("active")) return;
    const filterValue = clickedTab.getAttribute("data-filter");

    portfolio.tabs.forEach((tab) => {
      const isActive = tab === clickedTab;

      tab.classList.toggle("active", isActive);

      tab.classList.toggle("bg-linear-to-r", isActive);
      tab.classList.toggle("from-primary", isActive);
      tab.classList.toggle("to-secondary", isActive);
      tab.classList.toggle("text-white", isActive);
      tab.classList.toggle("shadow-lg", isActive);
      tab.classList.toggle("shadow-primary/50", isActive);

      tab.classList.toggle("bg-white", !isActive);
      tab.classList.toggle("dark:bg-slate-800", !isActive);
      tab.classList.toggle("text-slate-600", !isActive);
      tab.classList.toggle("dark:text-slate-300", !isActive);
      tab.classList.toggle("border", !isActive);
      tab.classList.toggle("border-slate-300", !isActive);
      tab.classList.toggle("dark:border-slate-700", !isActive);
    });

    portfolio.projects.forEach((item) => {
      const itemCategory = item.getAttribute("data-category");
      const shouldShow = filterValue === "all" || filterValue === itemCategory;

      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

// Testimonials: Custom JS Carousel
// [✅] Optimized
const carousel = {
  el: document.getElementById("testimonials-carousel"),
  prevBtn: document.getElementById("prev-testimonial"),
  nextBtn: document.getElementById("next-testimonial"),
  indicators: document.querySelectorAll(".carousel-indicator"),

  length: 4,
  currentIndex: 0,
  visibleSlides: 3,

  updateCarousel: function () {
    const visibleSlides = 3;
    const percentage = this.currentIndex * (100 / visibleSlides);
    this.el.style.transform = `translate3d(${percentage}%, 0, 0)`; // (Using translate3d for GPU acceleration) <--- this is new... didn't know that

    this.indicators.forEach((indicator, idx) => {
      const isActive = idx === this.currentIndex;

      indicator.classList.toggle("active", isActive);
      indicator.classList.toggle("scale-125", isActive);
      indicator.classList.toggle("bg-accent", isActive);

      indicator.classList.toggle("bg-slate-400", !isActive);
      indicator.classList.toggle("dark:bg-slate-600", !isActive);
    });
  },

  navigate: function (direction) {
    this.currentIndex =
      (this.currentIndex + direction + this.length) % this.length;
    this.updateCarousel();
  },
};

carousel.prevBtn?.addEventListener("click", () => carousel.navigate(-1));
carousel.nextBtn?.addEventListener("click", () => carousel.navigate(1));

carousel.indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    const index = parseInt(indicator.getAttribute("data-index"));
    if (!isNaN(index)) {
      carousel.currentIndex = index;
      carousel.updateCarousel();
    }
  });
});

// Sidebar: Gear icon toggles color & font options
// [✅] Optimized
var settings = {
  toggleButton: $("settings-toggle"),
  sidebar: $("settings-sidebar"),
  closeButton: $("close-settings"),
  isOpen: false,

  fonts: {
    alexandria: $("alexandria"),
    tajawal: $("tajawal"),
    cairo: $("cairo"),

    clearFonts: function () {
      settings.body.classList.remove(
        "font-alexandria",
        "font-tajawal",
        "font-cairo",
      );
    },

    addFont: function (fontName) {
      settings.body.classList.add(`font-${fontName}`);
    },
  },
  colors: document.querySelectorAll("#theme-colors-grid [data-primary]"),
  setCssVar(name, value) {
    this.html.style.setProperty(`--${name}`, value);
  },

  activeRingClasses: [
    "ring-2",
    "ring-primary",
    "ring-offset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  ],

  reset: {
    button: $("reset-settings"),
    defaultFont: "tajawal",
    defaultColor: {
      primary: "#6366f1",
      secondary: "#8b5cf6",
    },
  },

  html: document.documentElement,
  body: document.querySelector("body"),

  closeMenu() {
    this.isOpen = false;
    this.toggleButton.style.right = "0px";
    this.sidebar.classList.add("translate-x-full");
  },
};

settings.toggleButton.addEventListener("click", () => {
  settings.isOpen = !settings.isOpen;
  settings.toggleButton.style.right = settings.isOpen ? "20rem" : "0px";
  settings.sidebar.classList.toggle("translate-x-full", !settings.isOpen);
});

settings.closeButton.addEventListener("click", () => {
  settings.closeMenu();
});

document.addEventListener("click", (e) => {
  if (settings.isOpen) {
    if (
      !settings.sidebar.contains(e.target) &&
      !settings.toggleButton.contains(e.target)
    ) {
      settings.closeMenu();
    }
  }
});

settings.fonts.alexandria.addEventListener("click", function () {
  settings.fonts.clearFonts();
  settings.fonts.addFont(this.id);
});

settings.fonts.tajawal.addEventListener("click", function () {
  settings.fonts.clearFonts();
  settings.fonts.addFont(this.id);
});

settings.fonts.cairo.addEventListener("click", function () {
  settings.fonts.clearFonts();
  settings.fonts.addFont(this.id);
});

// Reset Settings Button
settings.reset.button.addEventListener("click", function () {
  settings.fonts.clearFonts();
  settings.fonts.addFont(settings.reset.defaultFont);

  settings.setCssVar("color-primary", settings.reset.defaultColor.primary);
  settings.setCssVar("color-secondary", settings.reset.defaultColor.secondary);

  settings.colors.forEach((btn) =>
    btn.classList.remove(...settings.activeRingClasses),
  );

  const defaultSwatch = Array.from(settings.colors).find(
    (btn) =>
      btn.getAttribute("data-primary") === settings.reset.defaultColor.primary,
  );
  if (defaultSwatch) {
    defaultSwatch.classList.add(...settings.activeRingClasses);
  }
});

// Colors
settings.colors.forEach((element) => {
  element.addEventListener("click", function () {
    settings.setCssVar("color-primary", element.getAttribute("data-primary"));
    settings.setCssVar(
      "color-secondary",
      element.getAttribute("data-secondary"),
    );

    settings.colors.forEach((btn) =>
      btn.classList.remove(...settings.activeRingClasses),
    );

    element.classList.add(...settings.activeRingClasses);
  });
});

// Scroll-to-Top: Button to return to top on click
// [❌] Optimized, i can optimize it but i will have to use debounce (technically we still didnt learn about setTimeout)
const scrollToTopBtn = $("scroll-to-top");

window.addEventListener("scroll", () => {
  const isPastThreshold = window.scrollY > 300;

  scrollToTopBtn.classList.toggle("opacity-100", isPastThreshold);
  scrollToTopBtn.classList.toggle("visible", isPastThreshold);

  scrollToTopBtn.classList.toggle("opacity-0", !isPastThreshold);
  scrollToTopBtn.classList.toggle("invisible", !isPastThreshold);
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
