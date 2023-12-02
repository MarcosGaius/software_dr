import { List, Datagrid, TextField, DateField, SelectField } from "react-admin";

export const SurgeryList = () => (
  <List>
    <Datagrid>
      <SelectField
        source="member"
        label="Membro"
        choices={[{ id: "joelho", name: "Joelho" }]}
      />
      <SelectField
        source="memberPosition"
        label="Posição do membro"
        choices={[
          { id: "esquerda", name: "Esquerda" },
          { id: "direita", name: "Direita" },
          { id: "ambos", name: "Ambos" },
        ]}
      />
      <DateField source="injuredAt" label="Data da lesão" />
      <SelectField
        source="structure"
        label="Estrutura"
        choices={[{ id: "menisco", name: "Menisco" }]}
      />
      <SelectField
        source="injuryMechanism"
        label="Mecanismo de lesão"
        choices={[
          { id: "nao-traumatico", name: "Não traumático" },
          { id: "traumatico", name: "Traumático" },
        ]}
      />
      <SelectField
        source="contralateral"
        label="Contralateral"
        choices={[
          { id: "anormal", name: "Anormal" },
          { id: "normal", name: "Normal" },
        ]}
      />
      <TextField source="limitations" label="Limitações" />
      <TextField source="complaints" label="Reclamações" />
      <TextField source="icd" label="CID" />
      <SelectField
        source="procedure"
        label="Procedimento"
        choices={[
          { id: "meniscectomia", name: "Meniscectomia" },
          { id: "sutura-meniscal", name: "Sutura Meniscal" },
        ]}
      />
      <DateField source="createdAt" label="Data de criação" />
    </Datagrid>
  </List>
);
