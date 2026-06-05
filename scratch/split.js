const fs = require('fs');

const lines = fs.readFileSync('scratch/math_list.txt', 'utf8')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l);

const numBatches = 20;
const batchSize = Math.ceil(lines.length / numBatches);
const batches = [];

for (let i = 0; i < numBatches; i++) {
  const chunk = lines.slice(i * batchSize, (i + 1) * batchSize);
  if (chunk.length > 0) {
    batches.push(chunk);
  }
}

console.log(`Total calculators: ${lines.length}`);
console.log(`Number of batches: ${batches.length}`);

const prompts = batches.map((batch, i) => {
  const startId = 39 + i;
  let prompt = `You are assigned Batch ${startId}. Write files to the EXACT absolute path: \`C:\\Users\\zazad\\.gemini\\antigravity\\scratch\\kamnuan-com\\scratch\\missing_calcs\`\n`;
  prompt += `Create the following ${batch.length} calculators (tsx and json):\n`;
  batch.forEach((item, index) => {
    // Generate a quick english slug name
    let englishSlug = 'calc-' + startId + '-' + (index + 1);
    prompt += `${index + 1}. ${englishSlug} — ${item} (Math)\n`;
  });
  prompt += `\nCRITICAL REQUIREMENT: For every calculator, you MUST include a 400+ word SEO-optimized Thai article at the bottom using semantic HTML \`<article>\`. The article MUST contain reliable mathematical formulas and context. Provide clean code, robust state, Tailwind styling, and Lucide icons. For math components, prefer a clear, user-friendly UI. Use actual readable slug names for the components (e.g. gcd-calculator) instead of the placeholder calc-id.\n`;
  return { Role: `Batch ${startId} Dev`, Prompt: prompt, TypeName: "react_builder_v2" };
});

fs.writeFileSync('scratch/subagents_payload.json', JSON.stringify(prompts, null, 2));
console.log('Saved subagent payload to scratch/subagents_payload.json');
