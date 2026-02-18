import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { PhaseName } from '../../../domain/models/phases/PhaseName'
import { Session, SessionToCreate } from '../../../domain/models/sessions/Session'
import { SessionState } from '../../../domain/models/sessions/SessionState'
import { DBPhase } from '../phases/DBPhase'

@Entity('Session')
export class DBSession {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  currentPhaseName: PhaseName

  @Column({ type: 'varchar' })
  state: SessionState

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  @OneToMany(() => DBPhase, (phase) => phase.session)
  phases: DBPhase[]

  @Column({ type: 'jsonb' })
  deviceTokens: string[]

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
export type DBSessionToCreate = Omit<DBSession, 'id' | 'phases'>
export type DBSessionToUpdate = Pick<DBSession, 'currentPhaseName' | 'state' | 'deviceTokens'>
