// app.js
const { createNode } = require('./node');
const { handleFileRequests } = require('./protocolHandler');
const { addFile, getFile } = require('./fileManager');

async function start() {
    const node = await createNode();
    handleFileRequests(node, getFile);

    // Example: Add a file and log its hash
    const fileHash = await addFile('/Users/viratmarni/libp2p-file-sharing/file.txt');
    console.log(`File added with hash: ${fileHash}`);
}

start().catch(console.error);
