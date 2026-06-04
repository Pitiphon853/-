const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('C:/Users/zazad/.gemini/antigravity/brain/e875ee94-554e-4862-ad63-ebfbbb4b58a5/.system_generated/logs/transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let fullText = '';
  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.type === 'USER_INPUT' && parsed.content.includes('หมวดที่ 1: การแปลงหน่วยพื้นที่ (Area Converters)')) {
        fullText = parsed.content;
      }
    } catch (e) {
      // skip invalid JSON lines
    }
  }

  // extract lines starting with "เครื่องมือ"
  const lines = fullText.split('\n');
  const items = lines.filter(l => l.trim().startsWith('เครื่องมือ'));

  fs.writeFileSync('C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/master_list.txt', items.join('\n'));
  console.log('Extracted', items.length, 'items to master_list.txt');
}

processLineByLine();
