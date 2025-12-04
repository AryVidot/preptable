// --- Mobile Menu Logic ---
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconClosed = document.getElementById("menu-icon-closed");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuOverlay = document.getElementById("menu-overlay");

  const toggleMenu = () => {
    const isActive = mobileMenu.classList.toggle("active");

    // Toggle the icons
    menuIconClosed.classList.toggle("hidden", isActive);
    menuIconOpen.classList.toggle("hidden", !isActive);

    // Toggle the overlay
    menuOverlay.classList.toggle("hidden", !isActive);

    // Manage scroll lock on body (optional but good for UX)
    document.body.style.overflow = isActive ? "hidden" : "auto";
  };

  // 1. Listen for clicks on the main menu button (works for tap/mouse)
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevents this click from immediately triggering the document listener
    toggleMenu();
  });

  // 2. Listen for clicks on the overlay to close the menu
  menuOverlay.addEventListener("click", toggleMenu);

  // 3. Listen for clicks on menu links to close the menu after navigation
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
});

// -- JAVASCRIPT FOR MODAL --
document.addEventListener("DOMContentLoaded", () => {
  // --- Modal Logic (Existing) ---
  const modal = document.getElementById("waitlist-modal");
  const openButtons = document.querySelectorAll(
    '[data-modal-target="waitlist-modal"]'
  );
  const closeButtons = document.querySelectorAll(
    ".close-modal, .modal-backdrop"
  );
  const form = document.getElementById("waitlist-form-popup");
  const successMessage = document.getElementById("waitlist-success");

  const openModal = (e) => {
    e.preventDefault();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    console.log(`Waitlist Submission Mock: Name: ${name}, Email: ${email}`);
    form.style.display = "none";
    successMessage.style.display = "block";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
  // --- End Modal Logic (Existing) ---
});

// Optional: Close menu on escape key (if modal is not open)
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    mobileMenu.classList.contains("open") &&
    !modal.classList.contains("open")
  ) {
    closeMobileMenu();
  }
});



const openModal = (e) => {
  e.preventDefault();
  modal.classList.add("open");
  // Prevent background scroll but allow modal scroll
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
};

const closeModal = () => {
  modal.classList.remove("open");
  // Restore scroll
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.width = "";
  form.reset();
  form.style.display = "block";
  successMessage.style.display = "none";
};


