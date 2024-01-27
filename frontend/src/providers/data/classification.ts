import { CreateParams, DataProvider } from "react-admin";

export const handleClassificationCreate = (
  resource: string,
  params: CreateParams<any>,
  dataProvider: DataProvider
) => {
  const { patient, classificationType, ...data } = params.data;

  const classification: any = {};

  switch (classificationType) {
    case "thaunat-greif":
      classification.lesionType = data.lesionType;
      classification.lesionVariation = data.lesionVariation;
      break;
    case "ramp-meniscus-lesion":
      classification.lesionType = data.lesionType;
      break;
    case "nguyen-2014-morphology-meniscus-lesion":
      classification.horizontal = data.horizontal;
      classification.longitudinal = data.longitudinal;
      classification.radial = data.radial;
      classification.root = data.root;
      classification.displaced = data.displaced;
      classification.complex = data.complex;
      classification.bucketHandle = data.bucketHandle;
      classification.fraying = data.fraying;
      classification.parameniscalCyst = data.parameniscalCyst;
      classification.relativePortion = data.relativePortion;
      break;
    case "laprade-2015-medial-lateral-meniscus-root-rupture":
      classification.lesionType = data.lesionType;
      classification.lesionVariation = data.lesionVariation;
      break;
    case "anderson-2011-meniscus-lesion":
      classification.lesionType = data.lesionType;
      classification.lesionExtension = data.lesionExtension;
      classification.lesionLocation = data.lesionLocation;
      classification.centerToPoplitealHiatus = !!data.centerToPoplitealHiatus;
      classification.lesionPattern = data.lesionPattern;
      classification.tissueQuality = data.tissueQuality;
      classification.lesionLength = data.lesionLength;
      classification.excisedQuantity = data.excisedQuantity;
      break;
    default:
      break;
  }

  const payload = {
    structure: "menisco", // Fixo até termos como escolher outros tipos de estruturas
    classificationType,
    classification,
  };

  return dataProvider.create(`${resource}/patient/${patient}`, {
    ...params,
    data: payload,
  });
};
