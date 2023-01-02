import { useAtom } from "jotai";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Store from "../../../store/store";
import RestMapping from "./RestMapping/RestMapping";

function RestMappingsUi(props) {
  const [restMappings] = useAtom(Store.restMappingsAtom);

  return (
    <Typography style={{ overflow: "scroll", height: "75vh" }}>
      <Typography color="text.primary">
        {restMappings.map((mapping, key) => (
          <RestMapping mapping={mapping} key={key} />
        ))}
      </Typography>
    </Typography>
  );
}

export default RestMappingsUi;
