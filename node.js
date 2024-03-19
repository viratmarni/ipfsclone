// Import the necessary modules with static imports
import { createLibp2p } from 'libp2p';
// import TCP from '@libp2p/tcp';
import * as Mplex from '@libp2p/mplex';
import Multihashing from 'multihashing-async';

// Dynamically import @libp2p/noise
let Noise;

// async function loadNoiseModule() {
//     const noiseModule = await import('@libp2p/noise');
//     Noise = noiseModule.Noise; // Adjust based on the actual export
// }

let TCP;

async function loadModules() {
    const tcpModule = await import('@libp2p/tcp');
    TCP = tcpModule.TCP; // Adjust based on the actual export of @libp2p/tcp

    const noiseModule = await import('@libp2p/noise');
    Noise = noiseModule.Noise; // This assumes Noise is the correct named export
}
// Create the Libp2p instance
async function createNode() {
    await loadModules(); // Ensure Noise is loaded before creating the libp2p instance
    const node = await createLibp2p({
        modules: {
            transport: [TCP],
            streamMuxer: [Mplex],
            connEncryption: [Noise] // Use the dynamically loaded Noise module
        }
    });

    return node;
}

createNode().then((node) => {
    console.log('Libp2p Node created!');
    console.log(node);
}).catch((error) => {
    console.error('Error creating the Libp2p Node:', error);
});

