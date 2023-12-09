import { Grid } from "@mui/material";
import { SelectInput } from "react-admin";

export const MeniscectomiaForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectInput
          source="type"
          label="Tipo"
          choices={[
            { id: "parcial", name: "Parcial" },
            { id: "total", name: "Total" },
          ]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          source="relativePosition"
          label="Posição relativa"
          choices={[
            { id: "lateral", name: "Lateral" },
            { id: "medial", name: "Medial" },
          ]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          source="portion"
          label="Porção"
          choices={[
            { id: "corno-anterior", name: "Corno anterior" },
            { id: "corpo-menisco", name: "Corpo meniscal" },
            { id: "cisto-parameniscal", name: "Cisto parameniscal" },
            { id: "corno-posterior", name: "Corno posterior" },
          ]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          source="injuryRegion"
          label="Zona"
          choices={[
            { id: "branco-branco", name: "Branco/Branca" },
            { id: "branco-vermelha", name: "Branco/Vermelha" },
            { id: "vermelho-vermelha", name: "Vermelho/Vermelha" },
          ]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <SelectInput
          source="injuryExtension"
          label="Extensão"
          choices={[
            { id: "parcial", name: "Parcial" },
            { id: "total", name: "Total" },
          ]}
          required
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
