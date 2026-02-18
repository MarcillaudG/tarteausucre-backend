import { DBPhase } from "../phases/DBPhase"
import { DBSession, DBSessionToCreate, DBSessionToUpdate } from "./DBSession"
import { Session, SessionToCreate } from "../../../domain/models/sessions/Session"

export class DBSessionFactory {
    static toSession(dbsession: DBSession): Session {
        return new Session({
            id: dbsession.id,
            currentPhaseName: dbsession.currentPhaseName,
            state: dbsession.state,
            phases: dbsession.phases.map(DBPhase.toPhase),
            deviceTokens: dbsession.deviceTokens,
            createdAt: dbsession.createdAt,
            updatedAt: dbsession.updatedAt
        })
    }
    

  static dbSessionToCreateFactory(session: SessionToCreate): DBSessionToCreate {
    return {
      currentPhaseName: session.currentPhaseName,
      state: session.state,
      deviceTokens: session.deviceTokens,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt
    }
  }

  static dbSessionToUpdateFactory(session: Partial<Session>): Partial<DBSessionToUpdate> {
    return {
      currentPhaseName: session.currentPhaseName,
      state: session.state,
      deviceTokens: session.deviceTokens
    }
  }
}