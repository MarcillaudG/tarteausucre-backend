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
  get totalCatPoints(): number {
    return this.phases.reduce((acc, phase) => acc + phase.catPoints, 0)
  }
  get totalMikaPoints(): number {
    return this.phases.reduce((acc, phase) => acc + phase.mikaPoints, 0)
  }
  deviceTokens: string[]
  createdAt: Date
  updatedAt: Date

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
export type SessionParams = Omit<Session, 'currentPhase' | 'activePhase' | 'totalCatPoints' | 'totalMikaPoints'>
export type SessionToCreate = Omit<Session, 'id' | 'currentPhase' | 'phases' | 'activePhase' | 'totalCatPoints' | 'totalMikaPoints'>
export type SessionToUpdate = Pick<Session, 'currentPhaseName' | 'state' | 'deviceTokens'>
