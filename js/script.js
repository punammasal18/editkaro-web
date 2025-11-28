// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => navList.classList.toggle('open'));
}

// Email collector -> Google Sheets
const emailForm = document.getElementById('emailForm');
const emailStatus = document.getElementById('emailStatus');
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value.trim();
    if (!email) return;

    emailForm.querySelector('button').disabled = true;
    emailStatus.textContent = 'Submitting...';

    try {
      await fetch('https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'homepage' })
      });
      emailStatus.textContent = 'Thanks! You are subscribed.';
      emailForm.reset();
    } catch {
      emailStatus.textContent = 'Something went wrong. Please try again.';
    } finally {
      emailForm.querySelector('button').disabled = false;
    }
  });
}

// Contact form -> Google Sheets
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('contactName').value.trim(),
      email: document.getElementById('contactEmail').value.trim(),
      phone: document.getElementById('contactPhone').value.trim(),
      message: document.getElementById('contactMessage').value.trim(),
      source: 'contact-page'
    };
    if (!payload.name || !payload.email || !payload.message) {
      contactStatus.textContent = 'Please fill required fields.';
      return;
    }

    contactForm.querySelector('button').disabled = true;
    contactStatus.textContent = 'Sending...';

    try {
      await fetch('https://script.google.com/macros/s/YOUR_APPS_SCRIPT_DEPLOYMENT_ID/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      contactStatus.textContent = 'Message sent! We’ll be in touch.';
      contactForm.reset();
    } catch {
      contactStatus.textContent = 'Something went wrong. Please try again.';
    } finally {
      contactForm.querySelector('button').disabled = false;
    }
  });
}

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.portfolio-card');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;
      card.style.display = show ? '' : 'none';
    });
  });
});
