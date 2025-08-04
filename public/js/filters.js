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
