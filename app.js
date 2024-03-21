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

        // Retrieve and display the content of the file using its hash
    const fileContent = await getFile(fileHash);
    if (fileContent) {
        console.log(`Content of file with hash ${fileHash}:`);
        console.log(fileContent.toString());
    } else {
        console.log(`No content found for hash ${fileHash}`);
    }
}


start().catch(console.error);
