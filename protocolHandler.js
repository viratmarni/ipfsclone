// protocolHandler.js
import { pipe } from 'it-pipe';

import { collect } from 'streaming-iterables';

async function handleFileRequests(node, getFile) {
    node.handle('/file-protocol/1.0.0', async ({ stream }) => {
        try {
            const [data] = await pipe(stream, collect);
            const request = JSON.parse(data.toString());
            const fileBuffer = await getFile(request.hash);
            // Send file back if found
            if (fileBuffer) {
                await pipe([fileBuffer], stream);
            } else {
                await pipe([JSON.stringify({ error: 'File not found' })], stream);
            }
        } catch (err) {
            console.error('Failed to handle incoming protocol message', err);
        }
    });
}

export { handleFileRequests };
