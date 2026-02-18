import { PhaseName } from '../../../../../domain/models/phases/PhaseName'
import { Session } from '../../../../../domain/models/sessions/Session'
import { SessionState } from '../../../../../domain/models/sessions/SessionState'
import { PhaseDTO } from './PhaseDTO'

export class SessionDTO {
  id: string
  currentPhaseName: PhaseName
  state: SessionState
  phases: PhaseDTO[]
  activePhase: PhaseDTO
  createdAt: Date
  updatedAt: Date

  constructor(session: Session) {
    this.id = session.id
    this.currentPhaseName = session.currentPhaseName
    this.state = session.state
    this.phases = session.phases
    this.activePhase = new PhaseDTO(session.activePhase)
    this.createdAt = session.createdAt
    this.updatedAt = session.updatedAt
  }

  static from(session: Session): SessionDTO {
    return {
      id: session.id,
      currentPhaseName: session.currentPhaseName,
      state: session.state,
      phases: session.phases.map(PhaseDTO.from),
      activePhase: PhaseDTO.from(session.activePhase),
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }
  }
}
