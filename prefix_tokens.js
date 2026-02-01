const fs = require('fs');
const path = require('path');

const root = path.resolve('packages/ui/src');
const tokenFiles = [
  'tokens-colors.css',
  'tokens-sizing.css',
  'tokens-typography.css',
].map((f) => path.join(root, f));

const BEGIN = '  /* BEGIN NAMESPACED ALIASES (YUANHHOU) */';
const END = '  /* END NAMESPACED ALIASES (YUANHHOU) */';

function stripAlias(css) {
  const b = css.indexOf(BEGIN);
  const e = css.indexOf(END);
  if (b !== -1 && e !== -1 && e > b) {
    return css.slice(0, b) + css.slice(e + END.length + 1);
  }
  return css;
}

function prefixDefs(css) {
  return css.replace(/--([A-Za-z0-9_-]+)\s*:/g, (match, name) => {
    if (name.startsWith('yuanhhou-')) return match;
    return `--yuanhhou-${name}:`;
  });
}

function prefixVars(css) {
  return css.replace(/var\(\s*--([A-Za-z0-9_-]+)/g, (match, name) => {
    if (name.startsWith('yuanhhou-')) return match;
    return `var(--yuanhhou-${name}`;
  });
}

for (const file of tokenFiles) {
  let css = fs.readFileSync(file, 'utf8');
  css = stripAlias(css);
  css = prefixDefs(css);
  css = prefixVars(css);
  fs.writeFileSync(file, css, 'utf8');
  console.log('updated tokens', path.basename(file));
}

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.css') && !tokenFiles.includes(full)) acc.push(full);
  }
}

const otherCss = [];
walk(root, otherCss);

for (const file of otherCss) {
  const css = fs.readFileSync(file, 'utf8');
  const next = prefixVars(css);
  if (next !== css) {
    fs.writeFileSync(file, next, 'utf8');
    console.log('updated usage', path.relative(root, file));
  }
}
