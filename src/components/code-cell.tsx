import { useState} from "react";

import CodeEditor from "../components/code-editor";
import Preview from '../components/preview';
import bundle from "../bundler";

const CodeCell = () => {
    const [input, setInput] = useState("");
    const [code, setCode] = useState("");

    const onClick = async () => {
        const output = await bundle(input);
        setCode(output);
    }

    return (
        <div>
            <CodeEditor 
                initialValue='const helloWorld = "Hello World";'
                onChange={(input) => {
                    setInput(input)
                }}
                />
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

export default CodeCell;