import {
  List,
  Datagrid,
  DateField,
  SelectField,
  FunctionField,
} from "react-admin";
import { classificationChoices } from "./create";

export const ClassificationList = () => (
  <List>
    <Datagrid rowClick="show">
      <SelectField
        source="structure"
        label="Estrutura"
        choices={[{ id: "menisco", name: "Menisco" }]}
      />
      <SelectField
        source="procedure"
        label="Classificação"
        choices={classificationChoices}
      />
      <FunctionField
        label="Nome do paciente"
        render={(record: any) =>
          `${record.patient.firstName} ${record.patient.lastName}`
        }
      />
      ;
      <DateField source="createdAt" label="Data de criação" />
    </Datagrid>
  </List>
);
