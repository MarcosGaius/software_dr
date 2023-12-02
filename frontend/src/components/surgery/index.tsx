import { Resource } from "react-admin";
import { PiNeedleBold } from "react-icons/pi";
import { SurgeryList } from "./list";
import { CreateSurgery } from "./create";

export const SurgeryResource = () => (
  <Resource
    name="surgery"
    options={{
      label: "Cirurgias",
    }}
    icon={PiNeedleBold}
    list={SurgeryList}
    create={CreateSurgery}
  />
);
