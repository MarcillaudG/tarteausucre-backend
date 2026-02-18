export enum PhaseName {
  INTRODUCTION = 'INTRODUCTION',
  DEBATE = 'DEBATE',
  VR = 'VR',
  BLIND_TEST = 'BLIND_TEST',
  KARAOKE = 'KARAOKE',
  MIXOLOGY = 'MIXOLOGY',
  SARCASM = 'SARCASM',
  MUSICAL = 'MUSICAL',
  DISNEY = 'DISNEY',
  FIRST_END = 'FIRST_END',
  DUMBLEDOR = 'DUMBLEDOR',
  LAST_VICTORY = 'LAST_VICTORY'
}

export function nextPhaseName(phaseName: PhaseName): PhaseName {
  const phaseNames = Object.values(PhaseName)
  const index = phaseNames.indexOf(phaseName)
  return phaseNames[index + 1]
}

export const PhaseNameWithDescription: Record<PhaseName, string> = {
  [PhaseName.INTRODUCTION]: 'Introduction',
  [PhaseName.DEBATE]: 'LE DEBAAAAAAT !',
  [PhaseName.VR]: `Un monde virtuel t'attend !`,
  [PhaseName.BLIND_TEST]: 'Ferme les yeux et ouvre les oreilles !',
  [PhaseName.KARAOKE]: 'Chauffe ta voix !',
  [PhaseName.MIXOLOGY]: 'Lance un jet de dextérité !',
  [PhaseName.SARCASM]: 'Que ta langue soit aussi affutée que ton esprit !',
  [PhaseName.MUSICAL]: 'Dear Wicked Lion',
  [PhaseName.DISNEY]: 'Saura-tu répondre au quizz magique ?',
  [PhaseName.FIRST_END]: 'Victoire des chats !',
  [PhaseName.DUMBLEDOR]: 'Dumbledor',
  [PhaseName.LAST_VICTORY]: `Bravo à Mika ! (Si tu as choisis les chats, c'était pas prévu donc euuhhh..., il fait beau dehors non ?)`
}
