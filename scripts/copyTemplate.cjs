const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node createComponent <ComponentName>');
  process.exit(1);
}

const componentName = args[0];
const templatePath = path.join(__dirname, 'templates', 'ComponentTemplate.tsx');
const componentDir = path.join(__dirname, '..', 'src', 'components');
const newComponentPath = path.join(componentDir, `${componentName}.tsx`);

fs.copyFileSync(templatePath, newComponentPath);

const data = fs.readFileSync(newComponentPath, 'utf8');
const result = data.replace(/ComponentTemplate/g, componentName);
fs.writeFileSync(newComponentPath, result, 'utf8');

console.log(`${componentName} has been created in ${newComponentPath}`);