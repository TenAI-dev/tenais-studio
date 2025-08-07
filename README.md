# TenAI's Studio - Hackathon Platform



TenAI's Studio is a comprehensive mobile application designed to be the ultimate hub for the hackathon ecosystem. It connects participants, hackathon coordinators, and judges on a single, seamless platform. From discovering new events to managing teams and evaluating submissions, Studio empowers every role in the hackathon journey.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
  - [Environment Variables](#environment-variables)
  - [Client (Mobile App)](#client-mobile-app)
  - [Server (Backend)](#server-backend)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
  - [Client Scripts](#client-scripts)
  - [Server Scripts](#server-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Seamless Onboarding:** A beautiful and intuitive onboarding flow for new users.
- **Role-Based Experience:** Tailored user journeys for Participants, Hackathon Coordinators, and Judges.
- **Secure Authentication:** Robust user sign-up and sign-in functionality powered by Supabase, including OTP email verification.
- **Intuitive Navigation:** A clean, tab-based navigation system built with Expo Router.
- **Profile Management:** Users can view and edit their profiles, manage linked accounts, and customize notification settings.
- **Hackathon Discovery:** Browse and search for ongoing and upcoming hackathons.
- **Team Management:** Create, view, and manage teams for hackathon participation.
- **Voice-Enabled Search:** Integrated voice search for a modern, accessible user experience.

---

## Tech Stack

### Client (Frontend)

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **UI & Styling:** React Native core components, `react-native-linear-gradient`
- **State Management:** React Context API & Hooks
- **Backend Communication:** [Supabase Client](https://supabase.com/docs/library/js/getting-started), [Axios](https://axios-http.com/)
- **Icons:** `@expo/vector-icons`

### Server (Backend)

- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [Node.js](https://nodejs.org/)
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Middleware:** [CORS](https://expressjs.com/en/resources/middleware/cors.html), [dotenv](https://www.npmjs.com/package/dotenv)

---

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/download/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- A mobile device with the Expo Go app or an Android/iOS emulator.

---

## Setup & Installation

### Environment Variables

This project uses environment variables for sensitive information like API keys.

1.  **Create a Supabase Project:** Go to [Supabase](https://supabase.com) and create a new project. Find your API URL and `anon` key in the API settings.

2.  **Client Setup:** In the root directory of the client, create a file named `.env`. Copy the contents of `.env.example` (if it exists) or add the following:

    ```env
    EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
    EXPO_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

3.  **Server Setup:** In the `server` directory, create a file named `.env` and add the following variables. You will need your Supabase `service_role` key for server-side operations.

    ```env
    PORT=3001
    SUPABASE_URL="YOUR_SUPABASE_URL"
    SUPABASE_SERVICE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    ```

### Client (Mobile App)

Follow these steps in the root directory of the project:

```bash
# 1. Navigate to the client directory (if your server is in a subfolder)
# cd client

# 2. Install dependencies
npm install

# or
yarn install
```

### Server (Backend)

Follow these steps in the `server` directory:

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# or
yarn install
```

---

## Running the Application

You need to run both the client and server applications in separate terminal windows.

1.  **Start the Server:**
    ```bash
    # Navigate to the server directory
    cd server

    # Start the development server with hot-reloading
    npm run dev
    ```
    The server will typically start on `http://localhost:3001`.

2.  **Start the Client:**
    ```bash
    # Navigate to the client's root directory
    # cd .. (if you were in the server directory)

    # Start the Expo development server
    npm start
    ```
    This will open the Expo developer tools in your browser. You can then scan the QR code with the Expo Go app on your phone or run the app on an emulator.

---

## Available Scripts

### Client Scripts

| Script              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `npm start`         | Starts the Expo development server.                   |
| `npm run android`   | Runs the app on a connected Android device/emulator.  |
| `npm run ios`       | Runs the app on a connected iOS device/simulator.     |
| `npm run web`       | Runs the app in a web browser.                        |
| `npm run lint`      | Lints the project files using ESLint.                 |
| `npm run reset-project` | Resets the project cache and dependencies.        |

### Server Scripts

| Script          | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm start`     | Starts the server in production mode.             |
| `npm run dev`   | Starts the server in development mode with `nodemon`. |
| `npm test`      | (Not implemented) Placeholder for running tests.  |

---

## Project Structure

The project is organized into a client (frontend) and a server (backend).

```
tenai_v1/
├── app/                  # Expo Router file-based routing directory
│   ├── (auth)/           # Screens related to authentication
│   ├── (tabs)/           # Screens inside the main tab navigator
│   ├── _layout.tsx       # Root layout for the entire app
│   └── ...
├── assets/               # Static assets like images and fonts
├── components/           # Reusable React components
├── constants/            # Global constants (Colors, etc.)
├── context/              # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations (e.g., Supabase client)
├── server/               # Node.js backend application
│   ├── src/
│   │   └── server.js     # Main Express server file
│   ├── .env              # Server environment variables (ignored by Git)
│   └── package.json      # Server dependencies
├── .env                  # Client environment variables (ignored by Git)
├── .gitignore            # Git ignore file
├── package.json          # Client dependencies
└── README.md             # You are here!
```

---

## Contributing

Contributions are welcome! If you have suggestions for improving the app, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## License

The server is licensed under the ISC License. The client application is private and proprietary.
