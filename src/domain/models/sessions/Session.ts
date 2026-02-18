import { Phase } from '../phases/Phase'
import { PhaseName } from '../phases/PhaseName'
import { SessionState } from './SessionState'

export class Session {
  id: string
  currentPhaseName: PhaseName
  state: SessionState
  phases: Phase[]
  get activePhase(): Phase {
    const activePhase = this.phases.find((phase) => phase.name === this.currentPhaseName)
    if (!activePhase) {
      throw new Error('Active phase not found')
    }
    return activePhase
  }
  deviceTokens: string[]
  createdAt: Date
  updatedAt: Date

  get currentPhase(): Phase {
    return this.phases.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0]
  }

  constructor(s: SessionParams) {
    this.id = s.id
    this.currentPhaseName = s.currentPhaseName
    this.phases = s.phases
    this.deviceTokens = s.deviceTokens
    this.createdAt = s.createdAt
    this.updatedAt = s.updatedAt
  }

  static sessionToCreateFactory(p: { deviceTokens: string[] }): SessionToCreate {
    return {
      currentPhaseName: PhaseName.INTRODUCTION,
      state: SessionState.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      deviceTokens: p.deviceTokens
    }
  }
}
export type SessionParams = Omit<Session, 'currentPhase' | 'activePhase'>
export type SessionToCreate = Omit<Session, 'id' | 'currentPhase' | 'phases' | 'activePhase'>
export type SessionToUpdate = Pick<Session, 'currentPhaseName' | 'state' | 'deviceTokens'>
