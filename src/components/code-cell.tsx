import { useEffect, useState } from "react";

import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler";

import Resizeable from "./resizeable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [code, setCode] = useState("");
	const [err, setErr] = useState("");
	const { updateCell } = useActions();

	useEffect(() => {
		let timer = setTimeout(async () => {
			const output = await bundle(cell.content);
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [cell.content]);

	return (
		<Resizeable direction='vertical'>
			<div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
				<Resizeable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizeable>
				<Preview code={code} err={err} />
			</div>
		</Resizeable>
	);
};

export default CodeCell;
