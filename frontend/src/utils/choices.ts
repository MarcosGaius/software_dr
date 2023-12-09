const memberChoices = [{ id: "joelho", name: "Joelho" }];

const memberPositionChoices = [
  { id: "esquerda", name: "Esquerda" },
  { id: "direita", name: "Direita" },
  { id: "ambos", name: "Ambos" },
];

const structureChoices = [{ id: "menisco", name: "Menisco" }];

const injuryMechanismChoices = [
  { id: "nao-traumatico", name: "Não traumático" },
  { id: "traumatico", name: "Traumático" },
];

const contralateralChoices = [
  { id: "anormal", name: "Anormal" },
  { id: "normal", name: "Normal" },
];

const procedureChoices = [
  { id: "meniscectomia", name: "Meniscectomia" },
  { id: "sutura-meniscal", name: "Sutura Meniscal" },
];

const classificationChoices = [
  {
    id: "thaunat-greif",
    name: "Classificação de Thaunat et al. Modificada por Greif et al.(2020)",
  },
  {
    id: "anderson-2011-meniscus-lesion",
    name: "Classificação das Lesões Meniscais (Anderson et al, 2011)",
  },
  {
    id: "laprade-2015-medial-lateral-meniscus-root-rupture",
    name: "Ruptura da Raiz Meniscal medial e lateral (LaPrade, 2015)",
  },
  {
    id: "nguyen-2014-morphology-meniscus-lesion",
    name: "Tipos de Lesões Meniscal Quanto a Morfologia (Nguyen et al. 2014)",
  },
  {
    id: "ramp-meniscus-lesion",
    name: "Lesão Meniscal em Rampa(Thaunat et al, 2021)",
  },
];

export {
  structureChoices,
  memberPositionChoices,
  memberChoices,
  injuryMechanismChoices,
  contralateralChoices,
  procedureChoices,
  classificationChoices,
};
