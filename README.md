# ✈️ Aircraft Scheduling

A modern web application for managing aircraft rotations and flight assignments, built with **React**, **Zustand**, **Tailwind CSS**, **Vite**, and **TypeScript**.

---

## 📌 Overview

Aircraft Scheduling allows users to:

- View and search available aircraft and flights.
- Assign flights to aircraft, building daily rotations.
- Visualize aircraft utilization and timelines.
- Enforce business rules (e.g., no flights after midnight, minimum turnaround time, no teleportation).
- Persist state across sessions.

---

## 🚀 Tech Stack & Why

- **React** – Component-based UI for maintainability and scalability.
- **Zustand** – Simple, scalable global state management with persistence.
- **Tailwind CSS** – Utility-first CSS for rapid, consistent, and responsive design.
- **Vite** – Lightning-fast development server and build tool.
- **TypeScript** – Type safety for fewer bugs and better developer experience.
- **Jest & React Testing Library** – Reliable unit and integration testing.
- **date-fns** – Modern, lightweight date utilities.

---

## ⚙️ Business Rules

- ✈️ All aircraft must be on the ground by **midnight**.
- ⏱️ Minimum **turnaround time** between flights is **20 minutes**.
- 📍 Aircraft cannot **teleport** — next flight must start where the last one ended.

---

## 🖥️ Features

- **Aircraft List** – Search and select aircraft, view utilization.
- **Flight List** – Search and add flights to the selected aircraft's rotation.
- **Rotation Timeline** – Visualize scheduled, idle, and turnaround periods.
- **Rotation List** – View and remove flights from the rotation.
- **Date Navigation** – Switch between days to manage daily rotations.
- **Snackbar Notifications** – User feedback for actions and rule violations.
- **Persistent State** – Rotations and selections are saved across sessions.

---

## 📁 Project Structure

- **src/components/** – All UI components (aircraft list, flight list, timeline, etc.)
- **src/hooks/** – Custom React hooks for state, actions, and data fetching.
- **src/utils/** – Business logic, validation, and utility functions.
- **src/pages/** – Main application page.
- **src/styles/** – Tailwind and global CSS.
- **src/types/** – TypeScript type definitions.
- **src/services/** – API abstraction layer.
- **src/tests/** – Unit and integration tests.

---

## 🧪 Testing

- **Jest** and **React Testing Library** are used for unit and integration tests.
- Business logic, some hooks, and some UI components are covered by tests.

## 🛠️ Getting Started

1. Clone the repository:

```bash
git clone https://github.com/fredericoberchof/aircraft-scheduling.git

cd aircraft-scheduling
```

2. Install dependencies

```bash
npm install
```

3. Start the development server
   
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser.

5. Run tests

```bash
npm test
```



