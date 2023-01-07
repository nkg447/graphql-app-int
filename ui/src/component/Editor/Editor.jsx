import * as React from "react";
import AceEditor from "react-ace";
import PropTypes from "prop-types";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-graphqlschema";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Config from "../../config";

function Editor(props) {
  const { mode, value, changeHandler, ...other } = props;
  const [text, setText] = React.useState(value);
  return (
    <AceEditor
      mode={mode}
      theme={Config.editorTheme}
      onChange={setText}
      name="editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: "100%" }}
      value={text}
      onBlur={() => changeHandler(text)}
      {...other}
    />
  );
}

Editor.propTypes = {
  mode: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
  value: PropTypes.string,
};

export default Editor;
