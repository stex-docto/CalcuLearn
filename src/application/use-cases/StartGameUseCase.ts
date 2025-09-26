import { GameSession, GameSettings } from '@/domain'

export class StartGameUseCase {
  constructor() {}

  execute(gameSettings: GameSettings): GameSession {
    return GameSession.create(gameSettings).start()
  }
}
