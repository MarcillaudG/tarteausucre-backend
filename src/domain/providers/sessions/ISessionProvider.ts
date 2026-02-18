import { Session, SessionToCreate, SessionToUpdate } from '../../models/sessions/Session'
import { SessionState } from '../../models/sessions/SessionState'

export interface ISessionProvider {
  create(sessionToCreate: SessionToCreate): Promise<Session>
  findAllActive(): Promise<Session[]>
  findOneByState(state: SessionState): Promise<Session>
  findOneById(id: string): Promise<Session>
  update(id: string, sessionToUpdate: Partial<SessionToUpdate>): Promise<Session>
  updateMany(ids: string[], sessionToUpdate: Partial<SessionToUpdate>): Promise<Session[]>
}
