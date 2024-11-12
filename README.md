This project is a React Native application built using a bare workflow. Currently, it is configured to run on Android devices only. This README provides setup instructions, prerequisites, and build steps to help you run the app on your local development environment.
# Mobile Developer Task


## Table of Contents
   Prerequisites
   Installation
   Running the App
   Building the App
   Project Structure
   Contributing
   License

## Prerequisites
   Before you begin, ensure you have met the following requirements:
   
   Node.js (version >= 14.x.x recommended)
   Yarn or npm
   Android Studio (with Android SDK configured)
   React Native CLI installed globally (npm install -g react-native-cli)
   
## Installation

```bash
git clone https://github.com/SammyDOtJs/GDG-Social.git
```

```bash
# If using npm
npm install

# Or if using Yarn
yarn install
```

## Running the App
## On Android (Using Emulator or Physical Device)
Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

1. Start an Android emulator using Android Studio or connect a physical Android device with USB debugging enabled.
2. Run the following command to start the development server:
   ```bash
   npx react-native start
   ```
3. In another terminal, build and run the app on the connected Android device/emulator:
   ```bash
   npx react-native run-android
   ```
### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.
