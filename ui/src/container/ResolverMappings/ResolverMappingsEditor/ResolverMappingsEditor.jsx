import * as React from "react";
import { useAtom } from "jotai";
import Store from "../../../store/store";
import Editor from "../../../component/Editor/Editor";

function ResolverMappingsEditor(props) {
  const [resolverMappingsText] = useAtom(Store.resolverMappingsTextAtom);
  const [mappingsText, setMappingsText] = React.useState(resolverMappingsText);
  const [_, setResolverMappings] = useAtom(Store.resolverMappingsAtom);
  return (
    <Editor
      mode="json"
      value={mappingsText}
      changeHandler={(mappingsText) => {
        setResolverMappings(JSON.parse(mappingsText));
      }}
    />
  );
}
ResolverMappingsEditor.propTypes = {};

export default ResolverMappingsEditor;
