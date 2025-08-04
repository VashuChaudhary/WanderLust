# WanderLust 🌍
> Your Ultimate Travel Stay Companion - Discover, Book, and Experience Unique Stays Worldwide

## What is WanderLust?
WanderLust is a modern web application that connects travelers with unique accommodations worldwide. Inspired by platforms like Airbnb, it provides a seamless platform for users to discover, list, and book diverse stays - from cozy rooms to luxurious villas, from mountain retreats to beachfront properties.

## Key Features
- **User Authentication** 
  - Secure signup/login system
  - Protected routes for authenticated users
  - User-specific content management

- **Property Listings**
  - Create, view, edit, and delete property listings
  - Rich property details including title, description, location, and pricing
  - Image upload capability with cloud storage
  - Categorized listings (Rooms, Mountains, Castles, etc.)

- **Search & Filters**
  - Advanced search functionality
  - Category-based filtering (Iconic Cities, Amazing Pools, Camping, etc.)
  - Dynamic filter interface
  - Trending listings sorting

- **Reviews & Ratings**
  - User review system
  - Star-based rating system
  - Review management (add/delete)
  - Author verification

## How It Works
1. **For Travelers**
   - Browse available listings
   - Filter by categories or search specific locations
   - View detailed property information
   - Book stays
   - Leave reviews and ratings

2. **For Property Owners**
   - Create new property listings
   - Upload property images
   - Manage listing details
   - Track reviews and ratings

## Tech Stack
- **Frontend**
  - EJS (Embedded JavaScript templates)
  - Bootstrap 5
  - CSS3
  - JavaScript
  - Font Awesome Icons

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose ODM

- **Authentication & Security**
  - Passport.js
  - Express-session
  - Connect-flash

- **Cloud Services**
  - Cloudinary (Image storage)
  - MongoDB Atlas

## Application Navigation
- **Home Page** (`/listings`)
  - Browse all listings
  - Filter by categories
  - Search functionality

- **User Routes**
  - Signup (`/signup`)
  - Login (`/login`)
  - Logout (`/logout`)

- **Listing Routes**
  - View All Listings (`/listings`)
  - Create New Listing (`/listings/new`)
  - View Single Listing (`/listings/:id`)
  - Edit Listing (`/listings/:id/edit`)
  - Delete Listing (`/listings/:id`)

- **Review Routes**
  - Add Review (`/listings/:id/reviews`)
  - Delete Review (`/listings/:id/reviews/:reviewId`)
