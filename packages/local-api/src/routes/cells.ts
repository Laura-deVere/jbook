import express from "express";
import fs from "fs/promises"; // node, async/await files
import path from "path";

interface Cell {
	id: string;
	content: string;
	type: "text" | "code";
}

interface LocalApiError {
	code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	router.use(express.json());

	const fullPath = path.join(dir, filename);

	router.get("cell", async (req, res) => {
		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		};
		try {
			const result = await fs.readFile(fullPath, { encoding: "utf-8" });
			res.send(JSON.parse(result));
		} catch (err) {
			if (isLocalApiError(err)) {
				if (err.code === "ENOENT") {
					await fs.writeFile(fullPath, "[]", "utf-8");
					res.send([]);
				}
			} else {
				throw err;
			}
		}
	});

	router.post("cell", async (req, res) => {
		// take list of cells from requst Object
		// serialize them
		const { cells }: { cells: Cell[] } = req.body;
		// write cells to file
		await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
		res.send({ status: "ok" });
	});

	return router;
};
// router.get("/cells", async (req, res) => {
//     const isLocalApiError = (err: any): err is LocalApiError => {
//       return typeof err.code === "string";
//     };

// } catch (err) {
//     if (isLocalApiError(err)) {
//       if (err.code === "ENOENT") {
//         await fs.writeFile(fullPath, "[]", "utf-8");
//         res.send([]);
//       }
//     } else {
//       throw err;
//     }
//   }
// });
