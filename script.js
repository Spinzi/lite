(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ============ Icon set for social/contact links ============ */
  const SOCIAL_ICONS = {
    discord: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 5.4A17.5 17.5 0 0 0 15.9 4a12 12 0 0 0-.6 1.2 16.4 16.4 0 0 0-4.9 0A12 12 0 0 0 9.8 4a17.6 17.6 0 0 0-4.4 1.4C2.7 8.9 2 12.3 2.3 15.7a17.6 17.6 0 0 0 5.3 2.7c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.8-.9l.4-.3a12.6 12.6 0 0 0 10.4 0l.4.3c-.6.4-1.2.7-1.8.9.3.7.7 1.3 1.1 1.9a17.5 17.5 0 0 0 5.3-2.7c.4-3.9-.6-7.3-2.4-10.3zM9.7 13.6c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm4.6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z"/></svg>',
    twitter: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7.5 8.6L22 22h-6.6l-5.2-6.6L4 22H1l8-9.2L2 2h6.8l4.7 6z"/></svg>',
    instagram: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 8.1a2.5 2.5 0 0 0-1.8-1.8C18.3 6 12 6 12 6s-6.3 0-8 .3A2.5 2.5 0 0 0 2.2 8.1 26 26 0 0 0 2 12a26 26 0 0 0 .2 3.9 2.5 2.5 0 0 0 1.8 1.8C5.7 18 12 18 12 18s6.3 0 8-.3a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.2-3.9zM10 15V9l5.2 3z"/></svg>',
    tiktok: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.4 2 1.8 3.6 4 3.9v3a7 7 0 0 1-4-1.3v6.1a5.7 5.7 0 1 1-5.7-5.7c.2 0 .5 0 .7.1v3.1a2.6 2.6 0 1 0 1.9 2.5V3H16z"/></svg>',
    website: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"/></svg>',
    email: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  };

  /* ============ Render page content from SITE_CONFIG (config.js) ============ */
  function renderFromConfig() {
    if (typeof SITE_CONFIG === "undefined") return;
    const cfg = SITE_CONFIG;

    const setText = function (id, value) {
      const el = document.getElementById(id);
      if (el && value !== undefined) el.textContent = value;
    };
    const setHref = function (id, value) {
      const el = document.getElementById(id);
      if (el && value !== undefined) el.setAttribute("href", value);
    };

    /* Identity */
    if (cfg.site) {
      document.title = cfg.site.name + " — " + (cfg.hero ? cfg.hero.headlineLine2 : "");
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && cfg.site.metaDescription) metaDesc.setAttribute("content", cfg.site.metaDescription);
      setText("cfg-brand-name", cfg.site.name);
      setText("cfg-footer-brand-name", cfg.site.name);
      setText("cfg-footer-brand-name-2", cfg.site.name);
      setText("cfg-footer-tagline", cfg.site.tagline);
      setText("cfg-footer-year", cfg.site.year);
    }

    /* Nav CTA */
    if (cfg.navCta) {
      setText("cfg-nav-cta", cfg.navCta.label);
      setHref("cfg-nav-cta", cfg.navCta.href);
    }

    /* Hero */
    if (cfg.hero) {
      setText("cfg-hero-eyebrow", cfg.hero.eyebrow);
      setText("cfg-hero-line1", cfg.hero.headlineLine1);
      setText("cfg-hero-line2", cfg.hero.headlineLine2);
      setText("cfg-hero-subtext", cfg.hero.subtext);
      if (cfg.hero.primaryCta) {
        const primaryLabel = document.querySelector("#cfg-hero-cta-primary span");
        if (primaryLabel) primaryLabel.textContent = cfg.hero.primaryCta.label;
        setHref("cfg-hero-cta-primary", cfg.hero.primaryCta.href);
      }
      if (cfg.hero.secondaryCta) {
        setText("cfg-hero-cta-secondary", cfg.hero.secondaryCta.label);
        setHref("cfg-hero-cta-secondary", cfg.hero.secondaryCta.href);
      }
    }

    /* Pricing */
    const pricingList = document.getElementById("cfg-pricing-list");
    if (pricingList && Array.isArray(cfg.pricing)) {
      pricingList.innerHTML = cfg.pricing
        .map(function (plan) {
          const accent = plan.highlighted ? "coral" : "violet";
          const cardClasses = plan.highlighted
            ? "tilt-card reveal relative rounded-2xl border border-violet/50 bg-gradient-to-b from-surface to-surface2 p-8 flex flex-col shadow-[0_0_40px_-10px_rgba(139,124,255,0.35)] is-visible"
            : "tilt-card reveal rounded-2xl border border-border bg-surface p-8 flex flex-col hover:border-violet/40 transition-colors is-visible";
          const ctaClasses = plan.highlighted
            ? "ripple-btn relative overflow-hidden mt-8 inline-flex justify-center items-center rounded-full bg-violet py-3 font-semibold text-white hover:bg-violet/90 transition-colors"
            : "ripple-btn relative overflow-hidden mt-8 inline-flex justify-center items-center rounded-full border border-border py-3 font-semibold hover:border-violet/60 hover:bg-surface2 transition-colors";
          const badge = plan.badge
            ? '<span class="absolute -top-3 left-8 rounded-full bg-violet px-3 py-1 text-xs font-semibold text-white">' + plan.badge + "</span>"
            : "";
          const features = (plan.features || [])
            .map(function (f) {
              return (
                '<li class="flex items-start gap-2"><svg class="h-4 w-4 mt-0.5 text-' +
                accent +
                ' shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>' +
                f +
                "</li>"
              );
            })
            .join("");
          return (
            '<div class="' + cardClasses + '">' +
            badge +
            '<h3 class="font-display font-semibold text-lg">' + plan.name + "</h3>" +
            '<p class="text-sm text-muted mt-1">' + plan.description + "</p>" +
            '<div class="mt-6 flex items-baseline gap-1"><span class="font-display font-bold text-4xl">' +
            plan.price +
            '</span><span class="text-muted text-sm">' + plan.priceNote + "</span></div>" +
            '<ul class="mt-6 space-y-3 text-sm text-muted flex-1">' + features + "</ul>" +
            '<a href="' + plan.cta.href + '" class="' + ctaClasses + '">' + plan.cta.label + "</a>" +
            "</div>"
          );
        })
        .join("");
    }

    /* FAQ */
    const faqList = document.getElementById("faq-list");
    if (faqList && Array.isArray(cfg.faq)) {
      faqList.innerHTML = cfg.faq
        .map(function (item) {
          return (
            '<div class="faq-item py-2">' +
            '<button class="faq-trigger w-full flex items-center justify-between text-left py-5 font-display font-medium text-lg">' +
            item.question +
            '<svg class="faq-icon h-5 w-5 shrink-0 text-muted transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14"/></svg>' +
            "</button>" +
            '<div class="faq-panel overflow-hidden max-h-0 transition-all duration-300">' +
            '<p class="pb-5 text-sm text-muted leading-relaxed">' + item.answer + "</p>" +
            "</div></div>"
          );
        })
        .join("");
    }

    /* Testimonials */
    const testimonialsList = document.getElementById("cfg-testimonials-list");
    if (testimonialsList && Array.isArray(cfg.testimonials)) {
      const stars = new Array(5)
        .fill('<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>')
        .join("");
      testimonialsList.innerHTML = cfg.testimonials
        .map(function (t, i) {
          const accent = i % 2 === 0 ? "violet" : "coral";
          return (
            '<div class="tilt-card reveal is-visible rounded-2xl border border-border bg-surface p-7">' +
            '<div class="flex gap-1 text-coral mb-4" aria-hidden="true">' + stars + "</div>" +
            '<p class="text-sm text-muted leading-relaxed">"' + t.quote + '"</p>' +
            '<div class="mt-6 flex items-center gap-3">' +
            '<div class="h-9 w-9 rounded-full bg-' + accent + '/20 flex items-center justify-center font-display text-xs text-' + accent + '">' + t.initials + "</div>" +
            "<div><p class=\"text-sm font-medium\">" + t.name + '</p><p class="text-xs text-muted">' + t.role + "</p></div>" +
            "</div></div>"
          );
        })
        .join("");
    }

    /* Contact section copy */
    if (cfg.contact) {
      setText("cfg-contact-eyebrow", cfg.contact.eyebrow);
      setText("cfg-contact-heading", cfg.contact.heading);
      setText("cfg-contact-subtext", cfg.contact.subtext);
    }

    /* Social / contact links (main contact section) */
    const socialList = document.getElementById("cfg-social-list");
    if (socialList && Array.isArray(cfg.socialLinks)) {
      socialList.innerHTML = cfg.socialLinks
        .map(function (link) {
          const icon = SOCIAL_ICONS[link.type] || SOCIAL_ICONS.website;
          return (
            '<a href="' + link.href + '" target="_blank" rel="noopener" ' +
            'class="ripple-btn relative overflow-hidden inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold hover:border-violet/60 hover:bg-surface2 transition-colors">' +
            icon +
            "<span>" + link.label + "</span></a>"
          );
        })
        .join("");
    }

    /* Social icons (footer, compact) */
    const footerSocialList = document.getElementById("cfg-footer-social-list");
    if (footerSocialList && Array.isArray(cfg.socialLinks)) {
      footerSocialList.innerHTML = cfg.socialLinks
        .map(function (link) {
          const icon = SOCIAL_ICONS[link.type] || SOCIAL_ICONS.website;
          return (
            '<a href="' + link.href + '" target="_blank" rel="noopener" aria-label="' + link.label + '" class="hover:text-white transition-colors">' +
            icon +
            "</a>"
          );
        })
        .join("");
    }

    /* Footer credit */
    if (cfg.footer && cfg.footer.credit) {
      setText("cfg-footer-credit", cfg.footer.credit.name);
      setHref("cfg-footer-credit", cfg.footer.credit.href);
    }
  }

  renderFromConfig();

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

})();
