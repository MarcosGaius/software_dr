import { Grid } from "@mui/material";
import { useState } from "react";
import { BooleanInput, NumberInput, SelectInput } from "react-admin";

const criteriaChoices = [
  { id: "Quanto a lesão", name: "Quanto a lesão" },
  { id: "Quanto a extensão da lesão", name: "Quanto a extensão da lesão" },
  { id: "Quanto a localização", name: "Quanto a localização" },
  { id: "Central ao Hiato popliteo", name: "Central ao Hiato popliteo" },
  { id: "Padrão de lesão", name: "Padrão de lesão" },
  { id: "Qualidade do tecido", name: "Qualidade do tecido" },
  { id: "Comprimento de lesão", name: "Comprimento de lesão" },
  {
    id: "Quantidade de menisco excisado",
    name: "Quantidade de menisco excisado",
  },
];

const lesionTypeChoices = [
  { id: "Parcial", name: "Parcial" },
  { id: "Completa", name: "Completa" },
];

const lesionExtensionChoices = [
  { id: "Zona 1 (até 3mm)", name: "Zona 1 (até 3mm)" },
  { id: "Zona 2 (3mm a 5mm)", name: "Zona 2 (3mm a 5mm)" },
  { id: "Zona 3 (maior que 5mm)", name: "Zona 3 (maior que 5mm)" },
];

const lesionLocationChoices = [
  { id: "Região Anterior", name: "Região Anterior" },
  { id: "Região Média (corpo)", name: "Região Média (corpo)" },
  { id: "Região Posterior", name: "Região Posterior" },
];

const lesionPatternChoices = [
  { id: "Longitudinal-vertical", name: "Longitudinal-vertical" },
  { id: "Horizontal radical", name: "Horizontal radical" },
  { id: "Flap", name: "Flap" },
  { id: "Vertical/Horizontal", name: "Vertical/Horizontal" },
  { id: "Complexa", name: "Complexa" },
];

const tissueQualityChoices = [
  { id: "Degenerativa", name: "Degenerativa" },
  {
    id: "Não degenerativa ou não determinado",
    name: "Não degenerativa ou não determinado",
  },
];

const FieldByCriteria = ({ criteria }: { criteria: string }) => {
  switch (criteria) {
    case "Quanto a lesão":
      return (
        <SelectInput
          fullWidth
          source="lesionType"
          label="Tipo de lesão"
          choices={lesionTypeChoices}
          required
        />
      );
    case "Quanto a extensão da lesão":
      return (
        <SelectInput
          fullWidth
          source="lesionExtension"
          label="Extensão da lesão"
          choices={lesionExtensionChoices}
          required
        />
      );
    case "Quanto a localização":
      return (
        <SelectInput
          fullWidth
          source="lesionLocation"
          label="Localização da lesão"
          choices={lesionLocationChoices}
          required
        />
      );
    case "Central ao Hiato popliteo":
      return (
        <BooleanInput
          source="centralToHiatoPopliteo"
          label="Central ao Hiato popliteo?"
          required
          fullWidth
        />
      );
    case "Padrão de lesão":
      return (
        <SelectInput
          fullWidth
          source="lesionPattern"
          label="Padrão da lesão"
          choices={lesionPatternChoices}
          required
        />
      );
    case "Qualidade do tecido":
      return (
        <SelectInput
          fullWidth
          source="tissueQuality"
          label="Qualidade do tecido"
          choices={tissueQualityChoices}
          required
        />
      );
    case "Comprimento de lesão":
      return (
        <NumberInput
          fullWidth
          source="lesionLength"
          label="Comprimento de lesão (em mm)"
          required
        />
      );
    case "Quantidade de menisco excisado":
      return (
        <NumberInput
          fullWidth
          source="excisedQuantity"
          label="Quantidade excisada (em decimal, e.g, 0.1 para 10%)"
          max={1}
          min={0}
          required
        />
      );
    default:
      return null;
  }
};

export const Anderson2011MeniscusLesion = () => {
  return (
    <>
      {/* <SelectInput
          fullWidth
          source="criteria"
          label="Critério"
          choices={criteriaChoices}
          required
        />
        <Grid item xs={12} container alignItems="center">
          <FieldByCriteria criteria={selectedCriteria} />
        </Grid> */}
      <Grid item xs={6}>
        <SelectInput
          fullWidth
          source="lesionType"
          label="Tipo de lesão"
          choices={lesionTypeChoices}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          fullWidth
          source="lesionExtension"
          label="Extensão da lesão"
          choices={lesionExtensionChoices}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          fullWidth
          source="lesionLocation"
          label="Localização da lesão"
          choices={lesionLocationChoices}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <BooleanInput
          source="centralToHiatoPopliteo"
          label="Central ao Hiato popliteo?"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          fullWidth
          source="lesionPattern"
          label="Padrão da lesão"
          choices={lesionPatternChoices}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <SelectInput
          fullWidth
          source="tissueQuality"
          label="Qualidade do tecido"
          choices={tissueQualityChoices}
          required
        />
      </Grid>
      <Grid item xs={6}>
        <NumberInput
          fullWidth
          source="lesionLength"
          label="Comprimento de lesão (em mm)"
          required
        />
      </Grid>
      <Grid item xs={6}>
        <NumberInput
          fullWidth
          source="excisedQuantity"
          label="Quantidade excisada (em decimal, e.g. 0.1 para 10%)"
          max={1}
          min={0}
          required
        />
      </Grid>
    </>
  );
};
