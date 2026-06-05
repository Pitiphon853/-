const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/zazad/.gemini/antigravity/brain';

try {
  const folders = fs.readdirSync(brainDir);
  console.log(`Found ${folders.length} folders.`);
  
  folders.forEach(folder => {
    const transcriptPath = path.join(brainDir, folder, '.system_generated/logs/transcript.jsonl');
    if (fs.existsSync(transcriptPath)) {
      const content = fs.readFileSync(transcriptPath, 'utf8');
      const lines = content.split('\n');
      if (lines.length > 0 && lines[0]) {
        try {
          const stepObj = JSON.parse(lines[0]);
          if (stepObj.type === 'USER_INPUT' && stepObj.content) {
            const text = stepObj.content;
            const batchMatch = text.match(/assigned Batch (\d+)/i);
            if (!batchMatch) {
              // Print first 100 characters of the non-batch folder prompt
              console.log(`Folder: ${folder} | First 100 chars: ${text.substring(0, 100).replace(/\n/g, ' ')}`);
            } else {
              console.log(`Folder: ${folder} | Matches Batch: ${batchMatch[1]}`);
            }
          }
        } catch (e) {
          console.log(`Folder: ${folder} | Error parsing first line: ${e.message}`);
        }
      }
    }
  });

} catch (err) {
  console.error('Error:', err.message);
}
