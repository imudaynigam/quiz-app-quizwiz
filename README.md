# 🧠 QuizWiz - Interactive Trivia Quiz Application

<div align="center">
  <img src="public/favicon.png" alt="QuizWiz Logo" width="100" height="100" />
  
  **Test your knowledge with QuizWiz!**
  
  A modern, responsive trivia quiz application with multiple difficulty levels, real-time scoring, and elegant UI design.
  
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## ✨ Features

### 🎯 Core Features
- **Multiple Difficulty Levels**: Easy, Medium, and Hard questions to challenge all skill levels
- **Real-time Scoring**: Instant feedback and score calculation with performance tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress indicators and question navigation
- **Theme Support**: Light and dark mode with system preference detection
- **Interactive UI**: Modern glass-morphism design with smooth animations

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm** or **yarn**: Latest version recommended

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quizwiz.git
   cd quizwiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to start using QuizWiz!

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe development with enhanced IDE support
- **Vite 5.4.19** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons

### State Management & Routing
- **React Context API** - Global state management for theme and quiz data
- **React Router DOM 6.30.1** - Client-side routing with modern patterns
- **React Hook Form** - Performant forms with easy validation

### Additional Libraries
- **TanStack Query** - Powerful data synchronization for React
- **Sonner** - Beautiful toast notifications
- **Class Variance Authority** - Type-safe component variants
- **Zod** - TypeScript-first schema validation

## 📁 Project Structure

```
quiz-app/
├── public/                 # Static assets
│   ├── favicon.png        # Application logo/favicon
│   ├── favicon.ico        # Browser favicon
│   └── robots.txt         # Search engine instructions
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/       # Navigation, footer, layout components
│   │   ├── quiz/         # Quiz-specific components
│   │   └── ui/           # Base UI components (shadcn/ui)
│   ├── context/          # React context providers
│   │   ├── QuizContext.tsx    # Quiz state management
│   │   └── ThemeContext.tsx   # Theme management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Landing page with quiz setup
│   │   ├── Quiz.tsx      # Quiz interface
│   │   ├── Results.tsx   # Score and results display
│   │   └── NotFound.tsx  # 404 error page
│   ├── services/         # API services and data fetching
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles and animations
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server on port 8080
npm run build        # Build for production
npm run build:dev    # Build for development environment
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🎮 How to Use

### Starting a Quiz
1. **Select Difficulty**: Choose from Easy, Medium, or Hard levels
2. **Begin Quiz**: Click "Start Quiz" to begin your challenge
3. **Answer Questions**: Select your answers from multiple-choice options
4. **Navigate**: Use Previous/Next buttons or progress dots to navigate
5. **Complete**: Finish the quiz to see your results and score

### Features Guide
- **Progress Tracking**: Visual dots show answered vs. unanswered questions
- **Theme Toggle**: Switch between light and dark modes in the navigation
- **Mobile Support**: Fully responsive design works on all devices
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Deployment

### Build for Production
```bash
npm run build
