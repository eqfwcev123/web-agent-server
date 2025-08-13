# Development Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Redis (optional, for caching)
- Git

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your actual configuration values
# Important: Change JWT_SECRET and database credentials
```

### 3. Database Setup
```bash
# Install PostgreSQL and create a database
createdb coding_education

# The application will automatically create tables on first run
# when NODE_ENV=development
```

### 4. Optional: Redis Setup
```bash
# Install and start Redis for caching
redis-server
```

### 5. Start Development Server
```bash
npm run start:dev
```

## API Documentation
Once the server is running, visit:
- http://localhost:3000/api/docs (Swagger documentation)

## Key Features to Implement

### Phase 1: Foundation (Week 1-2)
1. **User Authentication**
   - JWT-based authentication
   - User registration and login
   - Password hashing with bcrypt

2. **Problem Management**
   - Database schema for problems
   - Basic CRUD operations
   - Problem categorization

3. **AI Integration**
   - OpenAI API integration
   - Basic problem analysis
   - Simple explanation generation

### Phase 2: Core Features (Week 3-4)
1. **AI Teaching Engine**
   - Advanced problem parsing
   - Step-by-step explanations
   - Code analysis and suggestions

2. **Learning Sessions**
   - Session management
   - Progress tracking
   - Interactive learning flow

3. **Code Execution**
   - Secure code execution environment
   - Multiple language support
   - Test case validation

### Phase 3: Advanced Features (Week 5-6)
1. **Real-time Communication**
   - WebSocket integration
   - Live AI assistance
   - Real-time progress updates

2. **Analytics & Insights**
   - Learning analytics
   - Performance metrics
   - Personalized recommendations

## Development Commands

```bash
# Development
npm run start:dev          # Start in watch mode
npm run start:debug        # Start with debugging

# Building
npm run build              # Build for production
npm run start:prod         # Start production build

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## Project Structure Explanation

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root application module
├── modules/                # Feature modules
│   ├── auth/              # Authentication & authorization
│   ├── users/             # User management
│   ├── problems/          # Algorithm problems
│   ├── ai-teaching/       # AI teaching engine
│   ├── learning-sessions/ # Learning session management
│   └── code-execution/    # Code execution engine
├── common/                # Shared utilities
│   ├── dto/              # Data transfer objects
│   ├── guards/           # Authentication guards
│   ├── interfaces/       # TypeScript interfaces
│   └── database/         # Database configuration
└── config/               # Application configuration
```

## Database Schema Overview

### Core Tables
- `users` - User accounts and preferences
- `problems` - Algorithm problems and metadata
- `learning_sessions` - User learning sessions
- `ai_interactions` - AI teaching interactions
- `code_submissions` - User code submissions
- `test_cases` - Problem test cases

## AI Integration Strategy

### 1. Problem Analysis
- Parse problem text using NLP
- Extract key information (constraints, examples)
- Categorize difficulty and topic
- Generate test cases

### 2. Teaching Engine
- Generate step-by-step explanations
- Provide hints and guidance
- Analyze user code
- Suggest improvements

### 3. Personalization
- Track user learning patterns
- Adapt teaching style
- Recommend learning paths
- Provide targeted practice

## Security Considerations

### 1. Code Execution Security
- Docker containers for isolation
- Resource limits (CPU, memory, time)
- Network restrictions
- File system sandboxing

### 2. API Security
- JWT token authentication
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

### 3. Data Protection
- Password hashing
- Environment variable protection
- Secure API key management
- HTTPS enforcement (production)

## Deployment Strategy

### Development
- Local PostgreSQL database
- Hot reloading with file watching
- Debug logging enabled

### Staging
- Cloud database (AWS RDS, etc.)
- Redis for caching
- Load testing
- Performance monitoring

### Production
- Horizontal scaling with load balancer
- Database connection pooling
- CDN for static assets
- Comprehensive monitoring
- Automated backups

## Monitoring & Analytics

### Application Metrics
- Response times
- Error rates
- Database query performance
- AI service usage

### Business Metrics
- User engagement
- Learning session completion rates
- AI interaction effectiveness
- Problem solving success rates

## Contributing Guidelines

1. Follow TypeScript best practices
2. Write unit tests for new features
3. Use conventional commit messages
4. Update documentation
5. Run linting before commits
