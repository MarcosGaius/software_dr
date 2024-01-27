import { Grid } from "@mui/material";
import { BooleanInput, NumberInput, SelectInput, minValue } from "react-admin";
import { AutoCompleteFreeSolo } from "../../base/autoCompleteFreeSolo";
import { useState } from "react";

export const SuturaMeniscalForm = () => {
  const [position, setPosition] = useState("");
  const [portion, setPortion] = useState("");
  const [sutureTechnique, setSutureTechnique] = useState("");

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectInput
          source="relativePosition"
          label="Posição relativa"
          choices={[
            { id: "lateral", name: "Lateral" },
            { id: "medial", name: "Medial" },
          ]}
          onChange={(e) => setPosition(e.target.value)}
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
          onChange={(e) => setPortion(e.target.value)}
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
      <Grid item xs={4}>
        <AutoCompleteFreeSolo
          name="sutureTechnique"
          label="Técnica de sutura"
          multiple={false}
          options={[
            { id: "all-inside", name: "All-inside" },
            { id: "outside-in", name: "Outside-in" },
            { id: "inside-out", name: "Inside-out" },
          ]}
          onChange={(e, value) => setSutureTechnique(value)}
          required
        />
      </Grid>
      {sutureTechnique === "outside-in" ||
        (sutureTechnique === "inside-out" && (
          <Grid item xs={4}>
            <SelectInput
              source="sutureVariation"
              label="Variação de sutura"
              choices={[
                { id: "parcial", name: "Parcial" },
                { id: "total", name: "Total" },
              ]}
              required
              fullWidth
            />
          </Grid>
        ))}
      {sutureTechnique === "all-inside" && (
        <Grid item xs={4}>
          <AutoCompleteFreeSolo
            name="sutureVariation"
            label="Variação de sutura"
            multiple={false}
            options={[
              { id: "precision", name: "Precision" },
              { id: "fast-fix", name: "Fast-fix" },
            ]}
            required
          />
        </Grid>
      )}
      {["outside-in", "inside-out", "all-inside"].includes(sutureTechnique) && (
        <Grid item xs={4}>
          <NumberInput
            source="deviceQuantity"
            name="deviceQuantity"
            label="Quantidade de dispositivos"
            required
            validate={[minValue(0)]}
            fullWidth
          />
        </Grid>
      )}
      {position === "medial" && portion === "corno-posterior" && (
        <Grid item xs={4} container alignItems="center">
          <BooleanInput
            source="posteromedialAccess"
            label="Acesso posteromedial?"
            required
            fullWidth
          />
        </Grid>
      )}
      {position === "lateral" && portion === "corno-posterior" && (
        <Grid item xs={4} container alignItems="center">
          <BooleanInput
            source="posterolateralAccess"
            label="Acesso posterolateral?"
            required
            fullWidth
          />
        </Grid>
      )}
    </Grid>
  );
};
