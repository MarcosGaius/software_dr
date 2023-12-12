import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  FunctionField,
} from "react-admin";
import {
  contralateralChoices,
  injuryMechanismChoices,
  memberChoices,
  memberPositionChoices,
  procedureChoices,
  structureChoices,
} from "../../utils/choices";

export const SurgeryList = () => (
  <List>
    <Datagrid rowClick="show">
      <SelectField source="member" label="Membro" choices={memberChoices} />
      <SelectField
        source="memberPosition"
        label="Posição do membro"
        choices={memberPositionChoices}
      />
      <DateField source="injuredAt" label="Data da lesão" />
      <SelectField
        source="structure"
        label="Estrutura"
        choices={structureChoices}
      />
      <SelectField
        source="injuryMechanism"
        label="Mecanismo de lesão"
        choices={injuryMechanismChoices}
      />
      <SelectField
        source="contralateral"
        label="Contralateral"
        choices={contralateralChoices}
      />
      <TextField source="limitations" label="Limitações" />
      <TextField source="complaints" label="Reclamações" />
      <TextField source="icd" label="CID" />
      <SelectField
        source="procedure"
        label="Procedimento"
        choices={procedureChoices}
      />
      <DateField source="createdAt" label="Data de criação" />
      <FunctionField
        label="Paciente"
        render={(rec: any) =>
          `${rec.patient.firstName} ${rec.patient.lastName} - ${rec.patient.cpf}`
        }
      />
    </Datagrid>
  </List>
);
