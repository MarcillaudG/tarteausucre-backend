import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FirebaseAdminProvider } from './FirebaseAdminProvider'

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'INotificationSenderProvider',
      useClass: FirebaseAdminProvider
    }
  ],
  exports: [
    {
      provide: 'INotificationSenderProvider',
      useClass: FirebaseAdminProvider
    }
  ]
})
export class FirebaseModule {}
