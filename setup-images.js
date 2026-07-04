const fs = require('fs');
const path = require('path');

const artifactDir = 'C:\\Users\\maury\\.gemini\\antigravity-ide\\brain\\4248cecc-70c5-4917-9dcf-1ca9f1d419ef';
const assetsDir = path.join(__dirname, 'assets');
const projectsDir = path.join(assetsDir, 'projects');

// Ensure directories exist
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true });

const copies = [
  ['media__1782325570269.jpg', path.join(assetsDir, 'profile.png')],
  ['project_1_1782300361466.png', path.join(projectsDir, 'project1.png')],
  ['project_2_1782300373139.png', path.join(projectsDir, 'project2.png')],
  ['project_3_1782300385671.png', path.join(projectsDir, 'project3.png')],
  ['project_4_1782300398178.png', path.join(projectsDir, 'project4.png')],
];

console.log('Copying portfolio images...');
copies.forEach(([src, dest]) => {
  const srcPath = path.join(artifactDir, src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dest);
    console.log(`✅ Copied: ${path.basename(dest)}`);
  } else {
    console.log(`❌ Not found: ${src}`);
  }
});
console.log('\n🎉 Done! Open index.html to see your portfolio.');
