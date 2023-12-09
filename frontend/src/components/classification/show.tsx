import {
  BooleanField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  useShowController,
} from "react-admin";
import { classificationChoices } from "./create";

const ClassificationFields = ({
  classification,
}: {
  classification: string;
}) => {
  switch (classification) {
    case "thaunat-greif":
      return (
        <SimpleShowLayout>
          <TextField label="Tipo de lesão" source="thaunatGreif.lesionType" />
          <TextField
            label="Variação da lesão"
            source="thaunatGreif.lesionVariation"
          />
        </SimpleShowLayout>
      );
    case "ramp-meniscus-lesion":
      return (
        <SimpleShowLayout>
          <TextField
            label="Tipo de lesão"
            source="rampMeniscusLesion.lesionType"
          />
        </SimpleShowLayout>
      );
    case "nguyen-2014-morphology-meniscus-lesion":
      return (
        <SimpleShowLayout>
          <TextField
            label="Morfologia"
            source="nguyen2014MorphologyMeniscusLesion.morphology"
          />
          <BooleanField
            label="Cisto paramensical"
            source="nguyen2014MorphologyMeniscusLesion.parameniscalCyst"
          />
          <TextField
            label="Porção relativa"
            source="nguyen2014MorphologyMeniscusLesion.relativePortion"
          />
        </SimpleShowLayout>
      );
    case "laprade-2015-medial-lateral-meniscus-root-rupture":
      return (
        <SimpleShowLayout>
          <TextField
            label="Tipo de lesão"
            source="laprade2015MedialLateralMeniscusRootRupture.lesionType"
          />
          <TextField
            label="Variação de lesão"
            source="laprade2015MedialLateralMeniscusRootRupture.lesionVariation"
          />
        </SimpleShowLayout>
      );
    case "anderson-2011-meniscus-lesion":
      return (
        <SimpleShowLayout>
          <TextField
            label="Critério"
            source="anderson2011MeniscusLesion.criteria"
          />
          <TextField
            label="Tipo da lesão"
            source="anderson2011MeniscusLesion.lesionType"
          />
          <TextField
            label="Extensão da lesão"
            source="anderson2011MeniscusLesion.lesionExtension"
          />
          <TextField
            label="Localização da lesão"
            source="anderson2011MeniscusLesion.lesionLocation"
          />
          <TextField
            label="Central ao Hiato popliteo"
            source="anderson2011MeniscusLesion.centerToPoplitealHiatus"
          />
          <TextField
            label="Qualidade do tecido"
            source="anderson2011MeniscusLesion.tissueQuality"
          />
          <TextField
            label="Tamanho da lesão"
            source="anderson2011MeniscusLesion.lesionLength"
          />
          <TextField
            label="Quantidade excisada"
            source="anderson2011MeniscusLesion.excisedQuantity"
          />
        </SimpleShowLayout>
      );
  }
};

export const ShowClassification = () => {
  const { record } = useShowController();

  if (!record) {
    return null;
  }

  return (
    <Show>
      <SimpleShowLayout>
        <SelectField
          source="procedure"
          label="Classificação"
          choices={classificationChoices}
        />
        <ClassificationFields classification={record.procedure} />
      </SimpleShowLayout>
    </Show>
  );
};
