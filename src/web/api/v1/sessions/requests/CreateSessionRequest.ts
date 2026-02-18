import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSessionRequest {
  @ApiProperty({
    description: 'The device token of the device to send the notification to',
    type: String,
    required: true
  })
  @IsString()
  deviceToken: string
}
