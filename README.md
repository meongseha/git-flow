# Git Flow Interactive Tutorial

An interactive web application built with React and TypeScript that teaches Git Flow workflow through visual demonstrations and hands-on simulations.

## Features

- 🎯 Interactive Git Flow tutorial with step-by-step guidance
- 🖼️ Visual Git branch management demonstrations
- 💻 Terminal simulator for hands-on practice
- 📊 Dynamic Git Flow visualization
- 👥 Developer workflow simulation
- 📝 Comprehensive command reference

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (for icons)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd git-flow
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # React components
│   ├── CommandReference.tsx
│   ├── DeveloperSimulation.tsx
│   ├── Footer.tsx
│   ├── GitFlowVisualization.tsx
│   ├── Header.tsx
│   ├── TerminalSimulator.tsx
│   ├── TutorialContainer.tsx
│   └── TutorialSteps.tsx
├── App.tsx            # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles

```

## Code Quality

This project uses:
- ESLint for code linting
- TypeScript for type checking
- Tailwind CSS for styling

To run linting:

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Git Flow methodology by Vincent Driessen
- React and TypeScript communities
- All contributors to this project
