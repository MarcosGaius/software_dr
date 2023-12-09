import { Resource } from "react-admin";
import { PiUserBold } from "react-icons/pi";
import { PatientList } from "./list";
import { CreatePatient } from "./create";
import { ShowPatient } from "./show";

export const PatientResource = () => (
  <Resource
    name="patient"
    options={{
      label: "Pacientes",
    }}
    icon={PiUserBold}
    list={PatientList}
    create={CreatePatient}
    show={ShowPatient}
    hasShow
  />
);
