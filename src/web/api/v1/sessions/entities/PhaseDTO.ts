import { Phase } from '../../../../../domain/models/phases/Phase'
import { PhaseName } from '../../../../../domain/models/phases/PhaseName'

export class PhaseDTO {
  id: string
  sessionId: string
  name: PhaseName
  description: string
  mikaPoints: number
  catPoints: number
  createdAt: Date
  updatedAt: Date

  constructor(phase: Phase) {
    this.id = phase.id
    this.sessionId = phase.sessionId
    this.name = phase.name
    this.description = phase.description
    this.mikaPoints = phase.mikaPoints
    this.catPoints = phase.catPoints
    this.createdAt = phase.createdAt
    this.updatedAt = phase.updatedAt
  }

  static from(phase: Phase): PhaseDTO {
    return {
      id: phase.id,
      sessionId: phase.sessionId,
      name: phase.name,
      description: phase.description,
      mikaPoints: phase.mikaPoints,
      catPoints: phase.catPoints,
      createdAt: phase.createdAt,
      updatedAt: phase.updatedAt
    }
  }
}
