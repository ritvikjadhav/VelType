# VelType

> **Flow Into Speed.**

A modern browser-based typing practice and learning platform designed to help users improve **typing speed, accuracy, consistency, and touch-typing technique.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Desktop-111111?style=flat-square)](#)

---

## 🌐 Live Demo

**[Try VelType →](https://veltype.vercel.app)**

---

## 📸 Preview

### Homepage

![VelType Homepage](./image/homepage.png)

### Typing Test

![VelType Typing Test](./image/typing-test.png)

### Typing Academy

![VelType Learning Academy](./image/learning.png)

### Progress Dashboard

![VelType Dashboard](./image/dashboard.png)

---

## ✨ Overview

VelType is a responsive typing testing and learning platform built with **HTML, CSS, and Vanilla JavaScript**.

The project combines timed typing tests with a structured learning academy and a personal progress dashboard — all without requiring user registration or a backend.

Users can:

- Test their typing speed and accuracy
- Practice with randomized passages
- Learn touch-typing through structured lessons
- Track their progress
- Review previous test results
- Continue their learning without creating an account

---

## 🚀 Features

### ⌨️ Typing Test

- Multiple test durations
- Randomized practice passages
- Real-time character validation
- Instant correct/incorrect feedback
- Live timer
- WPM calculation
- Raw WPM calculation
- Accuracy calculation
- Error tracking
- Character count
- Automatic test completion
- Test history
- Restart functionality

### 🎓 Typing Academy

VelType includes a **24-lesson progressive learning path** divided into six levels:

| Level | Focus | Lessons |
|---|---|---:|
| Foundation | Touch-typing fundamentals | 01–04 |
| Core Typing | Full-keyboard control | 05–08 |
| Accuracy | Reliable typing technique | 09–14 |
| Speed | Increasing speed with control | 15–18 |
| Real World | Practical computer typing | 19–22 |
| Advanced | Speed, endurance & consistency | 23–24 |

Lessons progressively unlock as users complete previous lessons.

### 📊 Progress Dashboard

The dashboard turns typing and learning activity into a simple progress overview.

- Best WPM
- Best accuracy
- Completed tests
- Test history
- Completed lessons
- Academy progress
- Current learning level
- Current lesson
- Lesson progress
- Reset controls

### 💾 Local Progress

VelType does not require an account or backend database.

Progress is stored locally in the browser using the **Web Storage API (`localStorage`)**, including:

- Typing test results
- Lesson completion
- Lesson progress
- Exercise progress
- Overall progress

### 📱 Responsive Design

Designed for:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop

The interface adapts navigation, typing areas, lessons, cards, and dashboard content for different screen sizes.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure |
| **CSS3** | Layout, responsive design, animations & UI |
| **JavaScript** | Application logic & interactions |
| **localStorage** | Client-side progress persistence |
| **Google Fonts** | Manrope, DM Mono & Playfair Display |

### Why Vanilla JavaScript?

VelType was intentionally built without a frontend framework to strengthen core JavaScript skills including:

- DOM manipulation
- Event handling
- State management
- Dynamic rendering
- Timers
- Input validation
- Local storage
- Progress calculations

---

## 🔄 How It Works

### Typing Test

```text
Choose Test
    ↓
Random Passage
    ↓
Start Typing
    ↓
Real-Time Validation
    ↓
Calculate WPM & Accuracy
    ↓
Save Result
    ↓
View Progress
```

### Learning Academy

```text
Start Lesson
    ↓
Practice
    ↓
Complete Lesson
    ↓
Next Lesson Unlocks
    ↓
Progress Saved
```

---

## 📁 Project Structure

```text
VelType/
│
├── css/
│   ├── style.css
│   ├── test.css
│   └── learn.css
│
├── js/
│   ├── script.js
│   ├── test.js
│   ├── learn.js
│   └── dashboard.js
│
├── image/
│
├── index.html
├── test.html
├── learn.html
├── lesson.html
├── dashboard.html
└── README.md
```

---

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ritvikjadhav/VelType.git
```

### 2. Open the project

Open the project in **VS Code** or your preferred code editor.

### 3. Run the website

Use **VS Code Live Server** or any local static server.

You can also open `index.html` directly in a browser.

---

## 🔮 Future Improvements

Possible future versions may include:

- User accounts & cloud synchronization
- Global typing leaderboard
- Daily typing challenges
- Typing analytics & charts
- Custom typing passages
- Typing heatmaps
- Additional keyboard layouts
- PWA/offline support

---

## 👨‍💻 Author

**Ritvik Jadhav**

BSc IT Student & Web Developer

Built VelType to practice and demonstrate real-world frontend development, JavaScript logic, responsive UI design, and client-side data persistence.

---

<p align="center">
  <strong>VelType</strong><br>
  <em>Flow Into Speed.</em>
</p>
