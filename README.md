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
  - Delete notes (with confirmation modal)
  - Search notes by title
  - Optimistic UI updates for instant feedback
  - Pull-to-refresh functionality

- **Security**

  - Row Level Security (RLS) policies ensure users can only access their own notes
  - Secure authentication via Supabase Auth
  - Server-side session validation on app startup

- **UI Components**
  - Reusable UI kit (Button, Input, LinkButton, etc.)
  - SVG icon support throughout the app
  - Custom theme system
  - Keyboard-aware containers
  - Confirmation modals for destructive actions

## 🛠 Tech Stack

- **React Native** (0.83.1)
- **Supabase** (Authentication + Database)
- **React Navigation** (Native Stack Navigator)
- **TanStack React Query** (Data fetching and state management)
- **TypeScript**
- **Zod** (Schema validation)
- **React Native SVG** (SVG icon support)
- **AsyncStorage** (for session persistence)

## 📋 Prerequisites

- Node.js >= 20
- Yarn package manager
- Android Studio (for Android development)
- Supabase account (free tier works)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/GorArestakesyan/Notes-App.git
cd Notes-App
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Create a new project at [supabase.com](https://supabase.com)
3. Go to **Settings** → **API** and copy:

   - Project URL
   - Anon (public) key

4. Update `.env` with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

In your Supabase dashboard, go to **SQL Editor** and run the migration scripts in order:

1. `supabase/migrations/001_create_notes_table.sql` - Creates the notes table
2. `supabase/migrations/002_fix_rls_policies.sql` - Fixes RLS policies
3. `supabase/migrations/003_auto_set_user_id.sql` - Sets up automatic user_id assignment
4. `supabase/migrations/003_fix_insert_policy.sql` - Fixes insert policy

These migrations will:

- Create the `notes` table with required fields
- Set up Row Level Security (RLS) policies
- Create indexes for performance
- Set up automatic `updated_at` timestamp updates
- Configure automatic `user_id` assignment on insert

### 5. Run the App

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
# Using npm script
yarn android:apkDebug

# Or manually
cd android
./gradlew assembleDebug
```

The APK will be located at: `android/app/build/outputs/apk/debug/app-debug.apk`

To generate a release APK (requires signing configuration):

```bash
# Using npm script
yarn android:apkRelease

# Or manually
cd android
./gradlew assembleRelease
```

## 📊 Supabase Schema

### Notes Table

| Column     | Type                     | Description                  |
| ---------- | ------------------------ | ---------------------------- |
| id         | UUID                     | Primary key (auto-generated) |
| title      | TEXT                     | Note title (required)        |
| content    | TEXT                     | Note content                 |
| user_id    | UUID                     | Foreign key to auth.users    |
| created_at | TIMESTAMP WITH TIME ZONE | Creation timestamp           |
| updated_at | TIMESTAMP WITH TIME ZONE | Last update timestamp        |

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
Notes-App/
├── src/
│   ├── assets/
│   │   ├── images/              # Image assets
│   │   └── svg/                 # SVG icons
│   ├── config/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── constants/
│   │   ├── routes.ts            # Navigation routes
│   │   └── theme.ts             # App theme configuration
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context provider
│   ├── hooks/
│   │   ├── auth/                # Authentication-related hooks
│   │   └── notes/               # Notes-related hooks
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Navigation setup
│   ├── schemas/
│   │   ├── auth.ts              # Authentication schemas (Zod)
│   │   └── note.ts              # Note validation schemas (Zod)
│   ├── screens/
│   │   └── [ScreenName]/        # Screen components (each with .tsx, .styles.ts, index.ts)
│   ├── services/
│   │   ├── authService.ts       # Authentication service
│   │   └── notesService.ts      # Notes CRUD service
│   ├── types/
│   │   ├── index.ts             # TypeScript type definitions
│   │   ├── notes.ts             # Note-related types
│   │   └── env.d.ts             # Environment variable types
│   ├── ui-kit/                  # Reusable UI components (Button, Input, LinkButton, etc.)
│   │   └── utils/               # UI utility functions (icon rendering, etc.)
│   ├── ui-modules/              # Feature-specific UI components (NoteCard, ProfileAvatar, etc.)
│   └── utils/
│       └── formatDate.ts        # Date formatting utility
├── supabase/
│   └── migrations/              # Database migration SQL files
├── android/                     # Android native code
├── ios/                         # iOS native code
├── App.tsx                      # Root component
├── .env.example                 # Environment variables template
└── package.json
```

## 🎯 Key Implementation Details

### State Management

The app uses **TanStack React Query** for server state management:

- Automatic caching and background refetching
- Optimistic updates for better UX
- Query invalidation on mutations
- Loading and error states handled automatically

### Session Persistence

The app uses Supabase's built-in session persistence with AsyncStorage. When a user logs in, the session is stored locally and automatically restored on app restart. The app also validates sessions server-side on startup to ensure security.

### Search Functionality

The search feature filters notes client-side by title. The search is case-insensitive and updates in real-time as the user types.

### Form Validation

Uses **Zod** for schema validation:

- Type-safe validation schemas
- Client-side validation before API calls
- Clear error messages for users

### Icon Support

The app supports SVG icons throughout:

- Custom SVG icons in `src/assets/svg/`
- Icon support in `Button`, `Input`, and `LinkButton` components
- Centralized icon rendering utility for consistency

### Error Handling

- Form validation on client side using Zod
- Error alerts for failed operations
- Loading states during async operations
- Optimistic UI updates with rollback on errors

### UI/UX

- Clean, modern interface with custom theme
- Reusable UI kit components
- Proper spacing and typography
- Loading indicators
- Pull-to-refresh on notes list
- Floating action button for creating notes
- Keyboard-aware scrolling with reusable container
- Confirmation modals for destructive actions
- Empty states for better UX

## 🚨 Important Notes

1. **Environment Variables**: Make sure to create a `.env` file with your Supabase credentials before running the app. Use `.env.example` as a template.

2. **Database Setup**: All migration scripts must be run in Supabase SQL Editor in the correct order before the app can function properly.

3. **Android Build**: The app is configured for Android builds. The debug keystore is included for testing purposes. Requires Java 17-20 (JDK 25 is not supported).

4. **Security**: Row Level Security (RLS) is enabled and properly configured to ensure users can only access their own notes. Sessions are validated server-side on app startup.

5. **SVG Icons**: SVG files should be placed in `src/assets/svg/` and imported directly as React components thanks to `react-native-svg-transformer`.

## 📝 Assumptions & Trade-offs

1. **Search Implementation**: Chose client-side search (Option B) as it's simpler and sufficient for the assignment requirements. For production with large datasets, server-side search would be recommended.

2. **Offline Handling**: Basic error handling is in place, but full offline support with local caching was not implemented as search was chosen instead.

3. **UI Framework**: Built a custom UI kit with reusable components (`Button`, `Input`, `LinkButton`, etc.) for consistency. No external UI libraries were used to keep dependencies minimal.

4. **State Management**: Used React Context API for authentication state and TanStack React Query for server state management. This provides a good balance between simplicity and functionality.

5. **Type Safety**: Full TypeScript implementation with Zod schemas for runtime validation, ensuring better code quality and developer experience.

6. **Code Organization**: Separated concerns with hooks, services, UI components, and utilities. This makes the codebase maintainable and scalable.

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
