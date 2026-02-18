import { PhaseName } from './PhaseName'

export class Phase {
  id: string
  sessionId: string
  name: PhaseName
  description: string
  mikaPoints: number
  catPoints: number
  createdAt: Date
  updatedAt: Date

  constructor(p: Phase) {
    this.id = p.id
    this.sessionId = p.sessionId
    this.name = p.name
    this.description = p.description
    this.mikaPoints = p.mikaPoints
    this.catPoints = p.catPoints
    this.createdAt = p.createdAt
    this.updatedAt = p.updatedAt
  }

  static phaseToCreateFactory(p: {
    sessionId: string
    name: PhaseName
    description: string
  }): PhaseToCreate {
    return {
      sessionId: p.sessionId,
      name: p.name,
      description: p.description,
      mikaPoints: 0,
      catPoints: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }
}

export type PhaseToCreate = Omit<Phase, 'id'>
export type PhaseToUpdate = Pick<Phase, 'description' | 'mikaPoints' | 'catPoints'>
