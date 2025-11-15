// document.getElementById("contactForm").addEventListener("submit", function (e) {
//   e.preventDefault();
//   alert("Thank you for contacting Editkaro.in! We'll get back to you soon.");
// });

// Smooth scroll
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// Fade-in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade").forEach(section => {
  observer.observe(section);
});

// Form feedback
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Thank you! Your message has been sent.");
  this.reset();
});
