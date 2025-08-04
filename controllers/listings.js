const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
	const { q } = req.query; // Get search query from URL parameters
	let filter = {};
	let sort = {};

	if (q && q.trim()) {
		// Check if search query exists and isn't empty
		filter = { $text: { $search: q.trim() } };
		sort = { score: { $meta: "textScore" } };
	}

	try {
		const allListings = await Listing.find(
			filter,
			q ? { score: { $meta: "textScore" } } : {}
		).sort(sort);

		res.render("listings/index", {
			allListings,
			q: q || "", // Pass search query back to template
		});
	} catch (error) {
		console.error("Search error:", error);
		req.flash("error", "Something went wrong with the search");
		res.redirect("/listings");
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
	let url = req.file.path;
	let filename = req.file.filename;
	const newListing = new Listing(req.body.listing);
	newListing.owner = req.user._id;
	newListing.image = { url, filename };
	await newListing.save();
	req.flash("success", "New Listing Created!");
	res.redirect("/listings");
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
