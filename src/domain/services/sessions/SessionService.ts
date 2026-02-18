import { Inject, Injectable } from '@nestjs/common'
import { PushNotificationFactory } from '../../models/notifications/PushNotificationFactory'
import { Phase } from '../../models/phases/Phase'
import { nextPhaseName, PhaseName, PhaseNameWithDescription } from '../../models/phases/PhaseName'
import { Session, SessionToCreate } from '../../models/sessions/Session'
import { SessionState } from '../../models/sessions/SessionState'
import { INotificationSenderProvider } from '../../providers/notifications/INotificationSenderProvider'
import { IPhaseProvider } from '../../providers/phases/IPhaseProvider'
import { ISessionProvider } from '../../providers/sessions/ISessionProvider'

@Injectable()
export class SessionService {
  constructor(
    @Inject('ISessionProvider') private readonly sessionProvider: ISessionProvider,
    @Inject('IPhaseProvider') private readonly phaseProvider: IPhaseProvider,
    @Inject('INotificationSenderProvider')
    private readonly notificationSenderProvider: INotificationSenderProvider
  ) {}

  async createSession(sessionToCreate: SessionToCreate): Promise<Session> {
    const activeSessions = await this.sessionProvider.findAllActive()
    if (activeSessions.length > 0) {
      await this.sessionProvider.updateMany(
        activeSessions.map((session) => session.id),
        { state: SessionState.INACTIVE }
      )
    }
    const session = await this.sessionProvider.create(sessionToCreate)
    await this.phaseProvider.create(
      Phase.phaseToCreateFactory({
        sessionId: session.id,
        name: PhaseName.INTRODUCTION,
        description: PhaseNameWithDescription[PhaseName.INTRODUCTION]
      })
    )
    await this.notificationSenderProvider.sendNotification(
      PushNotificationFactory.newSessionStartedFactory(session.deviceTokens)
    )
    return await this.sessionProvider.findOneById(session.id)
  }

  async getActiveSession(): Promise<Session> {
    return await this.sessionProvider.findOneByState(SessionState.ACTIVE)
  }

  async addDeviceTokenToSession(deviceToken: string): Promise<void> {
    const session = await this.getActiveSession()
    if (session.deviceTokens.includes(deviceToken)) {
      return
    }
    await this.sessionProvider.update(session.id, { deviceTokens: [...session.deviceTokens, deviceToken] })
  }

  async setPhasePoints(p: { catPoints?: number; mikaPoints?: number }): Promise<void> {
    const session = await this.getActiveSession()
    const phase = session.activePhase
    console.log('phase id', phase.id)
    await this.phaseProvider.update(phase.id, { catPoints: p.catPoints, mikaPoints: p.mikaPoints })
    await this.notificationSenderProvider.sendNotification(
      PushNotificationFactory.pointsSetupFactory({
        phaseName: phase.name,
        catPoints: p.catPoints ?? 0,
        mikaPoints: p.mikaPoints ?? 0,
        deviceTokens: session.deviceTokens
      })
    )
  }

  async startNextPhase(): Promise<void> {
    const session = await this.getActiveSession()
    const phase = session.activePhase
    console.log('starting next phase', phase.name)
    console.log('next phase name', nextPhaseName(phase.name))
    console.log('next phase description', PhaseNameWithDescription[nextPhaseName(phase.name)])
    const nextPhase = Phase.phaseToCreateFactory({
      sessionId: session.id,
      name: nextPhaseName(phase.name),
      description: PhaseNameWithDescription[nextPhaseName(phase.name)]
    })
    await this.phaseProvider.create(nextPhase)
    await this.sessionProvider.update(session.id, { currentPhaseName: nextPhase.name })
    await this.notificationSenderProvider.sendNotification(
      PushNotificationFactory.newPhaseStartedFactory({ phaseName: nextPhase.name, deviceTokens: session.deviceTokens })
    )
  }
}
