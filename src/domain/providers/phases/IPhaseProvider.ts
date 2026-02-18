import { Phase, PhaseToCreate, PhaseToUpdate } from '../../models/phases/Phase'

export interface IPhaseProvider {
  create(phaseToCreate: PhaseToCreate): Promise<Phase>
  update(id: string, phaseToUpdate: Partial<PhaseToUpdate>): Promise<Phase>
}
