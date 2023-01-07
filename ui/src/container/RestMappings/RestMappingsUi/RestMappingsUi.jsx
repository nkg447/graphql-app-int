import { useAtom } from "jotai";
import * as React from "react";
import Store from "../../../store/store";
import RestMapping from "./RestMapping/RestMapping";
import { cloneDeep } from "lodash";

function RestMappingsUi(props) {
  const [restMappings, setRestMappings] = useAtom(Store.restMappingsAtom);
  const updateRestMappings = (restMappings) => {
    setRestMappings(cloneDeep(restMappings));
  };

  return (
    <div>
      {restMappings.map((mapping) => (
        <RestMapping
          updateRestMappings={updateRestMappings}
          mapping={mapping}
          key={mapping.name}
        />
      ))}
    </div>
  );
}

export default RestMappingsUi;
