# file-update-websocket

Send a message per websocket whenever a file is modified. Implemented using [Bun](https://bun.sh/).

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` file in the root directory with:

```dotenv
PUBLIC_DIR=/public
WATCH_FILE=test.txt
```

3. Run:

```bash
bun run index.ts
```

4. Connect to the websocket in the browser:

```javascript
new WebSocket('ws://localhost:3000/socket').addEventListener('message', event => {
  console.log(event.data);
});
```

5. Edit `/public/test.txt`.
