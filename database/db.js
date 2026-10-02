const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, 'db.json');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function readData() {
    await delay(1500); // Simulating DB latency
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };