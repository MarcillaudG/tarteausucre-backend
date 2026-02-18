import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm'
import { Phase, PhaseToCreate, PhaseToUpdate } from '../../../domain/models/phases/Phase'
import { PhaseName } from '../../../domain/models/phases/PhaseName'
import { DBSession } from '../sessions/DBSession'

@Entity('Phase')
export class DBPhase {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  sessionId: string

  @ManyToOne(() => DBSession, (session) => session.phases)
  @JoinColumn({ name: 'sessionId' })
  session: DBSession

  @Column({ type: 'varchar' })
  name: PhaseName

  @Column({ type: 'text' })
  description: string

  @Column({ type: 'int' })
  mikaPoints: number

  @Column({ type: 'int' })
  catPoints: number

  @Column({ type: 'timestamp' })
  createdAt: Date

  @Column({ type: 'timestamp' })
  updatedAt: Date

  static toPhase(dbphase: DBPhase): Phase {
    return {
      id: dbphase.id,
      sessionId: dbphase.sessionId,
      name: dbphase.name,
      description: dbphase.description,
      mikaPoints: dbphase.mikaPoints,
      catPoints: dbphase.catPoints,
      createdAt: dbphase.createdAt,
      updatedAt: dbphase.updatedAt
    }
  }

  static dbPhaseToCreateFactory(phase: PhaseToCreate): DBPhaseToCreate {
    return {
      sessionId: phase.sessionId,
      name: phase.name,
      description: phase.description,
      mikaPoints: phase.mikaPoints,
      catPoints: phase.catPoints,
      createdAt: phase.createdAt,
      updatedAt: phase.updatedAt
    }
  }

  static dbPhaseToUpdateFactory(phase: Partial<PhaseToUpdate>): Partial<DBPhaseToUpdate> {
    return {
      description: phase.description,
      mikaPoints: phase.mikaPoints,
      catPoints: phase.catPoints,
      updatedAt: new Date()
    }
  }
}

export type DBPhaseToCreate = Omit<DBPhase, 'id' | 'session'>
export type DBPhaseToUpdate = Pick<Phase, 'description' | 'mikaPoints' | 'catPoints' | 'updatedAt'>
