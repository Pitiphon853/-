const fs = require('fs');

try {
  const fileContent = fs.readFileSync('C:/Users/zazad/.gemini/antigravity/brain/e875ee94-554e-4862-ad63-ebfbbb4b58a5/.system_generated/logs/transcript.jsonl', 'utf8');
  const lines = fileContent.split('\n');
  
  const targetLine = lines.find(line => line.includes('invoke_subagent') && line.includes('Batch 39 Dev'));
  const step = JSON.parse(targetLine);
  const invokeCall = step.tool_calls.find(tc => tc.name === 'invoke_subagent');
  let raw = invokeCall.args.Subagents;
  
  let result = "";
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '\\') {
      const next = raw[i+1];
      if (next === '\\' || next === '"' || next === '/' || next === 'b' || next === 'f' || next === 'n' || next === 'r' || next === 't') {
        result += '\\' + next;
        i++;
      } else if (next === 'u') {
        if (/[0-9a-fA-F]{4}/.test(raw.substring(i+2, i+6))) {
          result += '\\u' + raw.substring(i+2, i+6);
          i += 5;
        } else {
          result += '\\\\';
        }
      } else {
        result += '\\\\';
      }
    } else {
      result += raw[i];
    }
  }

  console.log('Result char at 1386:', JSON.stringify(result[1386]));
  console.log('Result chars around 1386:', result.substring(1370, 1400));
  console.log('Char code of 1386:', result.charCodeAt(1386));
} catch (e) {
  console.error('Error:', e);
}
