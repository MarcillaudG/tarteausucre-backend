import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/configuration'
import { PostgresModule } from './data/database/postgres.module'
import { FirebaseModule } from './data/firebase/firebase.module'
import { NotificationService } from './domain/services/notifications/NotificationService'
import { SessionService } from './domain/services/sessions/SessionService'
import { SessionController } from './web/api/v1/sessions/SessionController'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '../.env')],
      isGlobal: true,
      load: [config]
    }),
    PostgresModule,
    FirebaseModule
  ],
  controllers: [SessionController],
  providers: [SessionService, NotificationService]
})
export class AppModule {}
