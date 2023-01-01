import * as React from "react";
import AceEditor from "react-ace";
import { atom, useAtom } from "jotai";

import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import Store from "../../../store/store";

const { buildSchema } = require('graphql');

function SchemaEditor(props) {
  const [graphQlSchemaText, setGraphQlSchemaText] = useAtom(Store.graphQlSchemaTextAtom);
  
  return (
    <AceEditor
      mode="graphqlschema"
      theme="twilight"
      onChange={(data) => setGraphQlSchemaText(data)}
      name="graphqlschema-editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: "100%" }}
      value={graphQlSchemaText}
    />
  );
}

export default SchemaEditor;
