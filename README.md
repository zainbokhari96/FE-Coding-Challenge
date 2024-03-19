# React + TypeScript + Vite

The Listing component is a reusable component designed to display tabular data with pagination functionality. It's commonly used to render lists of items, such as user profiles, products, or any other dataset that requires pagination.

## Installation

To use the Listing component in your project, follow these steps:

1. Install dependencies:
   ```bash
   npm install

2. Start the project by using this command:
   ```bash
   npm run dev

## Features
- Pagination: The listing component supports pagination, allowing users to navigate through multiple pages of data.

- Filters: Filters are available based on gender. These filters persist even when navigating away from the page.

- Search Functionality: The listing page includes a search feature to search for specific items in the list. The approach taken for implementing the search functionality is as follows:

When the user enters a search query, the component filters the list of items based on the name.
This filtering is performed on the server-side, ensuring a seamless user experience.

- Navigation to Public Profiles: From the listing, users can navigate to individual public profiles. Clicking on a profile item redirects the user to the corresponding profile page.

## Dependencies
- @mui/material: Material-UI library for building user interfaces in React applications.
- react-router-dom: React Router library for managing navigation and routing in React applications.

