// node.js
import { createLibp2p } from 'libp2p';
import TCP from '@libp2p/tcp';
import * as Mplex from '@libp2p/mplex';
import Noise from '@libp2p/noise'; // Updated to default import
import Multihashing from 'multihashing-async';



// Create the Libp2p instance
// Create the Libp2p instance
const createNode = async () => {
    const node = await createLibp2p({
      modules: {
        transport: [TCP],
        streamMuxer: [Mplex],
        connEncryption: [Noise] // Make sure this aligns with how you import
      }
    });
  
    return node;
  };
  
  

createNode().then((node) => {
  console.log('Libp2p Node created!', node);
}).catch((error) => {
  console.error('Error creating the Libp2p Node:', error);
});
