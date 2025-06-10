# ✈️ Aircraft Scheduling

A modern web application for managing aircraft rotations and flight assignments, built with **React**, **Zustand**, **Tailwind CSS**, **Vite**, and **TypeScript**.

---


## 🌐 Live Demo

You can access the live version of the app here:  
👉 https://fredrico-berchof-aircraft-scheduling.netlify.app/

Note: This version is for demonstration purposes and is based on the current submitted code.

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

- `src/components/` – UI components.
- `src/hooks/` – Custom React hooks for state, actions, and logic.
- `src/utils/` – Business rules and utility functions.
- `src/pages/` – Main application entry point.
- `src/styles/` – Tailwind and global styles.
- `src/types/` – TypeScript type definitions.
- `src/services/` – API abstraction layer.
- `src/tests/` – Unit and integration test files.

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

---

## 📌 Considerations and Trade-offs

During the development of this challenge, I focused on:

- Implementing the core **business rules** clearly and reliably.
- Creating a **clean and user-friendly UI** using Tailwind.
- Ensuring **persistent state** using Zustand and localStorage.
- Providing **helpful user feedback** via snackbars for rule enforcement.

### Areas for Improvement (if given more time):

- 🔄 **Responsiveness**: The layout is currently optimized for desktop. I would improve mobile/tablet responsiveness in a future iteration.
- 🧩 **Drag and Drop**: I would enhance usability by implementing drag-and-drop for managing flight assignments.
- 🧪 **More Test Coverage**: I included tests for some components, hooks, and business logic to demonstrate test strategy, but would aim for full test coverage in a production scenario.

These trade-offs were made to prioritize clarity, correctness, and core feature completeness within the time constraints.

---







