import * as React from "react";
import AceEditor from "react-ace";
import { useAtom } from "jotai";
import Store from "../../../store/store";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

function RestMappingsEditor(props) {
  const [restMappingsText] = useAtom(Store.restMappingsTextAtom);
  const [mappingsText, setMappingsText] = React.useState(restMappingsText);
  const [_, setRestMappings] = useAtom(Store.restMappingsAtom);
  return (
    <AceEditor
      mode="json"
      theme="twilight"
      onChange={(data) => setMappingsText(data)}
      name="restmappings-editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: "100%" }}
      value={mappingsText}
      onBlur={() => {
        setRestMappings(JSON.parse(mappingsText));
      }}
    />
  );
}
RestMappingsEditor.propTypes = {};

export default RestMappingsEditor;
