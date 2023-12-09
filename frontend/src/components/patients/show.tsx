import {
  ArrayField,
  Datagrid,
  DateField,
  FunctionField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { classificationChoices } from "../classification/create";
import {
  contralateralChoices,
  injuryMechanismChoices,
  memberChoices,
  memberPositionChoices,
  structureChoices,
} from "../../utils/choices";
import { procedureChoices } from "../surgery/create";

export const ShowPatient = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <FunctionField
          label="Nome"
          render={(record: any) => `${record.firstName} ${record.lastName}`}
        />
        <DateField label="Data de nascimento" source="birthDate" />
        <ArrayField source="classifications" label="Classificações">
          <Datagrid
            bulkActionButtons={false}
            rowClick={(id) => `/classification/${id}/show`}
          >
            <FunctionField
              label="Classificação"
              render={(record: any) =>
                classificationChoices.find((e) => e.id === record.procedure)
                  ?.name ?? ""
              }
            />
            <SelectField
              source="structure"
              label="Estrutura"
              choices={structureChoices}
            />
            <DateField source="createdAt" label="Criado em" />
          </Datagrid>
        </ArrayField>
        <ArrayField source="surgeries" label="Cirurgias">
          <Datagrid
            bulkActionButtons={false}
            rowClick={(id) => `/surgery/${id}/show`}
          >
            <SelectField
              source="member"
              label="Membro"
              choices={memberChoices}
            />
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
          </Datagrid>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  );
};
