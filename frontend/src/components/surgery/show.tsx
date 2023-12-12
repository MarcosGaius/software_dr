import {
  DateField,
  FunctionField,
  SelectField,
  Show,
  SimpleShowLayout,
  TextField,
  useShowController,
} from "react-admin";
import {
  contralateralChoices,
  injuryMechanismChoices,
  memberChoices,
  memberPositionChoices,
  procedureChoices,
  structureChoices,
} from "../../utils/choices";

// TODO: Transformar os texts fields abaixo em selectFields, para mostrar o nome bem formatado (Usar list.tsx em surgery de exemplo)

const ProcedureFields = ({ procedure }: { procedure: string }) => {
  switch (procedure) {
    case "sutura-meniscal":
      return (
        <SimpleShowLayout>
          <SelectField
            source="procedure"
            label="Procedimento"
            choices={procedureChoices}
          />
          <TextField
            label="Posição Relativa"
            source="suturaMeniscalProcedure.relativePosition"
          />
          <TextField label="Porção" source="suturaMeniscalProcedure.portion" />
          <TextField
            label="Região da Lesão"
            source="suturaMeniscalProcedure.injuryRegion"
          />
          <TextField
            label="Extensão da Lesão"
            source="suturaMeniscalProcedure.injuryExtension"
          />
        </SimpleShowLayout>
      );
    case "meniscectomia":
      return (
        <SimpleShowLayout>
          <SelectField
            source="procedure"
            label="Procedimento"
            choices={procedureChoices}
          />
          <TextField label="Tipo" source="meniscectomiaProcedure.type" />
          <TextField
            label="Posição Relativa"
            source="meniscectomiaProcedure.relativePosition"
          />
          <TextField label="Porção" source="meniscectomiaProcedure.portion" />
          <TextField
            label="Região da Lesão"
            source="meniscectomiaProcedure.injuryRegion"
          />
          <TextField
            label="Extensão da Lesão"
            source="meniscectomiaProcedure.injuryExtension"
          />
        </SimpleShowLayout>
      );
  }
};

export const ShowSurgery = () => {
  const { record } = useShowController();

  if (!record) {
    return null;
  }

  return (
    <Show>
      <SimpleShowLayout>
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
        <TextField source="complaints" label="Queixas" />
        <TextField source="icd" label="CID" />
        <DateField source="createdAt" label="Data de criação" />
        <FunctionField
          label="Paciente"
          render={(rec: any) =>
            `${rec.patient.firstName} ${rec.patient.lastName} - ${rec.patient.cpf}`
          }
        />
        <hr />
        <ProcedureFields procedure={record.procedure} />
      </SimpleShowLayout>
    </Show>
  );
};
