import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddDeviceTokenRequest {
  @ApiProperty({
    description: 'The device token to add',
    type: String,
    required: true
  })
  @IsString()
  deviceToken: string
}   