/* eslint-disable no-process-env, @typescript-eslint/explicit-module-boundary-types */
import * as process from 'process'

function requireEnv(variable: string): string {
  const value = process.env[variable]
  if (value === undefined) {
    throw new Error(`Environment variable ${variable} is required but not defined.`)
  }
  return value
}

export const config = () => ({
  nodeEnv: process.env.NODE_ENV ?? 'develop',
  http: {
    host: process.env.HOST ?? '0.0.0.0',
    port: parseInt(process.env.PORT ?? '3000')
  },
  db: {
    uri: process.env.DB_URI,
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    name: process.env.DB_NAME ?? 'nereva-database',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS ?? '9')
  },
  firebase: {
    projectId: requireEnv('FIREBASE_PROJECT_ID'),
    privateKey: requireEnv('FIREBASE_PRIVATE_KEY'),
    clientEmail: requireEnv('FIREBASE_CLIENT_EMAIL')
  }
})
