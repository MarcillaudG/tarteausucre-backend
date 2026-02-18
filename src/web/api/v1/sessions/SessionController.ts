import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Session } from '../../../../domain/models/sessions/Session'
import { NotificationService } from '../../../../domain/services/notifications/NotificationService'
import { SessionService } from '../../../../domain/services/sessions/SessionService'
import { NotificationVM } from './entities/NotificationVM'
import { SessionDTO } from './entities/SessionDTO'
import { CreateSessionRequest } from './requests/CreateSessionRequest'
import { SetPhasePointsRequest } from './requests/SetPhasePointsRequest'

@Controller('api/v1/sessions')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly notificationService: NotificationService
  ) {}

  @Post('')
  async createSession(@Body() createSessionRequest: CreateSessionRequest): Promise<SessionDTO> {
    const session = await this.sessionService.createSession(
      Session.sessionToCreateFactory({ deviceTokens: [createSessionRequest.deviceToken] })
    )
    return new SessionDTO(session)
  }

  @Get('active')
  async getActiveSession(): Promise<SessionDTO> {
    const session = await this.sessionService.getActiveSession()
    return new SessionDTO(session)
  }

  @Post('set-points')
  async setPoints(@Body() setPhasePointsRequest: SetPhasePointsRequest): Promise<void> {
    await this.sessionService.setPhasePoints({
      catPoints: setPhasePointsRequest.catPoints,
      mikaPoints: setPhasePointsRequest.mikaPoints
    })
  }

  @Post('start-next-phase')
  async startNextPhase(): Promise<void> {
    await this.sessionService.startNextPhase()
  }

  @Get(':sessionId/notifications')
  async getNotificationsBySessionId(
    @Param('sessionId') sessionId: string
  ): Promise<NotificationVM[]> {
    return (await this.notificationService.getAllBySessionId(sessionId)).map(NotificationVM.from)
  }
}
