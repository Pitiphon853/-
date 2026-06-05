const fs = require('fs');
const path = require('path');

const calcsDir = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/components/calcs';
const files = fs.readdirSync(calcsDir).filter(f => f.endsWith('.tsx'));

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(calcsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix the double-escaped &lt; inside JS expression blocks like {cvResult &lt; 10}
  // Replace &lt; with < inside curly braces
  content = content.replace(/\{([^}]+)&lt;([^}]+)\}/g, (match, p1, p2) => {
    return `{${p1}<${p2}}`;
  });
  content = content.replace(/\{([^}]+)&gt;([^}]+)\}/g, (match, p1, p2) => {
    return `{${p1}>${p2}}`;
  });

  // 2. Escape braces and arrows in the <article> section
  const articleStart = content.indexOf('<article');
  if (articleStart !== -1) {
    const articleEnd = content.lastIndexOf('</article>');
    if (articleEnd !== -1 && articleEnd > articleStart) {
      let articleText = content.substring(articleStart, articleEnd + 10);
      
      // Keep track of the original article
      const originalArticle = articleText;

      // Replace raw { with {"{"} and } with {"}"} but skip HTML tags or already escaped ones
      // Let's do a character by character replacement in the text sections of the article
      let newArticleText = "";
      let inTag = false;
      
      for (let i = 0; i < articleText.length; i++) {
        const char = articleText[i];
        if (char === '<') {
          inTag = true;
          newArticleText += char;
        } else if (char === '>') {
          inTag = false;
          newArticleText += char;
        } else if (!inTag) {
          // We are in text node
          if (char === '{') {
            // Check if it's already part of {"{"}
            if (articleText.substring(i, i + 5) === '{"{"}') {
              newArticleText += '{"{"}';
              i += 4;
            } else {
              newArticleText += '{"{"}';
            }
          } else if (char === '}') {
            // Check if it's already part of {"}"}
            if (articleText.substring(i, i + 5) === '{"}"}') {
              newArticleText += '{"}"}';
              i += 4;
            } else {
              newArticleText += '{"}"}';
            }
          } else if (char === '-' && articleText[i+1] === '>') {
            newArticleText += '{"->"}';
            i++;
          } else {
            newArticleText += char;
          }
        } else {
          // Inside tag
          newArticleText += char;
        }
      }

      content = content.substring(0, articleStart) + newArticleText + content.substring(articleEnd + 10);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed JSX braces/escaping in ${file}`);
    fixedCount++;
  }
});

console.log(`Successfully processed files. Fixed: ${fixedCount}`);
