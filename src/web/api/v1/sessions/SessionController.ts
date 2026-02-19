import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { Session } from '../../../../domain/models/sessions/Session'
import { NotificationService } from '../../../../domain/services/notifications/NotificationService'
import { SessionService } from '../../../../domain/services/sessions/SessionService'
import { NotificationVM } from './entities/NotificationVM'
import { SessionDTO } from './entities/SessionDTO'
import { CreateSessionRequest } from './requests/CreateSessionRequest'
import { SetPhasePointsRequest } from './requests/SetPhasePointsRequest'
import { AddDeviceTokenRequest } from './requests/AddDeviceTokenRequest'

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

  @Post('add-device-token')
  async addDeviceToken(@Body() addDeviceTokenRequest: AddDeviceTokenRequest): Promise<void> {
    console.log('addDeviceTokenRequest', addDeviceTokenRequest.deviceToken)
    await this.sessionService.addDeviceTokenToSession(addDeviceTokenRequest.deviceToken)
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

  @Get('notifications')
  async getNotificationsForActiveSession(
  ): Promise<NotificationVM[]> {
    return (await this.sessionService.getNotificationsForActiveSession()).map(NotificationVM.from)
  }

  @Get('notifications/:notificationId')
  async getNotificationById(
    @Param('notificationId') notificationId: string
  ): Promise<NotificationVM> {
    return NotificationVM.from(await this.sessionService.getNotificationById(notificationId))
  }
}
