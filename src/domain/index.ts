// Enums
export { Operation } from './enums/Operation.ts'

// Entities
export { Block } from './entities/Block'
export { Problem } from './entities/Problem'
export {
  ProblemSet,
  type WeightedProblem,
  type ProblemStats,
} from './entities/ProblemSet'
export { Tower } from './entities/Tower'
export { GameSession, type GameEvent } from './entities/GameSession'

// Value Objects
export { BlockId } from './value-objects/BlockId'
export { Position } from './value-objects/Position'
export { Color } from './value-objects/Color'
export { ProblemId } from './value-objects/ProblemId'
export { Question } from './value-objects/Question'
export { Answer } from './value-objects/Answer'
export { Options } from './value-objects/Options'
export { Score } from './value-objects/Score'
export { Level } from './value-objects/Level'
export { GameStatus } from './value-objects/GameStatus'
export { TowerHeight } from './value-objects/TowerHeight'
export { TableSelection } from './value-objects/TableSelection'
export { GameSettings } from './value-objects/GameSettings'

// Strategies
export {
  BaseProblemGenerationStrategy,
  AdditionStrategy,
  MultiplicationStrategy,
} from './strategies'
export type { ProblemGenerationStrategy } from './strategies'
