import { Grid } from "@mui/material";
import { useState } from "react";
import { SelectInput } from "react-admin";

const lesionTypeChoices = [
  {
    id: "Tipo 1: Lesão completa da junção capsulo sinovial",
    name: "Tipo 1: Lesão completa da junção capsulo sinovial",
  },
  {
    id: "Tipo 2: Lesão parcial superior na zona vermelha",
    name: "Tipo 2: Lesão parcial superior na zona vermelha",
  },
  {
    id: "Tipo 3: Lesão parcial inferior",
    name: "Tipo 3: Lesão parcial inferior",
  },
  { id: "Tipo 4: Lesão completa", name: "Tipo 4: Lesão completa" },
  { id: "Tipo 5: Lesão completa dupla", name: "Tipo 5: Lesão completa dupla" },
];

const type3LesionVariation = [
  {
    id: "(A) Lesão parcial inferior periférica",
    name: "(A) Lesão parcial inferior periférica",
  },
  {
    id: "(B) Lesão ligamento meniscotibial",
    name: "(B) Lesão ligamento meniscotibial",
  },
];

const type4LesionVariation = [
  {
    id: "(A) Lesão completa periférica no corno posterior (Não Capsular)",
    name: "(A) Lesão completa periférica no corno posterior (Não Capsular)",
  },
  {
    id: "(B) Lesão completa meniscocapsular",
    name: "(B) Lesão completa meniscocapsular",
  },
];

export const ThaunatGrief = () => {
  const [selectedLesionType, setSelectedLesionType] = useState();

  const isType3 = selectedLesionType === "Tipo 3: Lesão parcial inferior";
  const isType4 = selectedLesionType === "Tipo 4: Lesão completa";

  return (
    <>
      <Grid item xs={12}>
        <SelectInput
          fullWidth
          source="lesionType"
          label="Tipo de lesão"
          choices={lesionTypeChoices}
          onChange={(e) => setSelectedLesionType(e.target.value)}
          required
        />
      </Grid>
      {(isType3 || isType4) && (
        <Grid item xs={12}>
          <SelectInput
            fullWidth
            source="lesionVariation"
            label="Variação da lesão"
            choices={isType3 ? type3LesionVariation : type4LesionVariation}
            required
          />
        </Grid>
      )}
    </>
  );
};
