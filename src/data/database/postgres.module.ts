import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../../config/configuration'
import { DBNotification } from './notifications/DBNotification'
import { DBNotificationProvider } from './notifications/DBNotificationProvider'
import { DBPhase } from './phases/DBPhase'
import { DBPhaseProvider } from './phases/DBPhaseProvider'
import { DBSession } from './sessions/DBSession'
import { DBSessionProvider } from './sessions/DBSessionProvider'

export const POSTGRES_ENTITIES = [DBSession, DBPhase, DBNotification]

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature(POSTGRES_ENTITIES),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        host: config().db.host,
        port: +config().db.port,
        username: config().db.username,
        password: config().db.password,
        database: config().db.name,
        logging: false,
        entities: POSTGRES_ENTITIES,
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    {
      provide: 'ISessionProvider',
      useClass: DBSessionProvider
    },
    {
      provide: 'IPhaseProvider',
      useClass: DBPhaseProvider
    },
    {
      provide: 'INotificationProvider',
      useClass: DBNotificationProvider
    }
  ],
  exports: [
    TypeOrmModule,
    {
      provide: 'ISessionProvider',
      useClass: DBSessionProvider
    },
    {
      provide: 'IPhaseProvider',
      useClass: DBPhaseProvider
    },
    {
      provide: 'INotificationProvider',
      useClass: DBNotificationProvider
    }
  ]
})
export class PostgresModule {}
