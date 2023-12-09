import { Grid } from "@mui/material";
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
    id: "Tipo 3: Lesão parcial inferior da zona vermelha",
    name: "Tipo 3: Lesão parcial inferior da zona vermelha",
  },
  {
    id: "Tipo 4: Lesão completa na zona vermelha",
    name: "Tipo 4: Lesão completa na zona vermelha",
  },
  {
    id: "Tipo 5: Lesão completa dupla",
    name: "Tipo 5: Lesão completa dupla",
  },
];

export const RampMeniscusLesion = () => {
  return (
    <Grid item xs={12}>
      <SelectInput
        fullWidth
        source="lesionType"
        label="Tipo de lesão"
        choices={lesionTypeChoices}
        required
      />
    </Grid>
  );
};
