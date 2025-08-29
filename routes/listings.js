const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
	.route("/")
	//Index Route
	.get(wrapAsync(listingsController.index))
	//Create Route
	.post(
		isLoggedIn,
		validateListing,
		upload.single("listing[image]"),
		wrapAsync(listingsController.createListing)
	);

//New Route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
	.route("/:id")
	//show listing route
	.get(wrapAsync(listingsController.showListing))
	//Update Route
	.put(
		isLoggedIn,
		isOwner,
		upload.single("listing[image]"),
		validateListing,
		wrapAsync(listingsController.updateListing)
	)
	//DELETE ROUTE
	.delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));
// DELETE a specific category by index
router.delete(
	"/:id/category/:catIndex",
	isLoggedIn,
	isOwner,
	wrapAsync(listingsController.deleteCategory)
);

// Add a new category
router.post(
	"/:id/category/add-one",
	isLoggedIn,
	isOwner,
	wrapAsync(listingsController.addCategory)
);

//Edit route
router.get(
	"/:id/edit",
	isLoggedIn,
	isOwner,
	wrapAsync(listingsController.renderEditForm)
);

// Category filter route
router.get("/category/:category", wrapAsync(listingsController.index));

// Show all listings of a specific category
// router.get("/category/:category", async (req, res) => {
// 	const { category } = req.params;
// 	const listings = await Listing.find({
// 		category: category, // Or {$in: [categoryName]} if category is an array
// 	});
// 	res.render("listings/category", { listings, category });
// });
// Add a category to a listing
// Handle single category add from dropdown
router.post("/listings/:id/category/add-one", async (req, res) => {
	const { id } = req.params;
	let { category } = req.body;
	if (!category) return res.redirect(`/listings/${id}`);

	category = category.trim();
	const listing = await Listing.findById(id);
	if (!listing) return res.status(404).send("Listing not found.");

	// Ensure category is always an array
	if (!Array.isArray(listing.category)) {
		listing.category = listing.category ? [listing.category] : [];
	}
	// Avoid duplicates
	if (!listing.category.includes(category)) {
		listing.category.push(category);
		await listing.save();
	}
	res.redirect(`/listings/${id}`);
});

module.exports = router;
