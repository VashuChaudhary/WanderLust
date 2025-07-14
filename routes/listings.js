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
		upload.single("listing[image]"),
		validateListing,
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

//Edit route
router.get(
	"/:id/edit",
	isLoggedIn,
	isOwner,
	wrapAsync(listingsController.renderEditForm)
);

module.exports = router;
