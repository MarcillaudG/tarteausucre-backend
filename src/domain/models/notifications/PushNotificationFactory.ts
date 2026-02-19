import { PhaseName, PhaseNameWithDescription } from '../phases/PhaseName'
import { NotificationType } from './NotificationType'
import { PushNotification } from './PushNotification'

export class PushNotificationFactory {
  static newSessionStartedFactory(deviceTokens: string[], notificationId: string): PushNotification {
    return {
      body: 'Une nouvelle compétition commence !',
      type: NotificationType.NEW_SESSION_STARTED,
      title: 'Nouvelle compétition',
      deviceTokens: deviceTokens,
      notificationId: notificationId
    }
  }

  static newPhaseStartedFactory(p: { phaseName: PhaseName, deviceTokens: string[], notificationId: string }): PushNotification {
    return {
      body: `${PhaseNameWithDescription[p.phaseName]}`,
      type: NotificationType.NEW_PHASE_STARTED,
      title: 'Une nouvelle étape commence !',
      deviceTokens: p.deviceTokens,
      notificationId: p.notificationId
    }
  }

  static pointsSetupFactory(p: {
    phaseName: PhaseName
    catPoints: number
    mikaPoints: number
    deviceTokens: string[]
    notificationId: string
  }): PushNotification {
    return {
      body: `${p.catPoints} points pour la team chat\n${p.mikaPoints} points pour la team mika`,
      type: NotificationType.POINTS_SETUP,
      title: `Bravo aux vainqueurs de la phase ${p.phaseName} !`,
      deviceTokens: p.deviceTokens,
      notificationId: p.notificationId
    }
  }

  static firstVictoryFactory(deviceTokens: string[], notificationId: string): PushNotification {
    return {
      body: 'Bravo à la team chat !',
      type: NotificationType.FIRST_VICTORY,
      title: 'Bravo à la team chat !',
      deviceTokens: deviceTokens,
      notificationId: notificationId
    }
  }

  static deusExMachinaFactory(deviceTokens: string[], notificationId: string): PushNotification {
    return {
      body: 'Deus ex machina !',
      type: NotificationType.DEUS_EX_MACHINA,
      title: 'Deus ex machina !',
      deviceTokens: deviceTokens,
      notificationId: notificationId
    }
  }

  static lastVictoryFactory(deviceTokens: string[], notificationId: string): PushNotification {
    return {
      body: 'Bravo à la team mika !',
      type: NotificationType.LAST_VICTORY,
      title: 'Bravo à la team mika !',
      deviceTokens: deviceTokens,
      notificationId: notificationId
    }
  }

  static endOfSessionFactory(deviceTokens: string[], notificationId: string): PushNotification {
    return {
      body: `La compétition est terminée !\n Merci d'avoir joué ! (nous sommes reteenus dans le sous-sol, venez nous chercher)`,
      type: NotificationType.END_OF_SESSION,
      title: 'La compétition est terminée !',
      deviceTokens: deviceTokens,
      notificationId: notificationId
    }
  }
}
