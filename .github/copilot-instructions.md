# Project Guidelines

## Code Style
- Language: JavaScript/Node.js for backend, React for frontend
- Formatting: ESLint configured in frontend; follow existing patterns in backend controllers and models
- Comments: Vietnamese preferred throughout the codebase

## Architecture
- Full-stack MERN job platform for job search/recruiting
- Backend: Express.js with Mongoose models, controllers, and routes under `/api/{domain}`
- Frontend: React 19 with Vite, components organized by feature (pages, dashboard, services)
- Database: MongoDB with optional JSON Server for mock data
- Clear separation: `backend/`, `my-app/`, `database/`

## Build and Test
- Backend: `npm run dev` (Nodemon on port 5000)
- Frontend: `npm run dev` (Vite HMR on port 5173), `npm run build`, `npm run lint`
- Database: `npm start` (JSON Server on port 3001)
- Requires local MongoDB instance running

## Conventions
- API calls: Use fetch with `credentials: "include"` for cookie-based auth
- Backend URLs hardcoded to `http://localhost:5000` (refactor for production)
- Models include timestamps; controllers export business logic functions
- Services layer in frontend wraps API calls

See [README.md](README.md) for detailed architecture overview.</content>
<parameter name="filePath">c:\SubLTWeb\.github\copilot-instructions.md