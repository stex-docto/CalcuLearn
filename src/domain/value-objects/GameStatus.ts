export type GameStatusType = 'running' | 'stopped'

export class GameStatus {
  constructor(private readonly value: GameStatusType) {}

  static running(): GameStatus {
    return new GameStatus('running')
  }

  static stopped(): GameStatus {
    return new GameStatus('stopped')
  }

  isRunning(): boolean {
    return this.value === 'running'
  }

  isStopped(): boolean {
    return this.value === 'stopped'
  }

  equals(other: GameStatus): boolean {
    return this.value === other.value
  }

  toString(): GameStatusType {
    return this.value
  }
}
