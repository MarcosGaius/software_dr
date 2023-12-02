import { Admin, Resource, ListGuesser, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { PiClipboardBold, PiUserBold } from "react-icons/pi";
import { SurgeryResource } from "./components/surgery";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {SurgeryResource()}
    <Resource
      name="classification"
      options={{
        label: "Classificações",
      }}
      icon={PiClipboardBold}
      list={ListGuesser}
      // edit={EditGuesser}
      show={ShowGuesser}
    />
    <Resource
      name="patient"
      options={{
        label: "Pacientes",
      }}
      icon={PiUserBold}
      list={ListGuesser}
      // edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
