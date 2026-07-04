// ================================================
//  SHIVAM KUMAR MAURYA PORTFOLIO — Interactive
// ================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── THEME SWITCHER (DARK/LIGHT MODE) ──────────
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply default theme
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      theme = 'dark';
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  });
  const loader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1600); // matches bar fill animation
  });
  // Fallback if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => loader.classList.add('hidden'), 1600);
  }

  // ── 1. NAVBAR SCROLL EFFECT & PROGRESS BAR ───
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const scrollBar = document.getElementById('scroll-bar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Scroll progress bar calculation
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollBar) {
      scrollBar.style.width = scrolled + '%';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ── 2. MOBILE MENU ───────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ── 3. TYPEWRITER EFFECT ─────────────────────
  const roles = [
    'Full-Stack Applications',
    'ML & AI Systems',
    'Mobile Apps with Flutter',
    'Scalable REST APIs',
    'Real-time Web Solutions'
  ];

  const typewriterEl = document.getElementById('typewriter');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1500; // pause
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();


  // ── 4. SCROLL SPY (active nav link) ──────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateScrollSpy() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 80;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy);
  updateScrollSpy();


  // ── 5. SCROLL REVEAL ─────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on index in its parent
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-about-img, .reveal-about-text').forEach(el => {
    // Don't override explicit delay classes from HTML
    const hasExplicitDelay = el.classList.contains('delay-1') ||
                             el.classList.contains('delay-2') ||
                             el.classList.contains('delay-3') ||
                             el.classList.contains('delay-4');
    revealObserver.observe(el);
    if (hasExplicitDelay) el.style.transitionDelay = ''; // let CSS handle it
  });

  // ── 5b. EDUCATION TIMELINE DRAWING ────────────────
  const timeline = document.querySelector('.edu-timeline');
  if (timeline) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-timeline');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    timelineObserver.observe(timeline);
  }


  // ── 6. SKILL BAR ANIMATION ───────────────────
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const pct = bar.dataset.width;
        setTimeout(() => {
          bar.style.width = pct + '%';
        }, 200);
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));


  // ── 7. COUNTER ANIMATION ─────────────────────
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + suffix;
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  // ── 8. PROJECT CONSOLE SELECTORS & FILTER ────────────────────────
  const consoleItems = document.querySelectorAll('.console-nav-item');
  const projectCards = document.querySelectorAll('.project-detail-card');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Handle click on selector nav items
  consoleItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active classes
      consoleItems.forEach(i => i.classList.remove('active'));
      projectCards.forEach(c => c.classList.remove('active'));

      // Activate clicked item and corresponding card
      item.classList.add('active');
      const targetId = item.dataset.project;
      const targetCard = document.getElementById(`project-${targetId}`);
      if (targetCard) {
        targetCard.classList.add('active');
        
        // Reset animations on toggle
        targetCard.style.animation = 'none';
        targetCard.offsetHeight; // reflow
        targetCard.style.animation = '';
      }
    });
  });

  // Handle filter clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let firstVisible = null;

      consoleItems.forEach(item => {
        const itemCats = item.dataset.category.split(' ');
        if (filter === 'all' || itemCats.includes(filter)) {
          item.classList.remove('hidden');
          if (!firstVisible) {
            firstVisible = item;
          }
        } else {
          item.classList.add('hidden');
        }
      });

      // Automatically select the first visible project in the filtered list
      if (firstVisible) {
        firstVisible.click();
      }
    });
  });


  // ── 9. LIGHTBOX ──────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(el => {
    el.addEventListener('click', () => {
      const src = el.dataset.lightbox;
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });


  // ── 10. CONTACT FORM ─────────────────────────
  const contactForm = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  const formSubmit = document.getElementById('form-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formMsg.textContent = '⚠️ Please fill in all required fields.';
        formMsg.className = 'form-msg error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = '⚠️ Please enter a valid email address.';
        formMsg.className = 'form-msg error';
        return;
      }

      // Simulate sending
      formSubmit.textContent = 'Sending...';
      formSubmit.disabled = true;

      setTimeout(() => {
        formSubmit.innerHTML = '✅ Message Sent!';
        formSubmit.classList.add('success');
        formMsg.textContent = 'Thank you! I\'ll get back to you within 24 hours.';
        formMsg.className = 'form-msg success';
        contactForm.reset();

        setTimeout(() => {
          formSubmit.innerHTML = '<span>Send Message</span> <span>→</span>';
          formSubmit.classList.remove('success');
          formSubmit.disabled = false;
          formMsg.textContent = '';
          formMsg.className = 'form-msg';
        }, 4000);
      }, 1600);
    });
  }


  // ── 11. HERO BLOB PARALLAX (light theme) ────────
  const heroBlobs = document.querySelectorAll('.hero-blob');
  window.addEventListener('mousemove', (e) => {
    const xFrac = (e.clientX / window.innerWidth - 0.5) * 2;
    const yFrac = (e.clientY / window.innerHeight - 0.5) * 2;
    heroBlobs.forEach((blob, i) => {
      const factor = i === 0 ? 18 : 12;
      blob.style.transform = `translate(${xFrac * factor}px, ${yFrac * factor}px)`;
    });
  });


  // ── 11b. 3D CARD TILT on project cards ──────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      
      // Update mouse position custom CSS properties for cursor glow tracking
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.15s ease';
    });
  });


  // ── 11c. BUTTON RIPPLE ───────────────────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%; pointer-events:none;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.35);
        transform:scale(0); animation:ripple-out 0.6s ease-out forwards;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframe
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes ripple-out { to { transform:scale(4); opacity:0; } }';
  document.head.appendChild(rippleStyle);


  // ── 12. SKILL TABS (ANIMATED STAGGERED FADE-IN) ──
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  // Set default transitions for skill cards
  skillCards.forEach(card => {
    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease, border-color 0.32s ease, box-shadow 0.32s ease';
  });

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;
      
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      
      // Step 1: Fade out all cards
      skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(12px)';
      });

      // Step 2: Swap visibility and animate in after fade out finishes
      setTimeout(() => {
        let visibleIndex = 0;
        skillCards.forEach(card => {
          const matches = (cat === 'all' || card.dataset.cat === cat);
          if (matches) {
            card.style.display = '';
            
            // Set transitions delays for staggered entry
            card.style.transitionDelay = `${visibleIndex * 0.05}s`;
            visibleIndex++;
            
            // Request animation frame to ensure display is applied before animating
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            });
          } else {
            card.style.display = 'none';
            card.style.transitionDelay = '0s';
          }
        });
      }, 250);
    });
  });


  // ── 13. PAGE WIPE TRANSITION ON SECTION CLICK ───
  const pageWipe = document.getElementById('page-wipe');
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (hamburger.classList.contains('open')) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
        
        // Trigger transition wipe (slide in)
        pageWipe.classList.remove('reveal');
        pageWipe.classList.add('active');
        
        setTimeout(() => {
          // Perform scrolling instantly behind the screen
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          
          setTimeout(() => {
            // Dismiss transition wipe (slide out)
            pageWipe.classList.remove('active');
            pageWipe.classList.add('reveal');
            
            setTimeout(() => {
              pageWipe.classList.remove('reveal');
            }, 550);
          }, 150);
        }, 450); // wait for panels to meet in center (approx 450ms)
      }
    });
  });


  // ── 14. ABOUT REDESIGN TAB SWITCHING ─────────────
  const aboutTabs = document.querySelectorAll('.about-tab-btn');
  const aboutPanels = document.querySelectorAll('.about-tab-panel');
  
  aboutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      aboutTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const targetPanelId = 'tab-' + tab.dataset.tab;
      aboutPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          
          // Special trigger for Education tab animation
          if (tab.dataset.tab === 'education') {
            const tl = panel.querySelector('.edu-timeline');
            if (tl) {
              // Reset and trigger line drawing transition
              tl.classList.remove('active-timeline');
              tl.offsetHeight; // force reflow
              tl.classList.add('active-timeline');
            }
            // Trigger item reveals with stagger
            const items = panel.querySelectorAll('.edu-item.reveal');
            items.forEach((item, idx) => {
              item.classList.remove('revealed');
              item.style.transitionDelay = `${idx * 0.15}s`;
              item.offsetHeight; // force reflow
              item.classList.add('revealed');
            });
          }
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ── 15. AUTOPLAY PROJECTS SHOWCASE ────────────────
  let autoplayInterval = null;
  const consoleWrapper = document.querySelector('.projects-console-wrapper');

  function startAutoplay() {
    if (autoplayInterval) return;
    autoplayInterval = setInterval(() => {
      // Find visible selector navigation items (handling filters automatically)
      const visibleItems = Array.from(document.querySelectorAll('.console-nav-item:not(.hidden)'));
      if (visibleItems.length <= 1) return;

      const activeItem = document.querySelector('.console-nav-item.active');
      let currentIndex = visibleItems.indexOf(activeItem);
      if (currentIndex === -1) currentIndex = 0;

      const nextIndex = (currentIndex + 1) % visibleItems.length;
      visibleItems[nextIndex].click();
    }, 4500); // Swap project every 4.5 seconds
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Start initially
  startAutoplay();

  // Pause on hover or direct interaction, resume when mouse leaves
  if (consoleWrapper) {
    consoleWrapper.addEventListener('mouseenter', stopAutoplay);
    consoleWrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Handle click on View Project links in achievements section
  const viewProjectLinks = document.querySelectorAll('.view-project-link');
  viewProjectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.dataset.project;
      
      // Select that project inside project console nav
      const targetNavItem = document.querySelector(`.console-nav-item[data-project="${projectId}"]`);
      if (targetNavItem) {
        // Trigger click to active the project card
        targetNavItem.click();
      }

      // Scroll smoothly to target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── 3D TILT HOVER EFFECTS ────────────────────────
  const tiltElements = document.querySelectorAll('.hackathon-card, .project-detail-card');
  
  tiltElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
      const glow = el.querySelector('.hackathon-glow, .project-hero-glow');
      if (glow) glow.style.transition = 'none';
    });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 8; 
      const rotateY = ((x - centerX) / centerX) * 8;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      
      const glow = el.querySelector('.hackathon-glow, .project-hero-glow');
      if (glow) {
        const glowX = ((x - centerX) / centerX) * 15;
        const glowY = ((y - centerY) / centerY) * 15;
        glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease, border-color 0.5s ease';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      
      const glow = el.querySelector('.hackathon-glow, .project-hero-glow');
      if (glow) {
        glow.style.transition = 'transform 0.5s ease';
        glow.style.transform = 'translate(0, 0)';
      }
    });
  });


  // ════════════════════════════════════════════════════
  //  PREMIUM IMPROVEMENTS — JS FEATURES
  // ════════════════════════════════════════════════════

  // ── P1. CURSOR SPOTLIGHT EFFECT ──────────────────────
  //  Mouse position track karo har card mein CSS vars se
  const spotlightEls = document.querySelectorAll(
    '.skill-card, .cert-card, .hackathon-card, .highlight-item, .approach-item, .stat-card, .console-nav-item, .contact-item'
  );

  spotlightEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--mouse-x', '-9999px');
      el.style.setProperty('--mouse-y', '-9999px');
    });
  });


  // ── P2. MAGNETIC BUTTON EFFECT ───────────────────────
  //  Buttons mouse ke paas gently attract hote hain
  const magneticBtns = document.querySelectorAll('.btn, .btn-pill, .form-submit, .nav-cta');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.25;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.12s ease';
    });
  });


  // ── P3. ENHANCED COUNTER ANIMATION ───────────────────
  //  Smooth easing counter with spring-like feel
  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  // Override existing simple counter with enhanced version
  const enhancedCounters = document.querySelectorAll('[data-count]');
  const enhancedCounterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        enhancedCounterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  enhancedCounters.forEach(c => enhancedCounterObserver.observe(c));


  // ── P4. HERO MESH PARALLAX ───────────────────────────
  //  Mouse move par mesh background subtly shifts
  const heroMesh = document.querySelector('.hero-mesh');
  if (heroMesh) {
    window.addEventListener('mousemove', (e) => {
      if (!document.getElementById('hero').contains(document.elementFromPoint(e.clientX, e.clientY))) return;
      const xFrac = (e.clientX / window.innerWidth - 0.5);
      const yFrac = (e.clientY / window.innerHeight - 0.5);
      heroMesh.style.transform = `translate(${xFrac * 18}px, ${yFrac * 12}px)`;
    });
  }


  // ── P5. SKILL ICON BOUNCE on SCROLL REVEAL ───────────
  //  Already handled via CSS transition-bounce,
  //  adding extra bounce class when revealed
  document.querySelectorAll('.skill-card').forEach((card, i) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const icon = entry.target.querySelector('.skill-icon');
          if (icon) {
            setTimeout(() => {
              icon.style.animation = 'icon-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
              setTimeout(() => { icon.style.animation = ''; }, 600);
            }, i * 60);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(card);
  });

  // Inject icon pop keyframe
  const iconPopStyle = document.createElement('style');
  iconPopStyle.textContent = `
    @keyframes icon-pop {
      0%   { transform: scale(0.6) rotate(-15deg); }
      60%  { transform: scale(1.2) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
  `;
  document.head.appendChild(iconPopStyle);


  // ── P6. CONTACT FORM — Enhanced validation UX ────────
  //  Show red border shake on invalid submit attempt
  const inputShakeStyle = document.createElement('style');
  inputShakeStyle.textContent = `
    @keyframes input-shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    .input-error {
      border-color: #dc2626 !important;
      animation: input-shake 0.4s ease forwards;
    }
    .input-error:focus {
      box-shadow: 0 0 0 3px rgba(220,38,38,0.15) !important;
    }
  `;
  document.head.appendChild(inputShakeStyle);

  // Override contactForm submit to add shake
  const contactFormEl = document.getElementById('contact-form');
  if (contactFormEl) {
    contactFormEl.addEventListener('submit', (e) => {
      const fields = ['name', 'email', 'message'];
      fields.forEach(id => {
        const input = document.getElementById(id);
        if (input && !input.value.trim()) {
          input.classList.add('input-error');
          setTimeout(() => input.classList.remove('input-error'), 600);
        }
      });
    }, true); // use capture to run BEFORE existing handler
  }


  // ── P7. SMOOTH SECTION REVEAL — extra polish ─────────
  //  Add subtle CSS class for all section headings
  document.querySelectorAll('.section-tag').forEach((tag, i) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(12px)';
    tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, 80);
          obs.unobserve(tag);
        }
      });
    }, { threshold: 0.5 });
    obs.observe(tag);
  });


  // ════════════════════════════════════════════════════
  //  NEW PREMIUM FEATURES
  // ════════════════════════════════════════════════════

  // ── N1. CUSTOM MAGNETIC GLOW CURSOR ─────────────────
  const cursorDot  = document.getElementById('cursor-dot');
  const cursorGlow = document.getElementById('cursor-glow');

  if (cursorDot && cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let dotX = -100, dotY = -100;
    let glowX = -100, glowY = -100;

    window.addEventListener('mousemove', (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top  = dotY + 'px';
    });

    function animateGlow() {
      glowX += (dotX - glowX) * 0.12;
      glowY += (dotY - glowY) * 0.12;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top  = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();

    const interactiveEls = document.querySelectorAll(
      'a, button, .btn, .skill-tab, .filter-btn, .console-nav-item, .about-tab-btn, .social-link, .social-pill, input, textarea, .project-img-wrap, .hackathon-card, .cert-card'
    );
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    window.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
    document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; cursorGlow.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; cursorGlow.style.opacity = '1'; });
  }


  // ── N2. HERO FLOATING PARTICLES ─────────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero');
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let animRunning = false;

    function resizeCanvas() {
      canvas.width  = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function randomRange(a, b) { return a + Math.random() * (b - a); }

    function spawnParticle() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        x: randomRange(0, canvas.width),
        y: randomRange(0, canvas.height),
        r: randomRange(1.2, 3.2),
        alpha: randomRange(0.3, 0.9),
        speed: randomRange(0.2, 0.6),
        angle: randomRange(0, Math.PI * 2),
        spin:  randomRange(-0.006, 0.006),
        hue:   isDark ? randomRange(260, 290) : randomRange(240, 280),
      };
    }

    function initParticles(count) {
      count = count || 55;
      particles = [];
      for (let i = 0; i < count; i++) particles.push(spawnParticle());
    }
    initParticles();

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    function drawParticles() {
      if (!animRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseX || canvas.width / 2;
      const my = mouseY || canvas.height / 2;

      particles.forEach(p => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) { p.x += dx * 0.0012; p.y += dy * 0.0012; }

        p.angle += p.spin;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed * 0.7;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${p.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    }

    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        animRunning = entry.isIntersecting;
        if (animRunning) requestAnimationFrame(drawParticles);
      });
    }, { threshold: 0 });
    heroObs.observe(heroSection);

    const themeBtn2 = document.getElementById('theme-toggle');
    if (themeBtn2) themeBtn2.addEventListener('click', () => setTimeout(initParticles, 50));
  }


  // ── N3. CONFETTI BURST ON HACKATHON CARD HOVER ──────
  const GOLD_COLORS   = ['#f59e0b','#fbbf24','#fde68a','#d97706','#fff7ed','#7c3aed'];
  const SILVER_COLORS = ['#94a3b8','#e0f2fe','#bae6fd','#0891b2','#f8fafc','#c084fc'];

  function launchConfetti(originEl, colors, count) {
    count = count || 18;
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + 24;

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const fallY = -(60 + Math.random() * 130);
      const fallX = (Math.random() - 0.5) * 220;
      const rot   = (Math.random() - 0.5) * 720;
      const dur   = 0.8 + Math.random() * 0.7;
      const size  = 6 + Math.random() * 8;

      piece.style.cssText = [
        'left:' + (cx + (Math.random() - 0.5) * 80) + 'px',
        'top:' + cy + 'px',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'background:' + colors[Math.floor(Math.random() * colors.length)],
        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px'),
        '--fall-y:' + fallY + 'px',
        '--fall-x:' + fallX + 'px',
        '--fall-rot:' + rot + 'deg',
        '--fall-duration:' + dur + 's',
        'animation-delay:' + (Math.random() * 0.15) + 's'
      ].join(';');

      document.body.appendChild(piece);
      setTimeout(() => { if (piece.parentNode) piece.remove(); }, (dur + 0.4) * 1000);
    }
  }

  document.querySelectorAll('.hackathon-card').forEach(card => {
    let fired = false;
    card.addEventListener('mouseenter', () => {
      if (fired) return;
      fired = true;
      const isGold = card.classList.contains('gold-win');
      launchConfetti(card, isGold ? GOLD_COLORS : SILVER_COLORS, 22);
      setTimeout(() => { fired = false; }, 3000);
    });
  });


  // ── N4. AVAILABLE BADGE — entrance animation ─────────
  const availBadge = document.querySelector('.available-badge');
  if (availBadge) {
    availBadge.style.opacity = '0';
    availBadge.style.transform = 'translateY(-10px) scale(0.9)';
    availBadge.style.transition = 'opacity 0.6s ease 1.8s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.8s';
    requestAnimationFrame(() => {
      setTimeout(() => {
        availBadge.style.opacity = '1';
        availBadge.style.transform = '';
      }, 100);
    });
  }

});
