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
			<AddCell nextCellId={cell.id} />
			<CellListItem cell={cell} />
		</React.Fragment>
	));

	return (
		<div>
			{renderedCells}
			<div className={cells.length === 0 ? "force-visiible" : ""}>
				<AddCell forceVisible={cells.length === 0} nextCellId={null} />
			</div>
		</div>
	);
};
export default CellList;
