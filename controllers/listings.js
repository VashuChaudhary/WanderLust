const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
	try {
		const { q } = req.query;
		// Get category from either query params or route params
		let category = req.params.category || req.query.category || "all";
		let filter = {};
		let sort = {};

		// For filtering, we need the exact category name
		if (category && category !== "all") {
			if (category.toLowerCase() === "trending") {
				sort = { price: -1 };
			} else {
				filter.category = category;
			}
		}

		if (q && q.trim()) {
			filter.$text = { $search: q.trim() };
			sort = { score: { $meta: "textScore" } };
		}

		const allListings = await Listing.find(
			filter,
			q ? { score: { $meta: "textScore" } } : {}
		).sort(sort);

		// Set currentCategory for the view
		const currentCategory = category || "all";

		res.render("listings/index", {
			allListings,
			q: q || "",
			currentCategory,
		});
	} catch (err) {
		console.error("Error fetching listings:", err);
		req.flash("error", "Failed to fetch listings");
		res.redirect("/");
	}
};

module.exports.renderNewForm = (req, res) => {
	res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id)
		.populate({ path: "reviews", populate: { path: "author" } })
		.populate("owner");
	if (!listing) {
		req.flash("error", "Listing not found");
		res.redirect("/listings");
	}
	res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
	try {
		const listingData = req.body.listing;
		let url = req.file.path;
		let filename = req.file.filename;

		if (!url) {
			listingData.image = {
				url: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157",
				filename: "default-listing",
			};
		} else {
			listingData.image = { url, filename };
		}
		if (listingData.category) {
			if (!Array.isArray(listingData.category)) {
				listingData.category = [listingData.category];
			}
		} else {
			listingData.category = ["Rooms"];
		}

		const newListing = new Listing(listingData);
		newListing.owner = req.user._id;

		await newListing.save();
		req.flash("success", "New Listing Created!");
		res.redirect("/listings");
	} catch (err) {
		console.error("Error creating listing:", err);
		req.flash("error", "Error creating listing: " + err.message);
		res.redirect("/listings/new");
	}
};

module.exports.renderEditForm = async (req, res) => {
	let { id } = req.params;
	const listing = await Listing.findById(id);
	if (!listing) {
		req.flash("error", "Listing not found");
		res.redirect("/listings");
	}

	let originalUrl = listing.image.url;
	originalUrl = originalUrl.replace("/upload", "/upload/w_250/");
	res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.addCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const { category } = req.body;

		const listing = await Listing.findById(id);
		if (!listing) {
			req.flash("error", "Listing not found");
			return res.redirect("/listings");
		}

		// Get current categories as array
		let currentCategories = Array.isArray(listing.category)
			? [...listing.category] // if it's already an array, spread it
			: [listing.category]; // if it's a single value, make it an array

		// Check if category already exists
		if (currentCategories.includes(category)) {
			req.flash("error", "Category already exists");
			return res.redirect(`/listings/${id}`);
		}

		// Add the new category to the array
		currentCategories.push(category);

		// Update the listing with the new categories array
		listing.category = currentCategories;
		await listing.save();

		req.flash("success", "Category added successfully");
		res.redirect(`/listings/${id}`);
	} catch (err) {
		console.error("Error adding category:", err);
		req.flash("error", "Failed to add category");
		res.redirect(`/listings/${req.params.id}`);
	}
};

module.exports.updateListing = async (req, res) => {
	let { id } = req.params;
	let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

	if (typeof req.file !== "undefined") {
		let url = req.file.path;
		let filename = req.file.filename;
		listing.image = { url, filename };
		await listing.save();
	}
	req.flash("success", "Listing Updated!");
	res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
	let { id } = req.params;
	let deletedListing = await Listing.findByIdAndDelete(id);
	console.log(deletedListing);
	req.flash("success", "Listing Deleted!");
	res.redirect("/listings");
};

// Delete a specific category from a listing
module.exports.deleteCategory = async (req, res) => {
	try {
		const { id, catIndex } = req.params;
		const listing = await Listing.findById(id);

		if (!listing) {
			req.flash("error", "Listing not found");
			return res.redirect("/listings");
		}

		// Ensure categories is an array
		if (!Array.isArray(listing.category)) {
			listing.category = [listing.category];
		}

		// Ensure at least one category remains
		if (listing.category.length <= 1) {
			req.flash("error", "Cannot delete the last category");
			return res.redirect(`/listings/${id}`);
		}

		// Remove the category at the specified index
		listing.category.splice(catIndex, 1);
		await listing.save();

		req.flash("success", "Category removed");
		res.redirect(`/listings/${id}`);
	} catch (err) {
		console.error("Error deleting category:", err);
		req.flash("error", "Failed to delete category");
		res.redirect(`/listings/${id}`);
	}
};
