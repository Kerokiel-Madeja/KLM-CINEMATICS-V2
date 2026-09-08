const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify: minifyHtml } = require('html-minifier-terser');
const CleanCSS = require('clean-css');

// Level 1: Safe minification (no rule reordering, no breaking cascade/specificity)
const cleanCSS = new CleanCSS({ level: 1, inline: false });

async function build() {
  console.log('🚀 Starting KLM CINEMATICS production build...');

  const dist = path.join(__dirname, 'dist');
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(dist, 'assets', 'css'), { recursive: true });
  fs.mkdirSync(path.join(dist, 'assets', 'js'), { recursive: true });
  fs.mkdirSync(path.join(dist, 'functions', 'api'), { recursive: true });

  // 1. Minify HTML files
  const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
  for (const file of htmlFiles) {
    console.log(`📄 Minifying HTML: ${file}`);
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const minified = await minifyHtml(content, {
      collapseWhitespace: true,
      conservativeCollapse: true, // Preserve single spaces between tags
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: false,
      minifyJS: true,
      minifyCSS: true
    });
    fs.writeFileSync(path.join(dist, file), minified, 'utf8');
  }

  // 2. Process & Bundle CSS files
  const cssDir = path.join(__dirname, 'assets', 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));

    // First, process global.css and INLINE its imported local stylesheets
    const globalCssPath = path.join(cssDir, 'global.css');
    if (fs.existsSync(globalCssPath)) {
      console.log('🎨 Inlining and bundling master stylesheet: global.css');
      const rawGlobal = fs.readFileSync(globalCssPath, 'utf8');
      const importRegex = /@import\s+url\(["']?\.\/([^"']+)["']?\);/g;
      let inlinedGlobal = rawGlobal;
      let match;
      while ((match = importRegex.exec(rawGlobal)) !== null) {
        const importedFile = match[1];
        const fullPath = path.join(cssDir, importedFile);
        if (fs.existsSync(fullPath)) {
          const fileContent = fs.readFileSync(fullPath, 'utf8');
          inlinedGlobal = inlinedGlobal.replace(match[0], `\n/* Inlined ${importedFile} */\n` + fileContent + '\n');
        }
      }
      const minifiedGlobal = cleanCSS.minify(inlinedGlobal).styles;
      fs.writeFileSync(path.join(dist, 'assets', 'css', 'global.css'), minifiedGlobal, 'utf8');
    }

    // Minify all other individual CSS files as well
    for (const file of cssFiles) {
      if (file === 'global.css') continue;
      console.log(`🎨 Minifying CSS: ${file}`);
      const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
      const minified = cleanCSS.minify(content).styles;
      fs.writeFileSync(path.join(dist, 'assets', 'css', file), minified, 'utf8');
    }
  }

  // 3. Obfuscate & Minify JS files with safe runtime settings
  const jsDir = path.join(__dirname, 'assets', 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
      console.log(`🔒 Obfuscating & Minifying JS: ${file}`);
      const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
      const obfuscationResult = JavaScriptObfuscator.obfuscate(content, {
        compact: true,
        controlFlowFlattening: false, // Disable flattening to maintain 60fps animations & prevent stack issues
        deadCodeInjection: false,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false, // Preserve window & document globals
        rotateStringArray: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        transformObjectKeys: false // CRUCIAL: Do not transform object keys to prevent breaking DOM APIs
      });
      fs.writeFileSync(path.join(dist, 'assets', 'js', file), obfuscationResult.getObfuscatedCode(), 'utf8');
    }
  }

  // 4. Copy Cloudflare Pages Functions
  const functionsDir = path.join(__dirname, 'functions');
  if (fs.existsSync(functionsDir)) {
    console.log('⚡ Copying Cloudflare Pages Functions...');
    fs.cpSync(functionsDir, path.join(dist, 'functions'), { recursive: true });
  }

  // 5. Copy static extras
  if (fs.existsSync(path.join(__dirname, 'sitemap.xml'))) {
    fs.copyFileSync(path.join(__dirname, 'sitemap.xml'), path.join(dist, 'sitemap.xml'));
  }

  console.log('✅ Production bundle successfully created in dist/!');
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
