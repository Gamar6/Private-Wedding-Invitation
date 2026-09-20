
# 💍 Private Wedding Invitation

<p align="center">
  <strong>A private, interactive, and immersive digital wedding invitation.</strong>
</p>

<p align="center">
  A personalized wedding experience designed to feel more than just an invitation.
</p>

<p align="center">
  <a href="https://github.com/Gamar6/Private-Wedding-Invitation">
    <img src="https://img.shields.io/badge/Project-Private%20Wedding%20Invitation-dfa09e?style=for-the-badge" alt="Project">
  </a>
  <img src="https://img.shields.io/badge/Vue.js-3-42b883?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

---

## 📖 About the Project

**Private Wedding Invitation** is a personalized digital wedding invitation built to deliver a more intimate and immersive experience for invited guests.

Instead of presenting a conventional static invitation, this project combines a private access flow, personalized guest information, and an interactive invitation experience powered by Mental Canvas.

The project is designed around a simple idea:

> An invitation should feel like opening a personal story, not just visiting a webpage.

This project is created for the wedding of **Fachry & Pappoy**.

---

## ✨ Features

### 🔐 Private Guest Access

- Guest-specific invitation passcodes.
- Static guest data managed through `guests.json`.
- Personalized guest identification.
- Separate access flow before viewing the invitation.

> **Note:** The passkey system is a client-side access gate, not a secure authentication backend. The guest data and passcodes should not be considered secret credentials.

### 💌 Privacy Notice

A dedicated privacy notice screen informs guests that the invitation is personal and encourages them not to redistribute or document its contents without permission.

### 📖 Interactive Storybook Experience

The invitation is designed around a pastel-themed digital storybook.

Planned and ongoing experience:

1. Invitation privacy notice.
2. Guest passkey entry.
3. Wedding book cover.
4. Animated book opening.
5. Mental Canvas thumbnail preview.
6. Zoom transition into the interactive invitation.

### 🎨 Personalized Guest Experience

Each guest can have their own invitation identity, including:

- Guest name.
- Guest type (individual or family).
- Invitation access code.
- Mental Canvas URL.

### 🖼️ Interactive Mental Canvas

The project integrates an interactive wedding invitation created using Mental Canvas.

Mental Canvas provides the immersive canvas experience that serves as the main invitation destination.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 | Frontend framework |
| TypeScript | Type-safe development |
| Vite | Development server and build tool |
| Tailwind CSS | Utility-first styling |
| Vue Router | Client-side navigation |
| Mental Canvas | Interactive invitation experience |
| JSON | Guest invitation data |

---

## 📂 Project Structure

```text
src/
├── assets/
│   └── main.css
│
├── components/
│   └── invitation/
│       ├── PrivacyNotice.vue
│       ├── PasskeyView.vue
│       ├── InvitationBook.vue
│       └── MentalCanvasView.vue
│
├── router/
│   └── index.ts
│
├── views/
│   ├── HomeView.vue
│   └── AboutView.vue
│
└── App.vue

public/
└── guests.json
```

> The structure may evolve as the invitation experience is refined and additional reusable components are introduced.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Gamar6/Private-Wedding-Invitation.git
```

Navigate into the project directory:

```bash
cd Private-Wedding-Invitation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available through the local Vite development server.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

---

## 🔑 Guest Data

Guest invitation data is stored in:

```text
public/guests.json
```

Example structure:

```json
{
  "guests": [
    {
      "passcode": "EXAMPLE01",
      "type": "person",
      "name": "Guest Name",
      "canvasUrl": "https://www.mentalcanvas.net/pkcf3phrbsc"
    }
  ]
}
```

### Guest Properties

| Property | Description |
|---|---|
| `passcode` | Invitation access code |
| `type` | Guest category (`person` or `family`) |
| `name` | Personalized guest name |
| `canvasUrl` | Mental Canvas invitation URL |

**Security consideration:** This implementation uses publicly accessible JSON data and client-side passcode matching. It should not be used for protecting confidential information.

---

## 🎯 Project Goals

- Create an intimate and personalized wedding invitation.
- Deliver a memorable digital invitation experience.
- Explore creative UI/UX using animation and interactive storytelling.
- Build a maintainable Vue component architecture.
- Integrate immersive visual experiences into a web-based invitation.

---

## 🗺️ Roadmap

- [x] Initial Vue 3 + Vite project setup
- [x] Guest passcode validation
- [x] Personalized guest greeting
- [x] Mental Canvas integration
- [x] Privacy notice concept
- [ ] Refine pastel wedding invitation design
- [ ] Implement animated storybook cover
- [ ] Add custom wedding book artwork
- [ ] Create thumbnail-to-canvas zoom transition
- [ ] Improve responsive experience across devices
- [ ] Add production deployment configuration

---

## 🎨 Design Direction

The project follows a soft, romantic, and playful visual direction.

**Design keywords:**

`Pastel` · `Romantic` · `Intimate` · `Elegant` · `Playful` · `Interactive`

The visual design is inspired by a combination of digital wedding stationery, storybooks, floral illustrations, and immersive canvas experiences.

---

## 📌 Project Status

**In Development**

This project is actively being developed as a personalized digital wedding invitation. Features, visual designs, and the interaction flow may continue to evolve throughout development.

---

## 👨‍💻 Authors

### Mohamad Gamar
- Frontend Development
- Invitation Flow & Guest Access
- UI/UX Implementation

### Eka
- Mental Canvas Design & Experience
- Interactive Invitation Concept

---

<p align="center">
  Made with love by Gamar & Eka for Fachry & Pappoy ♡
</p>
