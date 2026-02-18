import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './config/configuration'
import { MigrationsProvider } from './data/database/migrations/MigrationsProvider'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const migrationRunner = app.get(MigrationsProvider)
  try {
    await migrationRunner.runMigrations()
    console.log('Migrations completed successfully.')
  } catch (error) {
    console.error('Migrations failed:', error)
  }
  await app.listen(config().http.port, config().http.host)
  console.log(`Server is running on ${config().http.host}:${config().http.port}`)
}
bootstrap()
