import dataProvider from "./providers/data";
import { authProvider } from "./providers/auth";
import { Admin } from "react-admin";
import { SurgeryResource } from "./components/surgery";
import { ClassificationResource } from "./components/classification";
import { PatientResource } from "./components/patients";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {SurgeryResource()}
    {ClassificationResource()}
    {PatientResource()}
  </Admin>
);
