// fileManager.js
import { promises as fs } from 'fs';
import crypto from 'crypto';

async function hashFile(content) {
    const hash = crypto.createHash('sha256');
    hash.update(content);
    return hash.digest('hex');
}

async function addFile(filePath) {
    const content = await fs.readFile(filePath);
    const fileHash = await hashFile(content);
    // For simplicity, use the hash as the filename
    await fs.writeFile(`./data/${fileHash}`, content);
    return fileHash;
}

async function getFile(hash) {
    try {
        return await fs.readFile(`./data/${hash}`);
    } catch (error) {
        console.log('File not found', error);
        return null;
    }
}

export { addFile, getFile, hashFile };
