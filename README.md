# ProxyHub

A scalable proxy management platform for administering and monitoring residential proxies.

Developed as a full-stack application using modern technologies to efficiently manage proxy networks.

## Features

- 🔒 JWT-based authentication with bcrypt password hashing
- 🔄 Complete proxy management (CRUD) with validation
- 📱 Responsive design with Chakra UI for optimal UX
- 🚦 Rate limiting & advanced security features
- ⚡ Redis caching for optimal performance

## Tech Stack

### Frontend

- React 18 with Vite for fast development
- Chakra UI for a modern, accessible design
- React Query for efficient state management
- Axios for type-safe API communication

### Backend

- Node.js & Express for a scalable API architecture
- MongoDB for flexible data storage
- Redis for performance caching and rate limiting
- JWT & bcrypt for secure authentication


## Architecture Highlights

- **Scalable backend architecture**: Optimized for high loads with Redis caching
- **Reactive frontend**: Real-time updates using React Query
- **Security First**: JWT, rate limiting, CORS, Helmet
- **Performance**: Redis caching, lazy loading, code splitting
- **Clean Code**: ESLint, Prettier, Husky for Git hooks

## Development Principles

- **Code Quality**: Extensive tests and code reviews
- **Performance**: Continuous optimization and monitoring
- **Security**: Regular security audits
- **Maintainability**: Clear documentation and modular code

## Installation

### Requirements

- Node.js (v14+)
- MongoDB
- Redis

### Backend Setup
```bash
cd proxyhub-backend
npm install
node src/index.js
```

### Frontend Setup
```bash
cd proxyhub-frontend
npm install
npm run dev
```

## Development

### Environment Variables

#### Backend (.env)
```ini
MONGODB_URI=mongodb://localhost:27017/proxyhub
JWT_SECRET=your_jwt_secret
PORT=3000
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env)
```ini
VITE_API_URL=http://localhost:3000
```

