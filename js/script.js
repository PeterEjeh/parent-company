// =============================================
// PETES TECHNOLOGIES - MAIN JAVASCRIPT
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initHamburgerMenu();
  initContactForm();
  initSearch();
  initEnhancedNavigation();
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
// CONTACT FORM HANDLING
// =============================================
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }
}

function handleContactForm(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Basic validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    showNotification('Please fill in all required fields.', 'error');
    return;
  }
  
  // Simulate form submission
  showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
  e.target.reset();
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#00b894' : type === 'error' ? '#e74c3c' : '#3498db'};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    z-index: 10000;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// =============================================
// LEGAL PAGE HANDLER
// =============================================
function openLegalPage(page) {
  window.open(`legal.html?page=${page}`, '_blank');
}

// =============================================
// SEARCH FUNCTIONALITY
// =============================================
function initSearch() {
  // Create search overlay
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'search-overlay';
  searchOverlay.innerHTML = `
    <div class="search-container">
      <div class="search-header">
        <input type="text" id="searchInput" placeholder="Search our website..." autocomplete="off">
        <button class="search-close" onclick="closeSearch()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="search-results" id="searchResults">
        <div class="search-placeholder">
          <i class="fas fa-search"></i>
          <p>Start typing to search...</p>
        </div>
      </div>
    </div>
  `;
  
  // Add styles
  searchOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    z-index: 10000;
    display: none;
    align-items: center;
    justify-content: center;
  `;
  
  document.body.appendChild(searchOverlay);
  
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchResults.innerHTML = `
        <div class="search-placeholder">
          <i class="fas fa-search"></i>
          <p>Start typing to search...</p>
        </div>
      `;
      return;
    }
    
    const results = performSearch(query);
    displaySearchResults(results, searchResults);
  });
  
  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
    }
  });
}

function performSearch(query) {
  const searchableContent = [
    { title: 'About Us', content: 'Learn about Petes Technologies, our mission, and our team', url: '#about' },
    { title: 'Services', content: 'Mobile app development, cloud infrastructure, AI & ML solutions', url: '#services' },
    { title: 'Products', content: 'Beta Life financial app and AgroBloc blockchain platform', url: '#products' },
    { title: 'Careers', content: 'Join our team and build the future of African technology', url: '#careers' },
    { title: 'Contact', content: 'Get in touch with our team for partnerships and support', url: '#contact' },
    { title: 'Investor Relations', content: 'Financial reports, presentations, and corporate governance', url: '#investors' }
  ];
  
  return searchableContent.filter(item => 
    item.title.toLowerCase().includes(query) || 
    item.content.toLowerCase().includes(query)
  );
}

function displaySearchResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-placeholder">
        <i class="fas fa-search"></i>
        <p>No results found</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = results.map(result => `
    <div class="search-result" onclick="navigateToSection('${result.url}'); closeSearch();">
      <h4>${result.title}</h4>
      <p>${result.content}</p>
    </div>
  `).join('');
}

function openSearch() {
  const overlay = document.querySelector('.search-overlay');
  overlay.style.display = 'flex';
  document.getElementById('searchInput').focus();
}

function closeSearch() {
  const overlay = document.querySelector('.search-overlay');
  overlay.style.display = 'none';
  document.getElementById('searchInput').value = '';
}

function navigateToSection(url) {
  const element = document.querySelector(url);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// =============================================
// ENHANCED NAVIGATION
// =============================================
function initEnhancedNavigation() {
  // Add search button to header
  const header = document.querySelector('.header');
  const searchButton = document.createElement('button');
  searchButton.className = 'search-button';
  searchButton.innerHTML = '<i class="fas fa-search"></i>';
  searchButton.onclick = openSearch;
  searchButton.style.cssText = `
    background: rgba(0, 184, 148, 0.1);
    border: 1px solid rgba(0, 184, 148, 0.2);
    color: var(--color-white);
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: var(--transition-base);
    margin-left: 10px;
  `;
  
  const navbar = document.querySelector('.navbar');
  navbar.insertBefore(searchButton, navbar.querySelector('.hamburger'));
  
  // Add breadcrumb navigation
  addBreadcrumbs();
}

function addBreadcrumbs() {
  const sections = document.querySelectorAll('.slide');
  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.className = 'breadcrumbs';
  breadcrumbContainer.style.cssText = `
    position: fixed;
    top: 70px;
    left: 20px;
    z-index: 99;
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(10px);
    padding: 10px 15px;
    border-radius: 8px;
    display: none;
  `;
  
  document.body.appendChild(breadcrumbContainer);
  
  // Update breadcrumbs on scroll
  window.addEventListener('scroll', updateBreadcrumbs);
}

function updateBreadcrumbs() {
  const sections = document.querySelectorAll('.slide');
  const breadcrumbs = document.querySelector('.breadcrumbs');
  
  let currentSection = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section;
    }
  });
  
  if (currentSection) {
    const sectionTitle = currentSection.querySelector('h2')?.textContent || 'Home';
    breadcrumbs.innerHTML = `
      <a href="#home">Home</a> > <span>${sectionTitle}</span>
    `;
    breadcrumbs.style.display = 'block';
  } else {
    breadcrumbs.style.display = 'none';
  }
}

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
