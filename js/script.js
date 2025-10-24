// =============================================
// PETES TECHNOLOGIES - MAIN JAVASCRIPT
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initHamburgerMenu();
  initCookieBanner();
  initContactForm();
  initNewsletterForm();
  initBackToTop();
  initScrollEffects();
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
// COOKIE CONSENT BANNER
// =============================================
function initCookieBanner() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("cookieAccept");
  const rejectBtn = document.getElementById("cookieReject");

  // Check if user has already made a choice
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  }

  // Accept cookies
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    cookieBanner.classList.remove("show");
    console.log("Cookies accepted");
    // Initialize analytics here if needed
  });

  // Reject cookies
  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    cookieBanner.classList.remove("show");
    console.log("Cookies rejected");
  });
}

// =============================================
// CONTACT FORM HANDLING
// =============================================
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Basic validation
      if (!formData.name || !formData.email || !formData.message) {
        showNotification("Please fill in all required fields", "error");
        return;
      }

      // Email validation
      if (!isValidEmail(formData.email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate form submission (replace with actual API call)
      console.log("Form submitted:", formData);
      
      // For now, create mailto link
      const mailtoLink = `mailto:petes-tech@proton.me?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      // Show success message
      showNotification("Thank you! Your message has been sent.", "success");

      // Reset form
      contactForm.reset();
    });
  }
}

// =============================================
// NEWSLETTER FORM HANDLING
// =============================================
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      // Email validation
      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate newsletter subscription (replace with actual API call)
      console.log("Newsletter subscription:", email);

      // Show success message
      showNotification(
        "Successfully subscribed! Check your email for confirmation.",
        "success"
      );

      // Reset form
      newsletterForm.reset();
    });
  }
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// =============================================
// SCROLL EFFECTS
// =============================================
function initScrollEffects() {
  // Add active class to nav links on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav);

  // Parallax effect for hero sections (optional)
  const heroSections = document.querySelectorAll(".hero");
  
  window.addEventListener("scroll", () => {
    heroSections.forEach((hero) => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
  });
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================
function showNotification(message, type = "info") {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles dynamically
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: ${type === "success" ? "#00b894" : type === "error" ? "#e74c3c" : "#3498db"};
    color: white;
    padding: 18px 25px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
  `;

  document.body.appendChild(notification);

  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "check-circle";
    case "error":
      return "exclamation-circle";
    default:
      return "info-circle";
  }
}

// =============================================
// EMAIL VALIDATION
// =============================================
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =============================================
// ENHANCED STAT COUNTER WITH INTERSECTION OBSERVER
// =============================================
function initEnhancedStatCounters() {
  const statsSection = document.querySelector(".stats-grid");
  
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initStatCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);
}

// Call enhanced stat counters
initEnhancedStatCounters();

// =============================================
// SMOOTH SCROLL WITH OFFSET FOR FIXED HEADER
// =============================================
function smoothScrollWithOffset() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      
      if (targetId === "#") return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navMenu = document.querySelector("#nav-menu");
        const hamburger = document.querySelector("#hamburger");
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      }
    });
  });
}

// Initialize smooth scroll
smoothScrollWithOffset();

// =============================================
// FORM INPUT ANIMATIONS
// =============================================
function initFormAnimations() {
  const formInputs = document.querySelectorAll(
    'input[type="text"], input[type="email"], textarea, select'
  );

  formInputs.forEach((input) => {
    // Add focus effect
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    // Remove focus effect
    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });

    // Initialize if already has value
    if (input.value) {
      input.parentElement.classList.add("focused");
    }
  });
}

// Initialize form animations
initFormAnimations();

// =============================================
// LAZY LOAD ENHANCED
// =============================================
function initLazyLoadEnhanced() {
  const images = document.querySelectorAll("img[data-src]");
  const config = {
    rootMargin: "50px 0px",
    threshold: 0.01,
  };

  let observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        self.unobserve(img);
      }
    });
  }, config);

  images.forEach((image) => {
    observer.observe(image);
  });
}

// Initialize enhanced lazy loading
initLazyLoadEnhanced();

// =============================================
// DYNAMIC YEAR IN FOOTER
// =============================================
function updateCopyrightYear() {
  const currentYear = new Date().getFullYear();
  const copyrightElements = document.querySelectorAll(".footer-bottom p");
  
  copyrightElements.forEach((element) => {
    if (element.textContent.includes("2025")) {
      element.textContent = element.textContent.replace("2025", currentYear);
    }
  });
}

updateCopyrightYear();

// =============================================
// PERFORMANCE MONITORING
// =============================================
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }, 0);
  });
}

// =============================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// =============================================
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .nav-link.active {
    background: rgba(0, 184, 148, 0.2);
    color: var(--color-primary);
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1rem;
  }

  .notification-content i {
    font-size: 1.5rem;
  }
`;
document.head.appendChild(animationStyles);

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

// =============================================
// ACCESSIBILITY ENHANCEMENTS
// =============================================
// Add keyboard navigation for modals and interactive elements
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    const navMenu = document.querySelector("#nav-menu");
    const hamburger = document.querySelector("#hamburger");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  }
});
