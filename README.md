# TPG-Demo React Native

This app interacts with The Cat API, enabling users to perform CRUD operations (Create, Read, Update, Delete) on cat images.

Features:
Fetch Random Images – Users can browse random cat images from The Cat API.
Upload Images – Users can upload their own cat images to their account, linked with an API key.
Delete Images – Users can remove uploaded images from their account.
Update Uploads List – Users can refresh and manage their uploaded images.

the app has two sections uploads section and public gallery section for the user to navigate.

## Get started

### Clone the Repository

```bash
git clone <repo-link>
cd tpgdemo
```

### Add API Key

1. Get your api key from https://thecatapi.com/
2. Open the project in vscode.
3. Create .env file in the root.
4. Add your API key:

```bash
CATS_API_KEY=your_api_key_here
```

Install dependencies

```bash
npm install
```

Start the app

```bash
 npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Design Decisions

### Modern Redux with Redux Toolkit and RTK Query

- Simplifies API calls with auto-generated hooks.
- Built-in Caching: Reduces unnecessary network requests and improves performance.
- Auto Refetching: Keeps data fresh with background updates.
- Less Boilerplate: `createSlice` simplifies reducers and actions.
- Better Performance: Optimized state updates reduce re-renders.
