// app.js
import { createNode } from './node.js';

import { handleFileRequests } from './protocolHandler.js';
import { addFile, getFile } from './fileManager.js';

async function start() {
    const node = await createNode();
    handleFileRequests(node, getFile);

    // Example: Add a file and log its hash
    const fileHash = await addFile('/Users/viratmarni/libp2p-file-sharing/file.txt');
    console.log(`File added with hash: ${fileHash}`);
}

start().catch(console.error);
