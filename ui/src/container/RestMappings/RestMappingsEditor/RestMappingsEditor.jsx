import * as React from "react";
import { useAtom } from "jotai";
import Store from "../../../store/store";
import Editor from "../../../component/Editor/Editor";

function RestMappingsEditor(props) {
  const [restMappingsText] = useAtom(Store.restMappingsTextAtom);
  const [mappingsText, setMappingsText] = React.useState(restMappingsText);
  const [_, setRestMappings] = useAtom(Store.restMappingsAtom);
  return (
    <Editor
      mode="json"
      value={mappingsText}
      changeHandler={(mappingsText) => {
        setRestMappings(JSON.parse(mappingsText));
      }}
    />
  );
}
RestMappingsEditor.propTypes = {};

export default RestMappingsEditor;
