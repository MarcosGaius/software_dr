import {
  List,
  Datagrid,
  DateField,
  FunctionField,
  TextField,
} from "react-admin";

export const PatientList = () => (
  <List>
    <Datagrid rowClick="show">
      <FunctionField
        label="Nome"
        render={(record: any) => `${record.firstName} ${record.lastName}`}
      />
      <TextField source="cpf" label="CPF" />
      <DateField source="birthDate" label="Data de nascimento" />
    </Datagrid>
  </List>
);
