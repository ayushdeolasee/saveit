import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';

const outDir = 'dist';

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

await build({
  entryPoints: {
    popup: 'src/popup.js',
    callback: 'src/callback.js'
  },
  bundle: true,
  format: 'esm',
  minify: true,
  sourcemap: false,
  target: ['chrome114'],
  outdir: outDir,
});

copyDir('public', outDir);

function copyDir(srcDir, destDir) {
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
