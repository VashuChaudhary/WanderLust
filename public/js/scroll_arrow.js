document.addEventListener("DOMContentLoaded", function () {
	const filterScroll = document.querySelector(".filter-scroll");
	const filterArrow = document.querySelector(".filter-arrow");

	if (!filterScroll || !filterArrow) return;

	function checkAndShowArrow() {
		const scrollWidth = filterScroll.scrollWidth;
		const clientWidth = filterScroll.clientWidth;
		const hasOverflow = scrollWidth > clientWidth;

		if (hasOverflow && window.innerWidth > 580) {
			filterArrow.style.display = "flex";
			updateArrowDirection();
		} else {
			filterArrow.style.display = "none";
		}
	}

	function updateArrowDirection() {
		const scrollLeft = filterScroll.scrollLeft;
		const maxScroll = filterScroll.scrollWidth - filterScroll.clientWidth;
		const isAtEnd = scrollLeft >= maxScroll - 10;

		if (isAtEnd) {
			filterArrow.classList.add("left");
		} else {
			filterArrow.classList.remove("left");
		}
	}

	function scrollFilters() {
		const isLeftArrow = filterArrow.classList.contains("left");
		const scrollAmount = Math.max(200, filterScroll.clientWidth * 0.5);
		const scrollLeft = filterScroll.scrollLeft;
		const maxScroll = filterScroll.scrollWidth - filterScroll.clientWidth;

		if (isLeftArrow && scrollLeft >= maxScroll - 10) {
			// When at the end and left arrow is shown, jump to start
			filterScroll.scrollTo({
				left: 0,
				behavior: "smooth",
			});
		} else if (isLeftArrow) {
			// Scroll left one chunk
			filterScroll.scrollBy({
				left: -scrollAmount,
				behavior: "smooth",
			});
		} else {
			// Scroll right one chunk
			filterScroll.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}

		setTimeout(updateArrowDirection, 400);
	}

	filterArrow.addEventListener("click", function (e) {
		e.preventDefault();
		scrollFilters();
	});

	filterScroll.addEventListener("scroll", function () {
		updateArrowDirection();
	});

	window.addEventListener("resize", function () {
		setTimeout(checkAndShowArrow, 200);
	});

	setTimeout(function () {
		checkAndShowArrow();
	}, 500);
});
