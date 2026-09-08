const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify: minifyHtml } = require('html-minifier-terser');
const CleanCSS = require('clean-css');

const cleanCSS = new CleanCSS({ level: 2 });

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
      removeComments: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: false,
      minifyJS: true,
      minifyCSS: true
    });
    fs.writeFileSync(path.join(dist, file), minified, 'utf8');
  }

  // 2. Minify CSS files
  const cssDir = path.join(__dirname, 'assets', 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
    for (const file of cssFiles) {
      console.log(`🎨 Minifying CSS: ${file}`);
      const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
      const minified = cleanCSS.minify(content).styles;
      fs.writeFileSync(path.join(dist, 'assets', 'css', file), minified, 'utf8');
    }
  }

  // 3. Obfuscate & Minify JS files
  const jsDir = path.join(__dirname, 'assets', 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
    for (const file of jsFiles) {
      console.log(`🔒 Obfuscating & Minifying JS: ${file}`);
      const content = fs.readFileSync(path.join(jsDir, file), 'utf8');
      const obfuscationResult = JavaScriptObfuscator.obfuscate(content, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: false, // keep false for optimal runtime performance and 100% stability
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false, // preserve globals shared between script tags
        rotateStringArray: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
        transformObjectKeys: true
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
