import { Grid } from "@mui/material";
import { useState } from "react";
import { SelectInput } from "react-admin";

const lesionTypeChoices = [
  {
    id: "Tipo 1: Lesão parcial",
    name: "Tipo 1: Lesão parcial",
  },
  {
    id: "Tipo 2: Até 9mm da inserção",
    name: "Tipo 2: Até 9mm da inserção",
  },
  {
    id: "Tipo 2 A: Com Ligamento Menisco Femoral Posterior Intacto (variante)",
    name: "Tipo 2 A: Com Ligamento Menisco Femoral Posterior Intacto (variante)",
  },
  {
    id: "Tipo 3: Com alça de balde associada a raiz",
    name: "Tipo 3: Com alça de balde associada a raiz",
  },
  {
    id: "Tipo 4: Com lesão oblíqua na inserção (raiz)",
    name: "Tipo 4: Com lesão oblíqua na inserção (raiz)",
  },
  {
    id: "Tipo 5: Com fratura avulsão da inserção (raiz)",
    name: "Tipo 5: Com fratura avulsão da inserção (raiz)",
  },
];

const lesionVariation = [
  {
    id: "Até 3mm",
    name: "Até 3mm",
  },
  {
    id: "De 3mm a 6mm",
    name: "De 3mm a 6mm",
  },
  {
    id: "De 6mm a 9mm",
    name: "De 6mm a 9mm",
  },
];

export const LaPrade2015MedialLateralMeniscusRootRupture = () => {
  const [selectedLesionType, setSelectedLesionType] = useState();

  const isType2 = selectedLesionType === "Tipo 2: Até 9mm da inserção";

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
      {isType2 && (
        <Grid item xs={12}>
          <SelectInput
            fullWidth
            source="lesionVariation"
            label="Variação da lesão"
            choices={lesionVariation}
            required
          />
        </Grid>
      )}
    </>
  );
};
