import chokidar from 'chokidar';

const server = Bun.serve({
	async fetch(req, server) {
		if (!process.env.PUBLIC_DIR) {
			return new Response('PUBLIC_DIR not defined', {status: 500});
		}

		const url = new URL(req.url);
		const pathname = url.pathname;
		const localPath = `${__dirname}/${pathname}`;

		if (pathname.startsWith(process.env.PUBLIC_DIR)) {
			const file = Bun.file(localPath);

			if (await file.exists()) {
				const fileBuffer = Buffer.from(await file.arrayBuffer());
				return new Response(new Blob([fileBuffer]));
			}
		}

		if (pathname === '/socket') {
			return server.upgrade(req) ? undefined : new Response('Upgrade failed', {status: 500});
		}

		return new Response('not found', {status: 404});
	},
	websocket: {
		open(ws) {
			ws.subscribe('file-update');
		},
		close(ws) {
			ws.unsubscribe('file-update');
		},
		message() {}
	},
});

const host = `${server.hostname}:${server.port}`;
const pathToFile = `${process.env.PUBLIC_DIR}/${process.env.WATCH_FILE}`;
const watcher = chokidar.watch(`${__dirname}${pathToFile}`);

console.log(`Listening on ${host}`);

watcher.on('change', path => {
	const file = Bun.file(path);
	server.publish('file-update', `${host}${pathToFile}?token=${file.lastModified}`);
});
