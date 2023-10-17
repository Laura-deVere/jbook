import React from "react";

import { useTypedSelector } from "../hooks/use-typed-selector";

import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((id) => data[id])
	);

	const renderedCells = cells.map((cell) => (
		<React.Fragment key={cell.id}>
			<AddCell previousCellId={cell.id} />
			<CellListItem cell={cell} />
		</React.Fragment>
	));

	// renderedCells.push(
	// 	<AddCell
	// 		key={Math.random()}
	// 		forceVisible={cells.length === 0}
	// 		previousCellId={null}
	// 	/>
	// );

	return (
		<div>
			<AddCell
				key={Math.random()}
				forceVisible={cells.length === 0}
				previousCellId={null}
			/>
			{renderedCells}
		</div>
	);
};
export default CellList;
