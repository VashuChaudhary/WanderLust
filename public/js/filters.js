// Existing tax switch functionality
let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
	let taxInfo = document.getElementsByClassName("tax-info");
	for (info of taxInfo) {
		if (info.style.display != "inline") {
			info.style.display = "inline";
		} else {
			info.style.display = "none";
		}
	}
});

// Filter functionality
document.addEventListener("DOMContentLoaded", function () {
	const filterItems = document.querySelectorAll(".filter-item");

	filterItems.forEach((item) => {
		item.addEventListener("click", function (e) {
			e.preventDefault(); // Prevent default anchor behavior

			// Check if this item is already active
			if (this.classList.contains("active")) {
				// If active, remove active class (toggle off)
				this.classList.remove("active");
			} else {
				// Remove active class from all filter items
				filterItems.forEach((filter) => filter.classList.remove("active"));
				// Add active class to clicked item
				this.classList.add("active");
			}
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	// Get all filter links
	const filterLinks = document.querySelectorAll(".filter-item");

	// Get current search query if it exists
	const searchParams = new URLSearchParams(window.location.search);
	const currentQuery = searchParams.get("q");

	// Add click event listener to each filter link
	filterLinks.forEach((link) => {
		link.addEventListener("click", function (e) {
			e.preventDefault();

			// Get the href and create new URL parameters
			const href = new URL(this.href, window.location.origin);
			const params = href.searchParams;

			// If there's a search query, add it to the category filter
			if (currentQuery) {
				params.set("q", currentQuery);
			}

			// Navigate to the new URL
			window.location.href = href.toString();
		});
	});

	// Set active class based on current category
	const currentCategory = searchParams.get("category") || "all";
	filterLinks.forEach((link) => {
		const linkCategory = new URL(
			link.href,
			window.location.origin
		).searchParams.get("category");
		if (linkCategory === currentCategory) {
			link.classList.add("active");
		} else {
			link.classList.remove("active");
		}
	});
});
