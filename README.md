# Up Course App (React Native)

Up Course is a mobile learning platform built with React Native (Expo).
It allows users to explore programming courses, watch video lessons directly from YouTube, and track their learning progress using Firestore as the backend.
The project focuses on scalability, performance, and code readability suitable for beginner and intermediate developers.

---

## Overview

This application is a React Native version of the original web-based Up Course app.
It replicates and enhances the existing features with a mobile-first experience and integrates YouTube API for real-time video content along with Firebase for persistent data storage.

---

## Tech Stack

| Category         | Technology                                   |
| ---------------- | -------------------------------------------- |
| Framework        | React Native (Expo)                          |
| Navigation       | React Navigation – Drawer & Stack Navigation |
| Backend          | Firebase Firestore                           |
| API Integration  | YouTube Data API v3                          |
| Styling          | NativeWind and React Native Paper (planned)  |
| State Management | React Context API (future: Redux )           |
| Language         | JavaScript (ESNext)                          |

---

## Features (Phase 1)

- Course listing: browse all available programming courses
- Search: find a course by name or topic
- Course details: fetch and display lessons from the YouTube API
- Favorites: save and manage favorite courses
- User authentication (planned): Firebase authentication
- Responsive UI for Android and iOS
- Firestore integration for storing user data and progress

---

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abdulrhman-Rabea/Up-Course-React-Native-version-.git
cd Up-Course-React-Native-version
```

### 2. Install Dependencies

````bash
npm install


### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your keys:
```bash
YOUTUBE_API_KEY=your_youtube_api_key
FIREBASE_API_KEY=your_firebase_api_key
````

### 4. Run the Application

```bash
npx expo start
```

Then scan the QR code using the Expo Go app on your device.

---

## API and Backend Setup

### YouTube API

1. Visit Google Cloud Console
2. Enable YouTube Data API v3
3. Generate an API key and add it to your `.env` file

### Firebase Firestore

1. Go to Firebase Console
2. Create a new project
3. Enable Firestore Database and Authentication
4. Add your Firebase configuration in `/services/firebase.js`

---

## Future Enhancements

- Firebase Authentication (Google or Email sign-in)
- Dark mode support

---

## Development Standards

- Clean, maintainable, and well-documented code
- Reusable UI components and modular services
- Scalable navigation structure (Drawer → Stack → Tabs )
- Responsive design for multiple device sizes
- Consistent naming conventions and folder organization

---

## License

This project is open source and available under the MIT License.
