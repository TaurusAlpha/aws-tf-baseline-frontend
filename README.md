# AWS Terraform Baseline Frontend

A beginner-friendly React frontend for generating AWS Terraform baseline configurations.

## Tech Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **Zod** - Schema validation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## Docker

To run the application in a Docker container:

1. Build the Docker image:
```bash
docker build -t aws-tf-baseline-frontend .
```

2. Run the container:
```bash
docker run -p 3000:3000 aws-tf-baseline-frontend
```

3. Open http://localhost:3000

Alternatively, use Docker Compose if available:
```bash
docker-compose up
```

## Project Structure

```
src/
├── api/          # Backend API calls
├── components/   # Reusable UI components  
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── schemas/      # Form validation
├── context/      # Global state
├── styles/       # CSS and Tailwind
└── App.tsx       # Main app component
```

## Development Tips

- Each folder has a README.md with usage examples
- Components are organized by feature and reusability
- Use TypeScript for better development experience
- Tailwind classes for quick styling
