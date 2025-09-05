// DOM Elements
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const themeIcon = document.getElementById("theme-icon");
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeModal = document.querySelector(".close-modal");
const modalCloseBtn = document.getElementById("modalClose");

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Dark/Light Mode Toggle
themeIcon.addEventListener("click", () => {
  // Toggle icon
  if (themeIcon.classList.contains("fa-moon")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Check for saved theme preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

// Form Validation
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (name.value.trim() === "") {
      nameError.textContent = "Name is required";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validate Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validate Subject
    const subject = document.getElementById("subject");
    const subjectError = document.getElementById("subjectError");
    if (subject.value.trim() === "") {
      subjectError.textContent = "Subject is required";
      isValid = false;
    } else {
      subjectError.textContent = "";
    }

    // Validate Message
    const message = document.getElementById("message");
    const messageError = document.getElementById("messageError");
    if (message.value.trim() === "") {
      messageError.textContent = "Message is required";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    // If form is valid, show success modal
    if (isValid) {
      successModal.style.display = "flex";
      contactForm.reset();
    }
  });
}

// Modal functionality
if (closeModal) {
  closeModal.addEventListener("click", () => {
    successModal.style.display = "none";
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", () => {
    successModal.style.display = "none";
  });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.style.display = "none";
  }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Sticky navigation
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    navbar.style.padding = "0.5rem 0";
  } else {
    navbar.style.boxShadow = "none";
    navbar.style.padding = "1rem 0";
  }
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".service-card, .testimonial-card"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      element.style.transform = "translateY(0)";
    }
  });
}

// Initialize elements for animation
document
  .querySelectorAll(".service-card, .testimonial-card")
  .forEach((element) => {
    element.style.opacity = 0;
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Run animation on scroll
window.addEventListener("scroll", animateOnScroll);
// Run once on load
window.addEventListener("load", animateOnScroll);
