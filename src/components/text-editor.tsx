import "./text-editor.css";

import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useRef } from "react";

import { useActions } from "../hooks/use-actions";
import { Cell } from "../state";

interface TextEditorProps {
	cell: Cell;
}
const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updateCell } = useActions();

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
					value={cell.content}
					onChange={(v) => {
						updateCell(cell.id, cell.content || "");
					}}
				/>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)} className='text-editor'>
			<div className='card-content'>
				<MDEditor.Markdown source={cell.content || "Click to edit"} />
			</div>
		</div>
	);
};

export default TextEditor;
