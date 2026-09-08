/* =========================================================
   Portfolio Website — Main JavaScript
   Features: dark mode, mobile nav, digital clock, welcome
   message, show/hide bio, image slideshow, gallery lightbox,
   contact form validation, animated skill bars.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Highlight active nav link ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* ---------- JS Feature 1: Dark / Light mode toggle ---------- */
  var darkToggle = document.getElementById('darkModeToggle');
  var body = document.body;

  function applyStoredTheme() {
    var stored = localStorage.getItem('portfolio-theme');
    if (stored === 'dark') {
      body.classList.add('dark-mode');
      if (darkToggle) darkToggle.textContent = '☀️';
    } else if (darkToggle) {
      darkToggle.textContent = '🌙';
    }
  }
  applyStoredTheme();

  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      var isDark = body.classList.contains('dark-mode');
      darkToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    });
  }

  /* ---------- JS Feature 2: Digital clock ---------- */
  var clockEl = document.getElementById('digitalClock');
  if (clockEl) {
    function updateClock() {
      var now = new Date();
      var h = now.getHours().toString().padStart(2, '0');
      var m = now.getMinutes().toString().padStart(2, '0');
      var s = now.getSeconds().toString().padStart(2, '0');
      clockEl.textContent = h + ':' + m + ':' + s;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ---------- JS Feature 3: Welcome message ---------- */
  var welcomeEl = document.getElementById('welcomeMessage');
  if (welcomeEl) {
    var hour = new Date().getHours();
    var greeting = hour < 12 ? 'Good morning' : (hour < 18 ? 'Good afternoon' : 'Good evening');
    var fullText = greeting + '! Thanks for visiting my portfolio. 👋';
    var i = 0;
    function typeWriter() {
      if (i <= fullText.length) {
        welcomeEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeWriter, 35);
      }
    }
    typeWriter();
  }

  /* ---------- JS Feature 4: Show / hide extra bio info ---------- */
  var toggleBtn = document.getElementById('toggleBioBtn');
  var bioExtra = document.getElementById('bioExtra');
  if (toggleBtn && bioExtra) {
    toggleBtn.addEventListener('click', function () {
      bioExtra.classList.toggle('show');
      toggleBtn.textContent = bioExtra.classList.contains('show')
        ? 'Show Less ▲'
        : 'Read More About Me ▼';
    });
  }

  /* ---------- JS Feature 5: Image slideshow (Gallery page) ---------- */
  var slides = document.querySelectorAll('.slideshow img');
  var dotsWrap = document.getElementById('slideDots');
  if (slides.length > 0) {
    var current = 0;

    if (dotsWrap) {
      slides.forEach(function (_, idx) {
        var dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { showSlide(idx); });
        dotsWrap.appendChild(dot);
      });
    }

    function showSlide(index) {
      slides[current].classList.remove('active');
      if (dotsWrap) dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dotsWrap) dotsWrap.children[current].classList.add('active');
    }

    var prevBtn = document.querySelector('.slide-prev');
    var nextBtn = document.querySelector('.slide-next');
    if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(current + 1); });

    slides[0].classList.add('active');
    setInterval(function () { showSlide(current + 1); }, 5000);
  }

  /* ---------- JS Feature 6: Gallery grid lightbox ---------- */
  var galleryThumbs = document.querySelectorAll('.gallery-grid img');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  if (galleryThumbs.length > 0 && lightbox && lightboxImg) {
    galleryThumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        lightboxImg.src = thumb.src;
        lightboxImg.alt = thumb.alt;
        lightbox.classList.add('open');
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('open');
      });
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  /* ---------- JS Feature 7: Contact form validation ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    var status = document.getElementById('formStatus');

    function showError(id, message) {
      var el = document.getElementById(id + 'Error');
      if (el) el.textContent = message;
    }

    function validateForm() {
      var valid = true;
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');

      showError('name', '');
      showError('email', '');
      showError('message', '');

      if (!name.value.trim()) {
        showError('name', 'Please enter your name.');
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        showError('message', 'Message should be at least 10 characters.');
        valid = false;
      }

      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        status.textContent = 'Thanks! Your message has been received. ✅';
        status.className = 'show success';
        form.reset();
      } else {
        status.textContent = 'Please fix the errors above and try again.';
        status.className = 'show fail';
      }
    });
  }

  /* ---------- JS Feature 8 (creativity): Animated skill/hobby bars ---------- */
  var bars = document.querySelectorAll('.progress-bar');
  if (bars.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.style.width = target.getAttribute('data-level') + '%';
        }
      });
    }, { threshold: 0.4 });

    bars.forEach(function (bar) { observer.observe(bar); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
