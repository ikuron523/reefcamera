# Reef Camera 🐠

**Reef Camera** is a beautiful 3D browser application built with [Babylon.js](https://www.babylonjs.com/) that lets you relax and watch a vibrant underwater world filled with fishes, corals, and shells. 

This is a purely observational experience—there are no complex user interactions or controls. Just sit back, toggle the background music (BGM) on or off, and enjoy the view!

## github pages

You can view it on [github pages](https://ikuron523.github.io/reefcamera/) with your web browser. When you first open it, it may take some time to load the 3D models. The page is designed to be viewed on a large screen with a powerful CPU and GPU, such as latest desktop computers. Please be patient while it loads.

## Features
- **Relaxing 3D Environment:** A fully rendered underwater scene powered by Babylon.js.
- **Automated Camera:** The camera slowly pans and bobs through the water automatically, giving you a dynamic and cinematic view of the marine life.
- **Zero Controls Needed:** The only user interaction available (and needed) is a single button to toggle the relaxing background music.

## Assets & 3D Models

All 3D modeling data for the fishes, shells, and corals are free assets downloaded from generous creators on Sketchfab and other open repositories.

For a complete list of 3D models, their original authors, and specific license conditions, please refer to the [CREDITS.md](CREDITS.md) file.

## License

- **Source Code:** The program source code for this project is open source and released under the [MIT License](LICENSE).
- **BGM (`reef_camera_bgm.mp3`):** The background music is an original track by the author and is dedicated to the Public Domain under **CC0 1.0**.
- **3D Models:** See [CREDITS.md](CREDITS.md) for individual third-party model licenses (e.g., CC-BY-4.0, CC0).

## Running Locally

To run the project locally on your machine:

1. Install the necessary dependencies:
   ```bash
   npm install
   ```
2. Start the development server using Vite:
   ```bash
   npm run dev
   ```
3. Open your browser to the local URL provided in the terminal (usually `http://localhost:5173/`).
