import { Grid } from "@mui/material";
import { useState } from "react";
import { BooleanInput, SelectInput } from "react-admin";

// const lesionMorphologyChoices = [
//   { id: "Horizontal", name: "Horizontal" },
//   { id: "Longitudinal", name: "Longitudinal" },
//   { id: "Radial", name: "Radial" },
//   { id: "Raiz", name: "Raiz" },
//   { id: "Deslocada", name: "Deslocada" },
//   { id: "Complexa", name: "Complexa" },
//   { id: "Alça de balde", name: "Alça de balde" },
//   {
//     id: 'Fibrilação da borda livre ("Fraying")',
//     name: 'Fibrilação da borda livre ("Fraying")',
//   },
// ];

const relativePortionChoices = [
  { id: "Lateral", name: "Lateral" },
  { id: "Medial", name: "Medial" },
];

export const Nguyen2014MorphologyMeniscusLesion = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [hasCyst, setHasCyst] = useState();

  return (
    <>
      <Grid item xs={4}>
        <BooleanInput
          source="horizontal"
          label="Horizontal?"
          fullWidth
          onChange={(e) => setIsHorizontal(e.target.checked)}
        />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="longitudinal" label="Longitudinal?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="radial" label="Radial?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="root" label="Raiz?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="displaced" label="Deslocado?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="complex" label="Complexo?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput source="bucketHandle" label="Alça de balde?" fullWidth />
      </Grid>
      <Grid item xs={4}>
        <BooleanInput
          source="fraying"
          label='Fibrilação da borda livre ("Fraying")?'
          fullWidth
        />
      </Grid>
      {isHorizontal && (
        <Grid item xs={4}>
          <BooleanInput
            source="parameniscalCyst"
            label="Possui cisto parameniscal?"
            onChange={(e) => setHasCyst(e.target.checked)}
            fullWidth
          />
        </Grid>
      )}
      {hasCyst && (
        <Grid item xs={12}>
          <SelectInput
            fullWidth
            source="relativePortion"
            label="Posição relativa do cisto parameniscal"
            choices={relativePortionChoices}
            required
          />
        </Grid>
      )}
    </>
  );
};
