import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Session, SessionToCreate, SessionToUpdate } from '../../../domain/models/sessions/Session'
import { SessionState } from '../../../domain/models/sessions/SessionState'
import { ISessionProvider } from '../../../domain/providers/sessions/ISessionProvider'
import { DBSession } from './DBSession'
import { DBSessionFactory } from './DBSessionFactory'

@Injectable()
export class DBSessionProvider implements ISessionProvider {
  constructor(
    @InjectRepository(DBSession) private readonly sessionRepository: Repository<DBSession>
  ) {}

  async create(sessionToCreate: SessionToCreate): Promise<Session> {
    const session = this.sessionRepository.create(
      DBSessionFactory.dbSessionToCreateFactory(sessionToCreate)
    )
    await this.sessionRepository.insert(session)
    return this.findOneById(session.id)
  }

  async findAllActive(): Promise<Session[]> {
    const sessions = await this.sessionRepository.find({
      where: { state: SessionState.ACTIVE },
      relations: { phases: true }
    })
    return sessions.map(DBSessionFactory.toSession)
  }

  async findOneById(id: string): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: id },
      relations: {
        phases: true
      }
    })
    if (!session) {
      throw new NotFoundException('Session not found')
    }
    return DBSessionFactory.toSession(session)
  }

  async findOneByState(state: SessionState): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { state: state },
      relations: {
        phases: true
      }
    })
    if (!session) {
      throw new NotFoundException('Session not found')
    }
    return DBSessionFactory.toSession(session)
  }
  async update(id: string, sessionToUpdate: Partial<SessionToUpdate>): Promise<Session> {
    await this.sessionRepository.update(id, DBSessionFactory.dbSessionToUpdateFactory(sessionToUpdate))
    return this.findOneById(id)
  }

  async updateMany(ids: string[], sessionToUpdate: Partial<SessionToUpdate>): Promise<Session[]> {
    await this.sessionRepository.update(ids, DBSessionFactory.dbSessionToUpdateFactory(sessionToUpdate))
    return this.findAllActive()
  }
}
