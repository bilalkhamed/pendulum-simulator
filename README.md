# Pendulum Simulator

## Overview
This project is a **Pendulum Simulator** built using HTML, CSS, and JavaScript. It simulates the motion of a simple pendulum and allows users to interactively modify the physical parameters of the pendulum. The simulation includes real-time calculations of various physical properties, such as restoring force, acceleration, period, and frequency.

Note: This project was developed entierly using ChatGPT except minor edits on the styling. 

## Features
- **Real-time calculations**: Displays restoring force, acceleration, period, frequency, angle, and time.
- **Interactive controls**: Users can change the mass of the pendulum bob, the length of the string, and the maximum angle of oscillation.
- **Aesthetic options**: Customize the color of the bob, enable a glow effect, and more.
- **Modern UI**: A clean, minimalist design with physics vibes and smooth animations.
- **Markers**: The simulation includes visual markers indicating the vertical center and the extreme positions of the pendulum.

## Setup Instructions
To use the Pendulum Simulator, follow the instructions below:

1. Clone this repository or download the HTML file to your local machine.

2. Open the `index.html` file in any modern web browser (e.g., Google Chrome, Firefox, Safari).

3. The simulation will load automatically, and you'll be able to interact with it by adjusting the sliders and toggles.

## Controls
- **Mass**: Use the slider to change the mass of the pendulum bob (range: 1-20 kg).
- **Length**: Adjust the length of the pendulum string (range: 0.5-5 meters).
- **Max Angle**: Set the maximum angle of the pendulum's oscillation (range: 1-15 degrees).
- **Bob Color**: Pick a color for the pendulum bob.
- **Glow Effect**: Enable or disable the glow effect on the pendulum bob.

## Physics Behind the Simulation
The pendulum's motion is governed by the following equations:
- **Period (T)**: `T = 2 * π * √(L / g)`, where `L` is the length of the string, and `g` is the acceleration due to gravity (approximately 9.81 m/s²).
- **Frequency (f)**: `f = 1 / T`.
- **Restoring Force (Frestoring)**: `Frestoring = -m * g * sin(θ)`, where `m` is the mass of the bob, `g` is the gravitational acceleration, and `θ` is the angular displacement.

The pendulum is modeled as a simple harmonic oscillator for small angles (less than 15 degrees), and the simulation calculates the position and force of the pendulum in real-time.

## Libraries Used
- **Google Fonts**: For the custom font (`Roboto Mono`).
- **JavaScript (Vanilla)**: No external JavaScript libraries are required for the functionality.
- **CSS**: Custom styles with a blend of **glassmorphism** and **neon** aesthetics.

## Contribution
Feel free to fork this repository and make improvements. You can:
- Add more features (e.g., damping, air resistance).
- Implement additional graphs (e.g., energy conservation or angular displacement vs. time).
- Improve the UI/UX.
- Fix bugs or provide suggestions.

## License
This project is open source and free to use. You can modify it for educational, personal, or commercial use.

---

**Enjoy simulating your own pendulum!**
