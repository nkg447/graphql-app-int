import * as React from "react";
import AceEditor from "react-ace";
import { useAtom } from "jotai";

import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";
import Store from "../../../store/store";
import { schemaComposer } from "graphql-compose";

const { buildSchema } = require("graphql");

function SchemaEditor(props) {
  const [graphQlSchemaText] = useAtom(Store.graphQlSchemaTextAtom);
  const [schema, setSchema] = React.useState(graphQlSchemaText);
  const [_, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  return (
    <AceEditor
      mode="graphqlschema"
      theme="twilight"
      onChange={(data) => setSchema(data)}
      name="graphqlschema-editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: "100%" }}
      value={schema}
      onBlur={() => {
        schemaComposer.clear();
        setGraphQlSchema(schemaComposer.merge(buildSchema(schema)).buildSchema());
      }}
    />
  );
}

export default SchemaEditor;
