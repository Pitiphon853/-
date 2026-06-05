const fs = require('fs');
const path = require('path');

const missingDir = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/missing_calcs';

// Define the exact slugs for all 150 calculators in order of math_list.txt
const allSlugs = [
  // Batch 39
  "gcd-2-numbers", "gcd-3-numbers", "lcm-2-numbers", "lcm-3-numbers",
  "quadratic-equation", "matrix-determinant-2x2", "matrix-determinant-3x3", "matrix-transpose",
  // Batch 40
  "matrix-addition-subtraction", "matrix-scalar-multiplication", "mean-calculator", "median-calculator",
  "mode-calculator", "population-standard-deviation", "sample-standard-deviation", "variance-calculator",
  // Batch 41
  "range-calculator", "percentile-calculator", "decile-calculator", "quartile-calculator",
  "weighted-average", "gpa-calculator", "cgpa-calculator", "admission-score-percentage",
  // Batch 42
  "pythagoras-hypotenuse", "pythagoras-leg", "trig-sin", "trig-cos",
  "trig-tan", "trig-arcsin", "trig-arccos", "trig-arctan",
  // Batch 43
  "volume-sphere", "volume-cylinder", "volume-cone", "volume-pyramid",
  "volume-triangular-prism", "volume-cube", "surface-area-sphere", "surface-area-cylinder",
  // Batch 44
  "circumference-calculator", "arc-length-calculator", "sector-area-calculator", "factorial-calculator",
  "combination-calculator", "permutation-calculator", "probability-calculator", "arithmetic-series-sum",
  // Batch 45
  "geometric-series-sum", "log-base-10", "natural-log", "log-base-2",
  "exponent-calculator", "square-root-calculator", "cube-root-calculator", "nth-root-calculator",
  // Batch 46
  "fraction-to-decimal", "decimal-to-fraction", "improper-to-mixed-fraction", "mixed-to-improper-fraction",
  "direct-proportion", "inverse-proportion", "percent-of-value", "value-is-what-percent",
  // Batch 47
  "percentage-increase", "percentage-decrease", "radian-to-degree", "degree-to-radian",
  "prime-number-checker", "factor-generator", "absolute-value", "random-number-generator",
  // Batch 48
  "z-score-calculator", "t-score-calculator", "coefficient-of-variation", "standard-error-calculator",
  "pearson-correlation", "linear-regression-line", "taro-yamane-sample-size", "krejcie-morgan-sample-size",
  // Batch 49
  "cronbach-alpha", "harmonic-mean", "geometric-mean", "percent-difference",
  "midpoint-formula", "distance-formula", "slope-formula", "slope-intercept-equation",
  // Batch 50
  "dot-product", "cross-product", "vector-magnitude", "modulo-calculator",
  "integer-division", "roman-to-decimal", "decimal-to-roman", "number-to-thai-text",
  // Batch 51
  "number-to-english-text", "fibonacci-number", "polygon-interior-angle-sum", "law-of-sines",
  "law-of-cosines", "herons-formula", "triangle-centroid", "system-of-equations-2-variables",
  // Batch 52
  "system-of-equations-3-variables", "even-odd-function-checker", "limit-calculator", "polynomial-derivative",
  "definite-integral-polynomial", "difference-of-squares", "sum-difference-of-cubes", "truth-table-2-variables",
  // Batch 53
  "truth-table-3-variables", "logic-equivalence-checker", "venn-diagram-2-sets", "venn-diagram-3-sets",
  "cartesian-product", "power-set-size", "bayes-theorem", "expected-value",
  // Batch 54
  "skewness-calculator", "kurtosis-calculator", "quartile-deviation", "mean-deviation",
  "outliers-calculator", "base-10-to-2", "base-10-to-8", "base-10-to-16",
  // Batch 55
  "base-2-to-10", "base-2-to-16", "base-16-to-10", "base-16-to-2",
  "binary-addition-subtraction", "hex-addition-subtraction", "inverse-matrix", "spherical-to-cartesian",
  // Batch 56
  "cartesian-to-polar", "scientific-notation-to-decimal", "decimal-to-scientific-notation", "custom-base-logarithm",
  "five-number-summary", "golden-ratio-calculator", "polygon-diagonals", "polygon-exterior-angle",
  // Batch 57
  "equilateral-triangle-height", "binomial-distribution", "poisson-distribution", "normal-distribution-z-table",
  "simple-moving-average", "exponential-moving-average"
];

const mathListPath = 'C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/math_list.txt';
const lines = fs.readFileSync(mathListPath, 'utf8')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l);

const files = fs.readdirSync(missingDir);

const missingCalcs = [];

allSlugs.forEach((slug, idx) => {
  const tsxExists = files.includes(`${slug}.tsx`);
  const jsonExists = files.includes(`${slug}.json`);
  const batchNum = Math.floor(idx / 8) + 39;
  
  if (!tsxExists || !jsonExists) {
    missingCalcs.push({
      indexInBatch: (idx % 8) + 1,
      globalIndex: idx + 1,
      batch: batchNum,
      slug: slug,
      thaiName: lines[idx],
      tsxExists: tsxExists,
      jsonExists: jsonExists
    });
  }
});

console.log('Total Slugs Defined:', allSlugs.length);
console.log('Math List Lines:', lines.length);
console.log('Missing Slugs Count:', missingCalcs.length);

fs.writeFileSync('C:/Users/zazad/.gemini/antigravity/scratch/kamnuan-com/scratch/reconstructed_missing.json', JSON.stringify(missingCalcs, null, 2));
console.log('Saved missing report to scratch/reconstructed_missing.json');
