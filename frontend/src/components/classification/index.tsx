import { Resource } from "react-admin";
import { PiClipboardBold } from "react-icons/pi";
import { ClassificationList } from "./list";
import { CreateClassification } from "./create";
import { ShowClassification } from "./show";

export const ClassificationResource = () => (
  <Resource
    name="classification"
    options={{
      label: "Classificações",
    }}
    icon={PiClipboardBold}
    list={ClassificationList}
    create={CreateClassification}
    show={ShowClassification}
    hasShow
  />
);
