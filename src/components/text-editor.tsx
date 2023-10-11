import "./text-editor.css";

import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";

const TextEditor: React.FC = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState("# Header");

	useEffect(() => {
		const listener = (evt: MouseEvent) => {
			if (
				ref.current &&
				evt.target &&
				ref.current.contains(evt.target as Node)
			) {
				// weird ts defintions
				return;
			}
			setEditing(false);
		};
		document.addEventListener("click", listener, { capture: true });
		return () =>
			document.removeEventListener("click", listener, { capture: true });
	}, []);

	if (editing) {
		return (
			<div ref={ref} className='text-editor'>
				<MDEditor
					value={value}
					onChange={(v) => {
						setValue(v || "");
					}}
				/>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)} className='text-editor'>
			<div className='card-content'>
				<MDEditor.Markdown source={value} />
			</div>
		</div>
	);
};

export default TextEditor;
