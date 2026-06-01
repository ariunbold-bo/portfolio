# Ariunbold Bold — Developer Portfolio

A modern, glassmorphic developer portfolio built to showcase multidisciplinary engineering projects ranging from full-stack web applications to low-level hardware modifications and embedded systems.

![Portfolio Preview](/public/profile.webp)

## 🚀 Key Features

- **Modern Aesthetic**: Deep dark mode interface featuring glassmorphic cards, dynamic gradient blobs, and precision-timed scroll animations.
- **Responsive Design**: Flawless execution across mobile, tablet, and desktop viewports, with specialized touch-interaction states for mobile devices.
- **Hardware Integration Showcases**: Dedicated case-study pages for embedded electronics (ESP32 OLED programming) and hardware modding (Project CryoCell S21 Mod), featuring custom SVGs and integrated video playback.
- **Accessibility (a11y) First**: Built strictly to WCAG 2.1 AA standards, featuring full keyboard navigation, `focus-visible` states, and semantic HTML structure.
- **Dynamic Career Timeline**: A scroll-animated vertical timeline detailing a journey from early Python scripting to mastering Arch Linux and native systems programming.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables for theming
- **Animations**: Native CSS transitions + `IntersectionObserver` API for lightweight scroll triggers
- **Deployment**: [Vercel](https://vercel.com/) (Recommended)

## 💻 Running Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js (v18.x or later) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ariunbold-bo/portfolio.git
   ```
2. Navigate into the project directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   *or if you prefer yarn/pnpm:*
   ```bash
   yarn install
   # or
   pnpm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 📁 Project Structure

```text
portfolio/
├── app/                  # Next.js App Router (Pages, Layouts, Globals)
│   ├── esp32/            # ESP32 project showcase route
│   ├── s21-mod/          # S21 hardware mod showcase route
│   └── page.js           # Main landing page
├── components/           # Reusable modular UI components
│   ├── AboutMe.jsx       # Skill sets and growth targets
│   ├── ContactList.jsx   # Accessible contact links
│   ├── CreativeEngineering.jsx # Hardware projects
│   ├── Header.jsx        # Navigation
│   ├── IntroPage.jsx     # Hero section
│   ├── Timeline.jsx      # Scroll-animated career timeline
│   └── projectShowcase.jsx # Software projects gallery
├── public/               # Static assets (images, videos, icons)
└── tailwind.config.js    # Tailwind configuration and theme extensions
```

## 🎯 Author

**Ariunbold Bold**
- GitHub: [@ariunbold-bo](https://github.com/ariunbold-bo)
- Email: ariunboldbold200@gmail.com

---
*Designed and engineered with a focus on deep technical immersion.*
