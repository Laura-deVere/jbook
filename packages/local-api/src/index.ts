import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import { createCellsRouter } from "./routes/cells";

export const serve = (
	port: number,
	filename: string,
	dir: string,
	useProxy: boolean
) => {
	console.log("serving traffic", port);
	console.log("saving/fetching files from", filename);
	console.log("dir: ", dir);

	const app = express();

	if (useProxy) {
		// local dev
		app.use(
			createProxyMiddleware({
				target: "http://127.0.0.1:3000",
				ws: true,
				logLevel: "silent",
			})
		);
	} else {
		// users machine
		const packagePath = require.resolve(
			"@jsnotess/local-client/build.index.html"
		); //node path resolution algo
		app.use(express.static(path.dirname(packagePath)));
	}

	app.use(createCellsRouter(filename, dir));
	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on("error", reject);
	});
	// target: 'http://127.0.0.1:3000',
};
