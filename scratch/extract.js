const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:/Users/zazad/.gemini/antigravity/brain/e875ee94-554e-4862-ad63-ebfbbb4b58a5/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
        const data = JSON.parse(line);
        if (data.type === 'USER_INPUT' && data.content.includes('หมวดที่ 1: การแปลงหน่วยพื้นที่')) {
            fs.writeFileSync('temp_extract.txt', data.content);
            console.log('Extracted to temp_extract.txt');
        }
    } catch(e) {}
  }
}

processLineByLine();
