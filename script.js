// ========================================
// MARCO SOUZA PORTFOLIO - INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initSmoothScroll();
  initScrollReveal();
  initParallaxEffects();
  
  console.log('🚀 Portfolio loaded successfully!');
});

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  // Create Intersection Observer
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// ========================================
// PARALLAX EFFECTS
// ========================================
function initParallaxEffects() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleParallax() {
  const scrolled = window.pageYOffset;
  
  // Parallax effect for hero background
  const gridBackground = document.querySelector('.grid-background');
  if (gridBackground) {
    gridBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}

// ========================================
// ENHANCED CARD INTERACTIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function(e) {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add subtle tilt effect on mouse move
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
});

// ========================================
// CURSOR GLOW EFFECT (Optional Enhancement)
// ========================================
function initCursorGlow() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
}

// Uncomment to enable cursor glow effect
// initCursorGlow();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Lazy load images if any are added later
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Allow ESC to remove focus from elements
  if (e.key === 'Escape') {
    document.activeElement.blur();
  }
});

// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});
