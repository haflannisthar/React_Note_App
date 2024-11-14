# Note App with User Authentication

This project is a simple note-taking application built using **React**, **Redux Toolkit**, **Firebase Authentication**, and **Firestore**. It allows users to register, log in, add, view, and delete notes. The application is fully responsive, built with **Tailwind CSS** and **Material Tailwind** for the UI components.

## Features

- **User Registration & Login**: Firebase Authentication is used for managing user authentication.
- **Note Management**: Users can add, view, and delete notes.
- **Firestore Database**: Notes are stored in Firebase Firestore for persistence.
- **Reusable Form Components**: Common form components are used for both registration and login, improving code maintainability.
- **Responsive Design**: The app is fully responsive and mobile-friendly, using Tailwind CSS for styling.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: Used for state management.
- **Firebase Authentication**: Handles user registration, login, and authentication.
- **Firebase Firestore**: A NoSQL cloud database for storing notes.
- **Tailwind CSS**: A utility-first CSS framework for designing responsive and custom UIs.
- **Material Tailwind**: Material Design components for React integrated with Tailwind CSS.
- **Lottie**: For animation in the background.

## Notes

- The app uses **useContext** for global state management to provide a central store for data across the app. 
- **Redux Toolkit** is used to manage note-related actions like fetching, adding, and deleting notes from the Firestore database. It simplifies state management and ensures a smooth user experience.
- The form components used for **registration** and **login** are reusable. These components are defined in a common function to avoid repetition of code.
- The app is **fully responsive**, designed to work across multiple devices (mobile, tablet, desktop) with the help of **Tailwind CSS**.
- Background animations are implemented using **Lottie**, providing a dynamic and visually appealing experience for users.

## Future Enhancements

- **Note Update Feature**: Currently, users can **add**, **delete**, and **view** notes. The next step is to implement an update feature, which will allow users to **edit** their existing notes.
- **User Profile Page**: Users will be able to view and update their personal profile information, enhancing user interaction and customization.

## Acknowledgements

- **[Firebase](https://firebase.google.com/)**: A powerful platform that provides authentication, Firestore database, and other essential services.
- **[React](https://reactjs.org/)**: A JavaScript library for building interactive UIs, used for creating the front-end of the app.
- **[Redux Toolkit](https://redux-toolkit.js.org/)**: A set of tools that simplifies state management in React applications, making it easier to work with the Redux store.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework used for building responsive and custom UIs with minimal effort.
- **[Material Tailwind](https://www.material-tailwind.com/)**: A set of pre-designed Material Design components integrated with Tailwind CSS, used for UI components like buttons, forms, and typography.
- **[Lottie](https://lottiefiles.com/)**: A library used for rendering lightweight animations on the web, enhancing the app’s visual experience.


