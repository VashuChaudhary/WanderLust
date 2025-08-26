document.addEventListener("DOMContentLoaded", function () {
	const addCategoryBtn = document.getElementById("addCategoryBtn");
	const addCategoryForm = document.getElementById("addCategoryForm");

	if (addCategoryBtn && addCategoryForm) {
		// Toggle form visibility when clicking the add button
		addCategoryBtn.addEventListener("click", function (e) {
			e.stopPropagation();
			addCategoryForm.style.display =
				addCategoryForm.style.display === "none" ? "block" : "none";
		});

		// Hide form when clicking outside
		document.addEventListener("click", function (e) {
			if (
				!addCategoryForm.contains(e.target) &&
				!addCategoryBtn.contains(e.target)
			) {
				addCategoryForm.style.display = "none";
			}
		});
	}
});
