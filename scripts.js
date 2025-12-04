// --- Mobile Menu Logic ---
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconClosed = document.getElementById("menu-icon-closed");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuOverlay = document.getElementById("menu-overlay");

  const toggleMenu = () => {
    const isActive = mobileMenu.classList.toggle("active");
    menuIconClosed.classList.toggle("hidden", isActive);
    menuIconOpen.classList.toggle("hidden", !isActive);
    menuOverlay.classList.toggle("hidden", !isActive);
    document.body.style.overflow = isActive ? "hidden" : "auto";
  };

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  menuOverlay.addEventListener("click", toggleMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // --- Modal Logic ---
  const modal = document.getElementById("waitlist-modal");
  const openButtons = document.querySelectorAll('[data-modal-target="waitlist-modal"]');
  const closeButtons = document.querySelectorAll(".close-modal, .modal-backdrop");
  const form = document.getElementById("waitlist-form-popup");
  const successMessage = document.getElementById("waitlist-success");

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    form.reset();
    form.style.display = "block";
    successMessage.style.display = "none";
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  // Form submission for Netlify
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      console.log("Form submitted successfully!");
      form.style.display = "none";
      successMessage.style.display = "block";
    })
    .catch((error) => {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    });
  });

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});