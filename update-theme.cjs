const fs = require('fs');
const files = ['src/index.css', 'src/pages/Home.css', 'src/pages/Home.jsx', 'src/components/GalleryCard.css', 'src/components/GalleryCard.jsx', 'src/components/Navbar.jsx', 'src/components/Footer.jsx', 'src/components/AdminLayout.jsx', 'src/components/BeforeAfterSlider.css', 'src/pages/admin/Dashboard.jsx', 'src/pages/admin/ProjectManager.jsx', 'src/components/Layout.jsx', 'src/pages/Login.jsx'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Vars
  content = content.replace(/sakura-pink/g, 'seafoam-green');
  content = content.replace(/sakura-light/g, 'seafoam-light');
  content = content.replace(/sakura-blush/g, 'seafoam-blush');
  content = content.replace(/crimson/g, 'deep-navy');
  content = content.replace(/deep-rose/g, 'oceanic-teal');
  content = content.replace(/rose-gold/g, 'teal-light');
  content = content.replace(/KitsuneMask/g, 'ThemeIcon');
  content = content.replace(/glass-pink/g, 'glass-seafoam');
  
  // Hex Colors
  content = content.replace(/#FFB7C5/gi, '#94d2bd');
  content = content.replace(/#FFD6E0/gi, '#cae8dd');
  content = content.replace(/#FFF0F3/gi, '#e6f4ef');
  content = content.replace(/#8B0000/gi, '#001219');
  content = content.replace(/#C2185B/gi, '#005f73');
  content = content.replace(/#B76E79/gi, '#0a9396');

  // RGBA Colors
  content = content.replace(/255,\s*183,\s*197/g, '148, 210, 189');
  content = content.replace(/194,\s*24,\s*91/g, '0, 95, 115');

  // Dark palette backgrounds
  if (file.includes('index.css')) {
    content = content.replace(/--bg-dark:\s*#0a0a0b;/g, '--bg-dark: #001219;');
    content = content.replace(/--bg-surface:\s*#111113;/g, '--bg-surface: #001b25;');
    content = content.replace(/--bg-elevated:\s*#1a1a1e;/g, '--bg-elevated: #002837;');
    content = content.replace(/--bg-card:\s*#141416;/g, '--bg-card: #001822;');
    content = content.replace(/--text-primary:\s*#f0e8e4;/g, '--text-primary: #e9f5f9;');
    content = content.replace(/--text-secondary:\s*#a09090;/g, '--text-secondary: #8cb8c5;');
    
    // Body background
    const oldBodyBg = /background-image:[\s\S]*?background-attachment: fixed;/m;
    const newBodyBg = `background-image: 
    radial-gradient(circle at 50% -20%, rgba(148, 210, 189, 0.08) 0%, transparent 60%),
    linear-gradient(to bottom, rgba(0, 95, 115, 0.05) 0%, transparent 100%);
  background-size: cover;
  background-attachment: fixed;`;
    content = content.replace(oldBodyBg, newBodyBg);
  }

  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
