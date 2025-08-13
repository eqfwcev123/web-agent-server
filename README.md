# 🚀 AI-Powered Coding Algorithm Education Platform

## Overview
A NestJS-based backend server for an AI-powered coding algorithm education platform that provides exceptional UX for teaching coding algorithms through interactive AI explanations.

## Key Features
- **AI-Powered Teaching**: Advanced AI integration for step-by-step algorithm explanations
- **Secure Code Execution**: Docker-based sandboxed environment for running user code
- **Real-time Learning**: WebSocket-powered interactive learning sessions
- **Personalized Experience**: Adaptive learning paths based on user progress
- **Modern Architecture**: Scalable, modular NestJS design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (optional, for caching)

### Installation

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start Development Server**
   ```bash
   npm run start:dev
   ```

4. **Access API Documentation**
   - Visit: http://localhost:3000/api/docs

## Documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Complete system architecture design
- **[DEVELOPMENT.md](./DEVELOPMENT.md)**: Development setup and guidelines

## Technology Stack
- **NestJS**: Backend framework with TypeScript
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions
- **OpenAI/LangChain**: AI integration
- **Docker**: Secure code execution
- **Socket.IO**: Real-time communication

## API Endpoints
```
POST /auth/login              # User authentication
POST /problems/analyze        # AI analyzes algorithm problems
GET  /problems               # List all problems
POST /ai-teaching/explain    # Get AI explanations
POST /code-execution/run     # Execute code securely
```

## Architecture Highlights
- **Modular Design**: Feature-based modules for scalability
- **Security-First**: JWT auth, rate limiting, secure code execution
- **AI Integration**: Flexible multi-provider AI service support
- **Real-time**: WebSocket for live interactions
- **Database**: TypeORM with PostgreSQL for data persistence

## Development Status
✅ Project structure and architecture
✅ Core modules and dependencies
✅ Security and authentication setup
🔄 Database entities implementation
🔄 AI service integration
🔄 Code execution environment

## License
MIT
