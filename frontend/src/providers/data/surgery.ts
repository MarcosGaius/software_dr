import { CreateParams, DataProvider } from "react-admin";

export const handleSurgeryCreate = (
  resource: string,
  params: CreateParams<any>,
  dataProvider: DataProvider
) => {
  const {
    patient,
    type,
    relativePosition,
    portion,
    injuryRegion,
    injuryExtension,
    posteromedialAccess,
    posterolateralAccess,
    sutureTechnique,
    sutureVariation,
    ...data
  } = params.data;

  const procedure: any = {};

  switch (data.procedureType) {
    case "meniscectomia":
      procedure.type = type;
      procedure.relativePosition = relativePosition;
      procedure.portion = portion;
      procedure.injuryRegion = injuryRegion;
      procedure.injuryExtension = injuryExtension;
      break;
    case "sutura-meniscal":
      procedure.relativePosition = relativePosition;
      procedure.portion = portion;
      procedure.injuryRegion = injuryRegion;
      procedure.injuryExtension = injuryExtension;
      procedure.posteromedialAccess = posteromedialAccess;
      procedure.posterolateralAccess = posterolateralAccess;
      procedure.sutureTechnique = sutureTechnique;
      procedure.sutureVariation = sutureVariation;
      break;
    default:
      break;
  }

  const payload = {
    ...data,
    structure: "menisco", // Fixo até termos como escolher outros tipos de estruturas
    procedure,
  };

  return dataProvider.create(`${resource}/patient/${patient}`, {
    ...params,
    data: payload,
  });
};
