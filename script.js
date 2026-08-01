(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ Theme toggle ============ */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");

  function applyTheme(theme) {
    if (theme === "light") {
      root.classList.add("light");
      iconSun.classList.remove("hidden");
      iconMoon.classList.add("hidden");
    } else {
      root.classList.remove("light");
      iconSun.classList.add("hidden");
      iconMoon.classList.remove("hidden");
    }
  }

  const savedTheme = localStorage.getItem("dalibu-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const isLight = root.classList.contains("light");
    const newTheme = isLight ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("dalibu-theme", newTheme);
  });

  /* ============ Mobile menu ============ */
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });

  /* ============ Scroll reveal ============ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ============ Cursor glow ============ */
  const glow = document.getElementById("cursor-glow");
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", function (e) {
      glow.style.setProperty("--x", e.clientX + "px");
      glow.style.setProperty("--y", e.clientY + "px");
      glow.style.opacity = "1";
    });
    document.addEventListener("mouseleave", function () {
      glow.style.opacity = "0";
    });
  }

  /* ============ Tilt effect on cards ============ */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / rect.height) * -6;
        const rotateY = ((x - rect.width / 2) / rect.width) * 6;
        card.style.transform =
          "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-2px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
      });
    });
  }

  /* ============ Ripple buttons ============ */
  document.querySelectorAll(".ripple-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      if (prefersReducedMotion) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(function () {
        ripple.remove();
      }, 650);
    });
  });

  /* ============ FAQ accordion ============ */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");

    trigger.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-panel").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        panel.style.maxHeight = null;
      } else {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ============ Contact form (placeholder submit) ============ */
  const form = document.getElementById("contact-form");
  const formNote = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      formNote.textContent = "This is a placeholder form — connect it to your own backend or email service to receive messages.";
    });
  }
})();
