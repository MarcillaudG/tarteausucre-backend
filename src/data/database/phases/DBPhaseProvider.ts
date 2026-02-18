import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Phase, PhaseToCreate } from '../../../domain/models/phases/Phase'
import { PhaseToUpdate } from '../../../domain/models/phases/Phase'
import { IPhaseProvider } from '../../../domain/providers/phases/IPhaseProvider'
import { DBPhase } from './DBPhase'

@Injectable()
export class DBPhaseProvider implements IPhaseProvider {
  constructor(@InjectRepository(DBPhase) private readonly phaseRepository: Repository<DBPhase>) {}

  async create(phaseToCreate: PhaseToCreate): Promise<Phase> {
    const phase = this.phaseRepository.create(DBPhase.dbPhaseToCreateFactory(phaseToCreate))
    await this.phaseRepository.insert(phase)
    return this.findOneById(phase.id)
  }

  async findOneById(id: string): Promise<Phase> {
    const phase = await this.phaseRepository.findOne({ where: { id: id } })
    if (!phase) {
      throw new NotFoundException('Phase not found')
    }
    return DBPhase.toPhase(phase)
  }

  async update(id: string, phaseToUpdate: Partial<PhaseToUpdate>): Promise<Phase> {
    await this.phaseRepository.update(id, DBPhase.dbPhaseToUpdateFactory(phaseToUpdate))
    return this.findOneById(id)
  }
}
