import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chokidar from 'chokidar';

const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');
const OUTPUT_FILE = path.join(process.cwd(), 'public/rbacComponents.json');

const generateRBACList = () => {
  const files = glob.sync(`${COMPONENTS_DIR}/**/*.tsx`);
  const registeredComponents = [];

  // Read existing components if file exists
  let existingComponents = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
      existingComponents = existing.components || [];
    } catch (error) {
      console.error('Error reading existing components:', error);
    }
  }

  // Track all currently valid components
  const currentlyValidComponents = new Set();
  console.log(currentlyValidComponents, 'current valid component');
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(/withRBAC\([^,]+,\s*['"]([^'"]+)['"]/g);

    if (matches) {
      matches.forEach((match) => {
        const componentMatch = match.match(
          /withRBAC\(([^,]+),\s*['"]([^'"]+)['"]/,
        );
        if (componentMatch) {
          const [, componentName, permission] = componentMatch;
          const name = componentName.trim();
          currentlyValidComponents.add(name);

          registeredComponents.push({
            name,
            requiredPermission: permission,
          });
          console.log(`✅ Registered: ${name} (${permission})`);
        }
      });
    }
  });

  // Find and report removed components
  existingComponents.forEach((component) => {
    if (!currentlyValidComponents.has(component.name)) {
      console.log(`🗑️  Removed: ${component.name} (no longer uses withRBAC)`);
    }
  });

  // Save only currently valid components
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify({ components: registeredComponents }, null, 2),
  );

  console.log(
    `📝 RBAC components updated: ${registeredComponents.length} components registered.`,
  );
};

// Run the function once to generate the initial list
generateRBACList();

// Watch mode: Automatically re-run when files change
if (process.argv.includes('--watch')) {
  console.log('👀 Watching for changes in RBAC components...');
  chokidar
    .watch(COMPONENTS_DIR, { persistent: true, ignoreInitial: true })
    .on('all', (event, path) => {
      console.log(`🔄 Change detected (${event}): ${path}`);
      generateRBACList();
    });
}
