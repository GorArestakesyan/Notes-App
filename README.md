# Notes App - React Native + Supabase

A simple Notes application built with React Native and Supabase, demonstrating authentication, secure CRUD operations, and basic UI/state management.

## 🚀 Features

- **Authentication**
  - Sign up with email and password
  - Sign in
  - Sign out
  - Session persistence (users stay logged in after app restart)

- **Notes Management (CRUD)**
  - Create notes
  - View list of notes
  - Edit notes
  - Delete notes
  - Search notes by title

- **Security**
  - Row Level Security (RLS) policies ensure users can only access their own notes
  - Secure authentication via Supabase Auth

## 🛠 Tech Stack

- **React Native** (0.83.1)
- **Supabase** (Authentication + Database)
- **React Navigation** (Native Stack Navigator)
- **TypeScript**
- **AsyncStorage** (for session persistence)

## 📋 Prerequisites

- Node.js >= 20
- Yarn package manager
- Android Studio (for Android development)
- Supabase account (free tier works)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Notes
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** and copy:
   - Project URL
   - Anon (public) key

3. Update `src/config/supabase.ts` with your credentials:

```typescript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

4. In your Supabase dashboard, go to **SQL Editor** and run the migration script from `supabase/migrations/001_create_notes_table.sql`

   This will:
   - Create the `notes` table with required fields
   - Set up Row Level Security (RLS) policies
   - Create indexes for performance
   - Set up automatic `updated_at` timestamp updates

### 4. Run the App

#### Android

```bash
# Start Metro bundler
yarn start

# In a new terminal, run Android app
yarn android
```

#### Build APK

To generate a debug APK:

```bash
cd android
./gradlew assembleDebug
```

The APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

To generate a release APK (requires signing configuration):

```bash
cd android
./gradlew assembleRelease
```

## 📊 Supabase Schema

### Notes Table

| Column      | Type                        | Description                    |
|-------------|-----------------------------|--------------------------------|
| id          | UUID                        | Primary key (auto-generated)   |
| title       | TEXT                        | Note title (required)          |
| content     | TEXT                        | Note content                   |
| user_id     | UUID                        | Foreign key to auth.users      |
| created_at  | TIMESTAMP WITH TIME ZONE    | Creation timestamp             |
| updated_at  | TIMESTAMP WITH TIME ZONE    | Last update timestamp          |

### Row Level Security (RLS) Policies

The following policies ensure users can only access their own notes:

1. **SELECT**: Users can only view their own notes
2. **INSERT**: Users can only create notes for themselves
3. **UPDATE**: Users can only update their own notes
4. **DELETE**: Users can only delete their own notes

All policies use `auth.uid() = user_id` to enforce user isolation.

## 🔐 Authentication Approach

- **Storage**: Uses `@react-native-async-storage/async-storage` for session persistence
- **Session Management**: Supabase client automatically handles token refresh and session persistence
- **Context API**: Custom `AuthContext` provides authentication state and methods throughout the app
- **Session Check**: On app launch, the app checks for an existing session and restores it if available

## 📱 Project Structure

```
Notes/
├── src/
│   ├── config/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context provider
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Navigation setup
│   ├── screens/
│   │   ├── LoginScreen.tsx      # Login screen
│   │   ├── SignUpScreen.tsx     # Sign up screen
│   │   ├── NotesListScreen.tsx  # Notes list with search
│   │   └── NoteDetailScreen.tsx # Create/Edit note screen
│   ├── services/
│   │   ├── authService.ts       # Authentication service
│   │   └── notesService.ts      # Notes CRUD service
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── supabase/
│   └── migrations/
│       └── 001_create_notes_table.sql  # Database migration
├── android/                     # Android native code
├── App.tsx                       # Root component
└── package.json
```

## 🎯 Key Implementation Details

### Session Persistence

The app uses Supabase's built-in session persistence with AsyncStorage. When a user logs in, the session is stored locally and automatically restored on app restart.

### Search Functionality

The search feature filters notes client-side by title. The search is case-insensitive and updates in real-time as the user types.

### Error Handling

- Form validation on client side
- Error alerts for failed operations
- Loading states during async operations

### UI/UX

- Clean, modern interface
- Proper spacing and typography
- Loading indicators
- Pull-to-refresh on notes list
- Floating action button for creating notes
- Keyboard-aware scrolling

## 🚨 Important Notes

1. **Supabase Configuration**: Make sure to update `src/config/supabase.ts` with your actual Supabase credentials before running the app.

2. **Database Setup**: The migration script must be run in Supabase SQL Editor before the app can function properly.

3. **Android Build**: The app is configured for Android builds. The debug keystore is included for testing purposes.

4. **Security**: Row Level Security (RLS) is enabled and properly configured to ensure users can only access their own notes.

## 📝 Assumptions & Trade-offs

1. **Search Implementation**: Chose client-side search (Option B) as it's simpler and sufficient for the assignment requirements. For production with large datasets, server-side search would be recommended.

2. **Offline Handling**: Basic error handling is in place, but full offline support with local caching was not implemented as search was chosen instead.

3. **UI Framework**: Used React Native's built-in components for simplicity. No external UI libraries were used to keep dependencies minimal.

4. **State Management**: Used React Context API and hooks for state management. For larger apps, Redux or Zustand might be more appropriate.

5. **Type Safety**: Full TypeScript implementation for better code quality and developer experience.

## 🧪 Testing

To test the app:

1. Sign up with a new email
2. Create a few notes
3. Test search functionality
4. Edit and delete notes
5. Log out and log back in (session should persist)
6. Close and reopen the app (should remain logged in)

## 📄 License

This project is created for a technical assignment.

## 👤 Author

Created as part of a React Native Developer technical assessment.
