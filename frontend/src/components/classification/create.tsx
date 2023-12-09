import {
  Create,
  SelectInput,
  TabbedForm,
  useGetList,
  useNotify,
} from "react-admin";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import {
  Anderson2011MeniscusLesion,
  LaPrade2015MedialLateralMeniscusRootRupture,
  Nguyen2014MorphologyMeniscusLesion,
  RampMeniscusLesion,
  ThaunatGrief,
} from "./variations";

export const classificationChoices = [
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
    name: "Lesão Meniscal em Rampa (Thaunat et al, 2021)",
  },
  {
    id: "thaunat-greif",
    name: "Classificação de Thaunat et al. Modificada por Greif et al. (2020)",
  },
];

const classificationMap = {
  "anderson-2011-meniscus-lesion": <Anderson2011MeniscusLesion />,
  "laprade-2015-medial-lateral-meniscus-root-rupture": (
    <LaPrade2015MedialLateralMeniscusRootRupture />
  ),
  "nguyen-2014-morphology-meniscus-lesion": (
    <Nguyen2014MorphologyMeniscusLesion />
  ),
  "ramp-meniscus-lesion": <RampMeniscusLesion />,
  "thaunat-greif": <ThaunatGrief />,
};

export const CreateClassification = () => {
  const { data, isLoading } = useGetList("patient");
  const [classification, setClassification] = useState("");

  const notify = useNotify();

  const onSuccess = () => {
    notify("Classificação criada com sucesso!", { type: "success" });
  };

  const onError = () => {
    notify(
      "Erro ao criar a classificação, tente novamente. Se o problema persistir entre em contato com o suporte.",
      { type: "error" }
    );
  };

  return (
    <Create mutationOptions={{ onSuccess, onError }}>
      <TabbedForm id="classification" syncWithLocation={false}>
        <TabbedForm.Tab label="Classificação">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectInput
                source="patient"
                label="Paciente"
                optionText={({ firstName, lastName, cpf }) => {
                  return `${firstName} ${lastName} - ${cpf}`;
                }}
                optionValue="id"
                isLoading={isLoading}
                choices={data}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput
                fullWidth
                source="classificationType"
                label="Classificação"
                choices={classificationChoices}
                onChange={(e) =>
                  setClassification(
                    classificationChoices.find((p) => p.id === e.target.value)
                      ?.id ?? ""
                  )
                }
                required
              />
            </Grid>
            {classificationMap[
              classification as keyof typeof classificationMap
            ] ?? (
              <Grid item xs={12}>
                <Typography variant="body2">
                  Escolha uma classificação para preencher os detalhes!
                </Typography>
              </Grid>
            )}
          </Grid>
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};
export default CreateClassification;
