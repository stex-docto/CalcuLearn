# Hexagonal Architecture Implementation

This document explains the hexagonal architecture implementation in CalcuLearn, which provides cleaner separation of concerns and better maintainability.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Presentation Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ React Components│  │  React Hooks    │  │   UI Libraries  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────────┐
│                   Application Layer                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Use Cases     │  │     Ports       │  │   App Services  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────────┐
│                     Domain Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Entities     │  │  Value Objects  │  │ Domain Services │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────┬───────────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────────┐
│                Infrastructure Layer                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │    Adapters     │  │   Repositories  │  │  External APIs  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Layer Breakdown

### 1. Domain Layer (`src/domain/`)

The core business logic layer, containing:

#### Entities
- **GameSession**: Orchestrates the game state and business rules
- **Tower**: Manages block stacking and completion logic
- **Problem**: Represents math problems with validation
- **Block**: Individual tower blocks with properties

#### Value Objects
- **Score**, **Level**, **GameMode**, **GameStatus**: Game state values
- **BlockId**, **BlockValue**, **Position**, **Color**: Block properties
- **ProblemId**, **Question**, **Answer**, **Options**: Problem components
- **Difficulty**, **Operation**: Problem configuration
- **TowerHeight**: Tower measurement

### 2. Application Layer (`src/application/`)

Orchestrates business use cases:

#### Use Cases
- **StartGameUseCase**: Handles game initialization
- **AnswerProblemUseCase**: Processes player answers
- **GenerateProblemUseCase**: Creates new math problems
- **ManageHighScoresUseCase**: Handles score persistence

#### Ports (Interfaces)
- **ProblemGeneratorPort**: Abstract problem generation
- **HighScoreRepositoryPort**: Abstract score storage

#### Services
- **GameApplicationService**: Coordinates all use cases

### 3. Infrastructure Layer (`src/infrastructure/`)

External dependencies and implementations:

#### Adapters
- **ProblemGeneratorAdapter**: Implements problem generation algorithms
- **LocalStorageHighScoreAdapter**: Implements browser storage for scores

#### Container
- **DIContainer**: Dependency injection container

### 4. Presentation Layer (`src/presentation/`)

React-specific adapters:

#### Hooks
- **useGameSession**: React hook wrapping game logic
- **useHighScores**: React hook for score management

## Key Benefits

### 1. **Separation of Concerns**
- Business logic is isolated in the domain layer
- External dependencies are abstracted through ports
- React components only handle UI concerns

### 2. **Testability**
- Domain logic can be tested without UI dependencies
- Ports can be easily mocked for testing
- Use cases are isolated and focused

### 3. **Maintainability**
- Changes to external services don't affect business logic
- UI changes don't impact core game rules
- Clear boundaries between layers

### 4. **Flexibility**
- Easy to swap implementations (e.g., localStorage → database)
- Can support multiple UIs (React, Vue, Angular)
- Business rules are reusable across platforms

## Usage Examples

### Starting a Game
```typescript
// Domain layer
const session = GameSession.create('addition').start()

// Application layer
const gameService = diContainer.getGameApplicationService()
const newSession = gameService.startGame(currentSession, 'addition')

// Presentation layer
const { startGame } = useGameSession()
startGame('addition')
```

### Adding a Block
```typescript
// Domain layer - immutable operations
const block = Block.create(5)
const { tower, isComplete } = currentTower.addBlock(block)

// Application layer - orchestrates the flow
const result = gameService.answerProblem(session, selectedAnswer)

// Presentation layer - React state updates
const events = answerProblem(selectedAnswer)
```

## Migration Strategy

1. **Current Implementation**: Traditional React hooks (`useGameLogic`, `useHighScores`)
2. **Hexagonal Implementation**: New architecture in parallel (`App.tsx`)
3. **Gradual Migration**: Components can be updated one by one
4. **Final Switch**: Replace `App.tsx` with `App.tsx`

## File Structure

```
src/
├── domain/
│   ├── entities/
│   │   ├── Block.ts
│   │   ├── Problem.ts
│   │   ├── Tower.ts
│   │   └── GameSession.ts
│   ├── value-objects/
│   │   ├── Score.ts
│   │   ├── Level.ts
│   │   └── ...
│   └── index.ts
├── application/
│   ├── ports/
│   │   ├── ProblemGeneratorPort.ts
│   │   └── HighScoreRepositoryPort.ts
│   ├── use-cases/
│   │   ├── StartGameUseCase.ts
│   │   └── ...
│   ├── services/
│   │   └── GameApplicationService.ts
│   └── index.ts
├── infrastructure/
│   ├── adapters/
│   │   ├── ProblemGeneratorAdapter.ts
│   │   └── LocalStorageHighScoreAdapter.ts
│   ├── container/
│   │   └── DIContainer.ts
│   └── index.ts
└── presentation/
    ├── hooks/
    │   ├── useGameSession.ts
    │   └── useHighScores.ts
    └── components/ (existing React components)
```

This architecture ensures that CalcuLearn is maintainable, testable, and ready for future enhancements.