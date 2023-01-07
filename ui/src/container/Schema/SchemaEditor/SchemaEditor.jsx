import * as React from "react";
import { useAtom } from "jotai";
import Store from "../../../store/store";
import { schemaComposer } from "graphql-compose";
import Editor from "../../../component/Editor/Editor";

const { buildSchema } = require("graphql");

function SchemaEditor(props) {
  const [graphQlSchemaText] = useAtom(Store.graphQlSchemaTextAtom);
  const [schema] = React.useState(graphQlSchemaText);
  const [_, setGraphQlSchema] = useAtom(Store.graphQlSchemaAtom);
  return (
    <Editor
      mode="graphqlschema"
      value={schema}
      changeHandler={(schema) => {
        schemaComposer.clear();
        setGraphQlSchema(
          schemaComposer.merge(buildSchema(schema)).buildSchema()
        );
      }}
    />
  );
}

export default SchemaEditor;
