import { Grid } from "@mui/material";
import { useState } from "react";
import { BooleanInput, SelectInput } from "react-admin";

const lesionMorphologyChoices = [
  { id: "Horizontal", name: "Horizontal" },
  { id: "Longitudinal", name: "Longitudinal" },
  { id: "Radial", name: "Radial" },
  { id: "Raiz", name: "Raiz" },
  { id: "Deslocada", name: "Deslocada" },
  { id: "Complexa", name: "Complexa" },
  { id: "Alça de balde", name: "Alça de balde" },
  {
    id: 'Fibrilação da borda livre ("Fraying")',
    name: 'Fibrilação da borda livre ("Fraying")',
  },
];

const relativePortionChoices = [
  { id: "Lateral", name: "Lateral" },
  { id: "Medial", name: "Medial" },
];

export const Nguyen2014MorphologyMeniscusLesion = () => {
  const [selectedMorphology, setSelectedMorphology] = useState();
  const [hasCyst, setHasCyst] = useState();

  return (
    <>
      <Grid item xs={12}>
        <SelectInput
          fullWidth
          source="morphology"
          label="Morfologia"
          choices={lesionMorphologyChoices}
          onChange={(e) => setSelectedMorphology(e.target.value)}
          required
        />
      </Grid>
      {selectedMorphology === "Horizontal" && (
        <Grid item xs={12}>
          <BooleanInput
            source="parameniscalCyst"
            label="Possui cisto parameniscal?"
            onChange={(e) => setHasCyst(e.target.checked)}
            required
            fullWidth
          />
        </Grid>
      )}
      {hasCyst && (
        <Grid item xs={12}>
          <SelectInput
            fullWidth
            source="relativePortion"
            label="Posição relativa"
            choices={relativePortionChoices}
            required
          />
        </Grid>
      )}
    </>
  );
};
