import {
  AutocompleteArrayInput,
  Create,
  DateInput,
  SelectInput,
  TabbedForm,
  TextInput,
  useGetList,
  useNotify,
} from "react-admin";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { AutoCompleteFreeSolo } from "../base/autoCompleteFreeSolo";
import { SuturaMeniscalForm } from "./procedures/sutura-meniscal-create";
import { MeniscectomiaForm } from "./procedures/meniscectomia";
import { procedureChoices } from "../../utils/choices";

const procedureMap = {
  "Sutura Meniscal": <SuturaMeniscalForm />,
  Meniscectomia: <MeniscectomiaForm />,
};

export const CreateSurgery = () => {
  const { data, isLoading } = useGetList("patient");
  const [procedure, setProcedure] = useState("");

  const notify = useNotify();

  const onSuccess = () => {
    notify("Cirurgia criada com sucesso!", { type: "success" });
  };

  const onError = () => {
    notify(
      "Erro ao criar cirurgia, tente novamente. Se o problema persistir entre em contato com o suporte.",
      { type: "error" }
    );
  };

  return (
    <Create mutationOptions={{ onSuccess, onError }}>
      <TabbedForm id="procedure" syncWithLocation={false}>
        <TabbedForm.Tab label="Dados gerais" id="general">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <DateInput
                source="injuredAt"
                label="Data da lesão"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="member"
                label="Membro"
                choices={[{ id: "joelho", name: "Joelho" }]}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="memberPosition"
                label="Posição do membro"
                choices={[
                  { id: "ambos", name: "Ambos" },
                  { id: "direita", name: "Direita" },
                  { id: "esquerda", name: "Esquerda" },
                ]}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="injuryMechanism"
                label="Mecanismo de lesão"
                choices={[
                  { id: "nao-traumatico", name: "Não traumático" },
                  { id: "traumatico", name: "Traumático" },
                ]}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectInput
                source="contralateral"
                label="Contralateral"
                choices={[
                  { id: "normal", name: "Anormal" },
                  { id: "anormal", name: "Normal" },
                ]}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AutoCompleteFreeSolo
                name="complaints"
                label="Queixas"
                multiple
                options={[
                  { id: "Falseios", name: "Falseios" },
                  { id: "Dor", name: "Dor" },
                  {
                    id: "Pós entorse vida diária",
                    name: "Pós entorse vida diária",
                  },
                  { id: "Pós entorse esporte", name: "Pós entorse esporte" },
                  {
                    id: "Acidente motociclistico",
                    name: "Acidente motociclistico",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AutocompleteArrayInput
                source="limitations"
                label="Limitações"
                choices={[
                  { id: "avd", name: "AVDs" },
                  { id: "trabalho", name: "Trabalho" },
                  { id: "esporte", name: "Esporte" },
                ]}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="icd" label="CID" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <SelectInput
                fullWidth
                source="procedureType"
                label="Procedimento"
                choices={procedureChoices}
                onChange={(e) =>
                  setProcedure(
                    procedureChoices.find((p) => p.id === e.target.value)
                      ?.name ?? ""
                  )
                }
                required
              />
            </Grid>
          </Grid>
        </TabbedForm.Tab>
        <TabbedForm.Tab
          label={`${procedure || "Escolha um procedimento."}`}
          id="procedure"
          disabled={!procedure}
        >
          {procedureMap[procedure as keyof typeof procedureMap] || (
            <Typography>Escolha um procedimento...</Typography>
          )}
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};
