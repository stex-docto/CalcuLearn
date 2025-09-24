import { useContext } from 'react'
import {
  GameSessionContext,
  GameSessionContextValue,
} from '../providers/GameSessionContext'

export function useGameSession(): GameSessionContextValue {
  const context = useContext(GameSessionContext)
  if (context === undefined) {
    throw new Error('useGameSession must be used within a GameSessionProvider')
  }
  return context
}
