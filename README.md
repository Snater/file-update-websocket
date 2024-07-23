# file-update-websocket

Send a message per websocket whenever a file is modified. Implemented using [Bun](https://bun.sh/).

1. Install dependencies:

```bash
bun install
```

2. Run:

```bash
bun run index.ts
```

3. Connect to the websocket in the browser:

```javascript
new WebSocket('ws://localhost:3000/socket').addEventListener('message', event => {
  console.log(event.data);
});
```

4. Edit `/public/test.txt`.
