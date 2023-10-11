import { useEffect, useState } from "react";

import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler";

import Resizeable from "./resizeable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizeable direction='vertical'>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizeable direction='horizontal'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(value) => setInput(value)}
          />
        </Resizeable>
        <Preview code={code} err={err} />
      </div>
    </Resizeable>
  );
};

export default CodeCell;
