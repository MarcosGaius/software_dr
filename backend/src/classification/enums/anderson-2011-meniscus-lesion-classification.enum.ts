export enum Criteria {
  RegardingInjury = 'Quanto a lesão',
  RegardingExtension = 'Quanto a extensão da lesão',
  RegardingLocation = 'Quanto a localização',
  CenterToPoplitealHiatus = 'Central ao Hiato popliteo',
  RegardingPattern = 'Padrão de lesão',
  RegardingTissue = 'Qualidade do tecido',
  RegardingLength = 'Comprimento de lesão',
  RegardingExcised = 'Quantidade de menisco excisado',
}

export enum LesionType {
  Partial = 'Parcial',
  Complete = 'Completa',
}

export enum LesionExtension {
  Zone1 = 'Zona 1 (até 3mm)',
  Zone2 = 'Zona 2 (3mm a 5mm)',
  Zone3 = 'Zona 3 (maior que 5mm)',
}

export enum LesionLocation {
  Anterior = 'Região Anterior',
  Medial = 'Região Média (corpo)',
  Posterior = 'Região Posterior',
}

export enum LesionPattern {
  LongitudinalVertical = 'Longitudinal-vertical',
  HorizontalRadical = 'Horizontal radical',
  Flap = 'Flap',
  VerticalOrHorizontal = 'Vertical/Horizontal',
  Complex = 'Complexa',
}

export enum TissueQuality {
  Degenerative = 'Degenerativa',
  NonDegenerativeOrNotDetermined = 'Não degenerativa ou não determinado',
}
