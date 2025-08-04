document.addEventListener("DOMContentLoaded", function () {
	// Navbar scroll handling
	const navbar = document.querySelector(".navbar");

	function handleScroll() {
		if (window.scrollY > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	}

	window.addEventListener("scroll", handleScroll);
	handleScroll(); // Check initial scroll position

	// Menu overlay functionality
	const hamburgerBtn = document.querySelector(".navbar-toggler");
	const menuOverlay = document.getElementById("menu-overlay");
	const closeBtn = document.getElementById("close-menu");

	// Function to open menu
	function openMenu() {
		if (menuOverlay) {
			menuOverlay.classList.add("active");
			if (hamburgerBtn) hamburgerBtn.classList.add("active");
			document.body.style.overflow = "hidden";
		}
	}

	// Function to close menu
	function closeMenu() {
		if (menuOverlay) {
			menuOverlay.classList.remove("active");
			if (hamburgerBtn) hamburgerBtn.classList.remove("active");
			document.body.style.overflow = "auto";
		}
	}

	// Open menu when hamburger is clicked
	if (hamburgerBtn) {
		hamburgerBtn.addEventListener("click", function (e) {
			e.preventDefault();
			// Toggle menu state
			if (menuOverlay && !menuOverlay.classList.contains("active")) {
				openMenu();
			} else {
				closeMenu();
			}
		});
	}

	// Close menu when X is clicked
	if (closeBtn) {
		closeBtn.addEventListener("click", function () {
			closeMenu();
		});
	}

	// Close menu when clicking outside menu content
	if (menuOverlay) {
		menuOverlay.addEventListener("click", function (e) {
			if (e.target === menuOverlay) {
				closeMenu();
			}
		});
	}

	// Close menu with Escape key
	document.addEventListener("keydown", function (e) {
		if (
			e.key === "Escape" &&
			menuOverlay &&
			menuOverlay.classList.contains("active")
		) {
			closeMenu();
		}
	});
});
