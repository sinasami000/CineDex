# 🎬 CineDex

A comprehensive index for movies and series. Discover, explore details, and stay updated on trending titles in one place.

## ✨ Features

CineDex is built to be your go-to source for all things on-screen, offering a fast, clean, and interactive user experience.

* **📺 Dual Content Categories:** Seamlessly browse both **Trending** and **Popular** lists for both Movies and Series.
* **🔍 Instant Search:** Find any movie or series with an instant, dynamic search feature powered by the TMDB API.
* **➕ Load More / Show More:** Smooth, client-side pagination on the Home screen allows you to load additional content without page reloads.
* **⭐ Detailed Info Cards:** View essential information like title, release date, genre, and audience rating at a glance.
* **💾 Stored Favorites (Coming Soon):** Future support for bookmarking favorite movies/series.

***

## 🚀 Tech Stack

CineDex is a modern web application built with a focus on speed and component-driven architecture.

* **Frontend Framework:** **React** (with Hooks: `useState`, `useEffect`, `useNavigate`).
* **Routing:** **React Router DOM** for declarative navigation.
* **Styling:** **Tailwind CSS** for rapid and utility-first styling.
* **Data Fetching:** **Axios** (or native `fetch`) for API requests.
* **API:** **The Movie Database (TMDB)** for comprehensive movie and series data.

***

## ⚙️ Setup and Installation

Follow these steps to get a local copy of CineDex up and running for development and testing.

### Prerequisites

You need **Node.js** and **npm** (or yarn) installed on your system.

### Steps

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository URL]
    cd cinedex
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables:**
    Create a file named `.env` in the root directory. You must sign up for a free TMDB API key and add it here.
    ```
    # Example .env file content
    REACT_APP_TMDB_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the Application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application should open in your browser at `http://localhost:3000`.

***

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

***

## ©️ License

Distributed under the MIT License. See `LICENSE` for more information.

***

**Project Link:** [Your Live Demo URL (e.g., cinedex.vercel.app)]