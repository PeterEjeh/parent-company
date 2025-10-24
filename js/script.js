// =============================================
// PETES TECHNOLOGIES - MAIN JAVASCRIPT
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initHamburgerMenu();
  initContactForm();
  initNewsletterForm();
  initCookieConsent();
  initBackToTop();
  initDropdownMenus();
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
// PERFORMANCE OPTIMIZATIONS
// =============================================

// Preload critical resources
function preloadCriticalResources() {
  const criticalResources = [
    'css/styles.css',
    'assets/images/beta_life.png',
    'assets/images/founder.png'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.endsWith('.css') ? 'style' : 'image';
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Defer non-critical JavaScript
function deferNonCriticalJS() {
  // Defer analytics and tracking scripts
  setTimeout(() => {
    // Google Analytics (example)
    if (typeof gtag === 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);
    }
  }, 3000);
}

// Optimize images with intersection observer
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Add fade-in animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Debounce scroll events for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
  // Back to top button visibility
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }
  
  // Navbar background on scroll
  const header = document.querySelector('.header');
  if (header) {
    if (window.pageYOffset > 50) {
      header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
  }
}, 10);

// Replace existing scroll event listener
window.removeEventListener('scroll', function() {}); // Remove any existing
window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
  preloadCriticalResources();
  optimizeImages();
  deferNonCriticalJS();
});

// Service Worker for caching (Progressive Web App features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered successfully');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed');
      });
  });
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
// CONTACT FORM
// =============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showNotification('Thank you! Your message has been sent successfully.', 'success');
      contactForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

// =============================================
// NEWSLETTER FORM
// =============================================
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    const privacy = newsletterForm.querySelector('input[type="checkbox"]').checked;
    
    if (!email) {
      showNotification('Please enter your email address.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    if (!privacy) {
      showNotification('Please agree to the privacy policy.', 'error');
      return;
    }
    
    // Simulate subscription
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    setTimeout(() => {
      showNotification('Successfully subscribed to our newsletter!', 'success');
      newsletterForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 1500);
  });
}

// =============================================
// COOKIE CONSENT
// =============================================
function initCookieConsent() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptButton = document.getElementById('acceptCookies');
  const customizeButton = document.getElementById('customizeCookies');
  
  if (!cookieConsent) return;
  
  // Check if user has already consented
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 2000);
  }
  
  acceptButton?.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieConsent.classList.remove('show');
    showNotification('Cookie preferences saved.', 'success');
  });
  
  customizeButton?.addEventListener('click', function() {
    // In a real implementation, this would open a cookie preferences modal
    showNotification('Cookie customization feature coming soon.', 'info');
  });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function initBackToTop() {
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// =============================================
// DROPDOWN MENUS
// =============================================
function initDropdownMenus() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!toggle || !menu) return;
    
    // Mobile dropdown toggle
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 10001;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle'
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: '#00b894',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#6c5ce7'
  };
  return colors[type] || colors.info;
}

// =============================================
// EMAIL VALIDATION
// =============================================
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =============================================
// ENHANCED ANALYTICS TRACKING
// =============================================
function trackEvent(eventName, eventData = {}) {
  // Google Analytics 4 event tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
  
  // Console log for development
  console.log('Event tracked:', eventName, eventData);
}

// Track form submissions
document.addEventListener('submit', function(e) {
  const form = e.target;
  if (form.id === 'contactForm') {
    trackEvent('form_submit', {
      form_name: 'contact_form',
      service_interest: form.service?.value || 'not_specified'
    });
  } else if (form.id === 'newsletterForm') {
    trackEvent('newsletter_signup', {
      source: 'website'
    });
  }
});

// Track button clicks
document.addEventListener('click', function(e) {
  const button = e.target.closest('a, button');
  if (!button) return;
  
  // Track CTA button clicks
  if (button.classList.contains('btn-primary') || button.classList.contains('btn-secondary')) {
    trackEvent('cta_click', {
      button_text: button.textContent.trim(),
      button_location: button.closest('section')?.id || 'unknown'
    });
  }
  
  // Track navigation clicks
  if (button.classList.contains('nav-link')) {
    trackEvent('navigation_click', {
      link_text: button.textContent.trim(),
      destination: button.getAttribute('href')
    });
  }
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
console.log("Interested in joining our team? Email: careers@petestechnologies.com");

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
