// =============================================
// PETES TECHNOLOGIES - MAIN JAVASCRIPT
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initHamburgerMenu();
});

// =============================================
// INITIALIZE APPLICATION
// =============================================
function initializeApp() {
  // Hide loading screen after delay
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }, 2000);

  // Initialize animations
  initAnimations();

  // Initialize smooth scroll for navbar
  initSmoothScroll();
}

// =============================================
// SMOOTH SCROLL FOR NAVBAR
// =============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// =============================================
// STAT COUNTERS ANIMATION
// =============================================
function initStatCounters() {
  const counters = document.querySelectorAll(".counter-animate");

  counters.forEach((counter) => {
    // Reset counter
    counter.textContent = "0";

    const target = parseFloat(counter.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;

      if (current < target) {
        // Format number based on size
        if (target >= 1) {
          counter.textContent = Math.floor(current);
        } else {
          counter.textContent = current.toFixed(1);
        }
        requestAnimationFrame(updateCounter);
      } else {
        // Final value
        if (target >= 1) {
          counter.textContent = Math.floor(target);
        } else {
          counter.textContent = target.toFixed(1);
        }
      }
    };

    updateCounter();
  });
}

// =============================================
// ANIMATIONS
// =============================================
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Trigger stat counters when stats section is in view
        if (entry.target.classList.contains("stats-grid")) {
          initStatCounters();
        }
      }
    });
  }, observerOptions);

  // Observe all cards and stats section
  const cards = document.querySelectorAll(
    ".card, .stat-box, .product-card, .timeline-item, .stats-grid"
  );
  cards.forEach((card) => observer.observe(card));
}

// =============================================
// MOUSE PARALLAX EFFECT (Optional Enhancement)
// =============================================
function initParallax() {
  document.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

    const parallaxElements = document.querySelectorAll(".grid-bg");
    parallaxElements.forEach((el) => {
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Uncomment to enable parallax effect
// initParallax();

// =============================================
// ANALYTICS & TRACKING (Optional)// =============================================
// Track slide views (example)
/*
function trackSlideView(slideNumber) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'slide_view', {
      'slide_number': slideNumber,
      'slide_title': slides[slideNumber].querySelector('h1, h2')?.textContent || ''
    });
  }
}

// Call this in updateSlides function
// trackSlideView(currentSlide);
*/

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy load images
 */
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading if images use data-src
if (document.querySelectorAll("img[data-src]").length > 0) {
  lazyLoadImages();
}

// =============================================
// HAMBURGER MENU
// =============================================
function initHamburgerMenu() {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", toggleMenu);

  // Close menu when clicking links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      if (navMenu.classList.contains("active")) {
        toggleMenu();
      }
    }
  });

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
}

// =============================================
// ERROR HANDLING
// =============================================
window.addEventListener("error", (e) => {
  console.error("Application error:", e.error);
  // You can add custom error handling here
});

// =============================================
// CONSOLE WELCOME MESSAGE
// =============================================
console.log(
  "%cPETES TECHNOLOGIES",
  "font-size: 24px; font-weight: bold; color: #00b894;"
);
console.log(
  "%cBuilding Africa's Future Through Smart Technology",
  "font-size: 14px; color: #6c5ce7;"
);
console.log(
  "%c💚 Innovate • Empower • Localize",
  "font-size: 12px; color: #00b894;"
);
console.log("");
console.log("Interested in joining our team? Email: petes-tech@proton.me");

// =============================================
// SERVICE WORKER REGISTRATION (Optional - PWA)
// =============================================
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
*/
