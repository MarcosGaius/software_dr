import {
  Create,
  DateInput,
  TabbedForm,
  TextInput,
  regex,
  useNotify,
} from "react-admin";
import { Grid } from "@mui/material";

export const CreatePatient = () => {
  const notify = useNotify();

  const onSuccess = () => {
    notify("Classificação criada com sucesso!", { type: "success" });
  };

  const onError = () => {
    notify(
      "Erro ao criar a classificação, tente novamente. Se o problema persistir entre em contato com o suporte.",
      { type: "error" }
    );
  };

  return (
    <Create mutationOptions={{ onSuccess, onError }}>
      <TabbedForm id="classification" syncWithLocation={false}>
        <TabbedForm.Tab label="Classificação">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="firstName" label="Nome" required fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                source="lastName"
                label="Sobrenome"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput
                source="cpf"
                label="CPF"
                validate={regex(
                  /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
                  "Deve ser um CPF válido. Ex: 111.111.111-11"
                )}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput
                source="birthDate"
                label="Data de nascimento"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export default CreatePatient;
