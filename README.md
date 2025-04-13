# 🌍 WorldWise

**WorldWise** is a React-based web application that allows users to track cities they've visited or plan to visit, leveraging geolocation, dynamic routing, and state management for an interactive and responsive experience.

---

## 🚀 Features

- **Interactive Map** powered by Leaflet with geolocation support.
- **City and Country Management**: Add cities, view details, group by countries with emoji flags.
- **User Authentication** (simulated) with login protection for routes.
- **Responsive Design** for all screen sizes.
- **URL-Based Navigation**: Deep linking to map locations via query params.

---

## 🛠️ Technologies Used

### 📦 React Core

- **React 18**: Functional components and hooks-driven architecture.
- **React Router v6**: Nested routing, route guards, and dynamic segments.
- **React Context API**: Global state for cities and auth, injected via providers.
- **React Hooks**: Usage of `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, and `useCallback`.
- **React.memo**: Optimized component re-renders.

### 🗺️ Map & Geo Tools

- **React Leaflet**: Map rendering and event handling.
- **Geolocation API**: Fetches user position to center the map.
- **URL Query Parsing**: `useSearchParams` and custom `useUrlPosition` hook to read lat/lng from the URL.

### 🧠 State Management

- **Cities Context**:
  - Uses `useReducer` to manage city-related actions (add, delete, load).
  - Provides a shared store across components.
- **Auth Context**:
  - Fake authentication using a simple state-based simulation.
  - Protects app routes via conditional logic and redirects.

### 🧩 Custom Hooks

- `useGeolocation`: Accesses and manages the user's current geolocation with loading and fallback handling.
- `useUrlPosition`: Parses coordinates from the URL for map positioning.
- `useNavigate` + `useSearchParams`: Enables navigation with query strings.

---

## 🔄 Rendering & Performance Strategy

- **Component Memoization**: Key components use `React.memo` and stable props to prevent unnecessary renders.
- **Props Optimization**: Functions and objects passed via `useCallback` and `useMemo` to retain referential equality.
- **Lazy Loading (optional)**: Large page components and maps can be code-split with `React.lazy` and `Suspense` if needed for performance scaling.
