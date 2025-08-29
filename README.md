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

- **Certificate Link**

  - https://www.apnacollege.in/certificate_v2/659e5afc7fa67ec97205fc76/user/64e242207114ea79cd080826

## How to Set Up Locally

Follow these steps to run WanderLust on your local machine:

1. **Clone the repository**

   ```powershell
   git clone https://github.com/VashuChaudhary/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory.
   - Add the following variables (replace with your own credentials):
     ```env
     ATLAS_DB=your_mongodb_atlas_connection_string
     CLOUD_NAME=your_cloudinary_cloud_name
     CLOUD_API_KEY=your_cloudinary_api_key
     CLOUD_API_SECRET=your_cloudinary_api_secret
     SECRET=your_session_secret
     ```

4. **(Optional) Seed the database with sample data**

   ```powershell
   node ./init/index.js
   ```

5. **Start the application**

   ```powershell
   npm start
   ```

   The app will run on [http://localhost:8080](http://localhost:8080)

6. **Access the app**
   - Open your browser and go to `http://localhost:8080/listings`
