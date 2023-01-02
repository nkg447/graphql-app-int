import * as React from "react";
import AceEditor from "react-ace";
import { useAtom } from "jotai";
import Store from "../../../store/store";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

function ResolverMappingsEditor(props) {
  const [resolverMappingsText] = useAtom(Store.resolverMappingsTextAtom);
  const [mappingsText, setMappingsText] = React.useState(resolverMappingsText);
  const [_, setResolverMappings] = useAtom(Store.resolverMappingsAtom);
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
        setResolverMappings(JSON.parse(mappingsText));
      }}
    />
  );
}
ResolverMappingsEditor.propTypes = {};

export default ResolverMappingsEditor;
