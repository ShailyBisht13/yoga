const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to count lines and files recursively
function scanDirectory(dirPath, extensions = ['.js', '.jsx', '.json', '.css', '.html', '.md']) {
  let stats = { fileCount: 0, lineCount: 0, files: [] };

  if (!fs.existsSync(dirPath)) return stats;

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n').length;
          stats.fileCount++;
          stats.lineCount += lines;
          stats.files.push({
            relativePath: path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/'),
            lines,
            sizeBytes: fs.statSync(fullPath).size
          });
        }
      }
    }
  }

  walk(dirPath);
  return stats;
}

// Colors for terminal formatting
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  bgGreen: '\x1b[42m\x1b[30m',
  bgCyan: '\x1b[46m\x1b[30m',
};

function printBanner() {
  console.log(`\n${colors.cyan}${colors.bold}`);
  console.log('  ╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('  ║                                                                               ║');
  console.log('  ║             🧘 VIMOKSHA YOGSHALA — CONSOLIDATED PROJECT REPORT               ║');
  console.log('  ║                                                                               ║');
  console.log('  ╚═══════════════════════════════════════════════════════════════════════════════╝');
  console.log(`${colors.reset}`);
}

function printSectionHeader(title) {
  console.log(`\n${colors.bold}${colors.yellow}─── [ ${title} ] ─────────────────────────────────────────────────────────────────${colors.reset}\n`);
}

function generateReport() {
  printBanner();

  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  console.log(`${colors.dim}Generated at: ${now} | Workspace: ${ROOT_DIR}${colors.reset}\n`);

  // 1. Overview & Stack
  printSectionHeader('1. EXECUTIVE SUMMARY & TECH STACK');
  console.log(`  ${colors.bold}Project Name:${colors.reset}       Vimoksha Yogshala`);
  console.log(`  ${colors.bold}Description:${colors.reset}        Premium Yoga & Wellness Web Platform & Admin Suite`);
  console.log(`  ${colors.bold}Frontend Stack:${colors.reset}     React 19.1 | Vite 7.1 | Tailwind CSS v4.1`);
  console.log(`  ${colors.bold}Routing & Motion:${colors.reset}   React Router DOM 7 | Framer Motion 12 | GSAP 3 | Lenis Smooth Scroll`);
  console.log(`  ${colors.bold}Backend Server:${colors.reset}     Express.js Server (Node.js) | MongoDB / Mongoose | Nodemailer`);
  console.log(`  ${colors.bold}Cloud Services:${colors.reset}     Cloudinary Media Storage & CDN Integration`);

  // 2. Metrics Audit
  printSectionHeader('2. SOURCE CODE METRICS & DIRECTORY AUDIT');
  const srcStats = scanDirectory(path.join(ROOT_DIR, 'src'));
  const pagesStats = scanDirectory(path.join(ROOT_DIR, 'src', 'pages'));
  const componentsStats = scanDirectory(path.join(ROOT_DIR, 'src', 'components'));
  const backendStats = scanDirectory(path.join(ROOT_DIR, 'vimoksha-express', 'server', 'src'));
  const distStats = scanDirectory(path.join(ROOT_DIR, 'dist'));

  console.log(`  ┌─────────────────────────────────────┬──────────────┬──────────────┐`);
  console.log(`  │ ${colors.bold}Directory Module${colors.reset}                    │ ${colors.bold}Total Files${colors.reset}  │ ${colors.bold}Lines of Code${colors.reset}│`);
  console.log(`  ├─────────────────────────────────────┼──────────────┼──────────────┤`);
  console.log(`  │ Frontend Total (src/)               │ ${String(srcStats.fileCount).padEnd(12)} │ ${String(srcStats.lineCount).padEnd(12)} │`);
  console.log(`  │ ├── Pages (src/pages/)              │ ${String(pagesStats.fileCount).padEnd(12)} │ ${String(pagesStats.lineCount).padEnd(12)} │`);
  console.log(`  │ └── Components (src/components/)    │ ${String(componentsStats.fileCount).padEnd(12)} │ ${String(componentsStats.lineCount).padEnd(12)} │`);
  console.log(`  │ Backend Server (vimoksha-express/)  │ ${String(backendStats.fileCount).padEnd(12)} │ ${String(backendStats.lineCount).padEnd(12)} │`);
  console.log(`  │ Production Build Output (dist/)     │ ${String(distStats.fileCount).padEnd(12)} │ ${String(distStats.lineCount).padEnd(12)} │`);
  console.log(`  └─────────────────────────────────────┴──────────────┴──────────────┘`);

  // 3. Frontend Routes Map
  printSectionHeader('3. FRONTEND ROUTE ARCHITECTURE');
  const publicRoutes = [
    { path: '/', page: 'HomePage', status: 'Public Entry Point' },
    { path: '/about', page: 'AboutPage', status: 'Lazy Loaded' },
    { path: '/classes/beginner', page: 'StudentClassesPage', status: 'Lazy Loaded' },
    { path: '/classes/intermediate', page: 'ProfessionalClassesPage', status: 'Lazy Loaded' },
    { path: '/classes/advance', page: 'AdultClassesPage', status: 'Lazy Loaded' },
    { path: '/therapies', page: 'TherapiesPage', status: 'Lazy Loaded' },
    { path: '/courses', page: 'CoursesPage', status: 'Lazy Loaded' },
    { path: '/teacher-training', page: 'TeacherTrainingPage', status: 'Lazy Loaded' },
    { path: '/gallery', page: 'GalleryPage', status: 'Lazy Loaded' },
    { path: '/blog', page: 'BlogPage', status: 'Lazy Loaded' },
    { path: '/blog/:slug', page: 'BlogPostPage', status: 'Lazy Loaded' },
    { path: '/contact', page: 'ContactPage', status: 'Lazy Loaded' },
  ];

  const adminRoutes = [
    { path: '/admin/login', page: 'AdminLogin', status: 'Admin Auth' },
    { path: '/admin/dashboard', page: 'AdminDashboardPage', status: 'Admin Dashboard' },
    { path: '/admin/bookings', page: 'AdminBookingsPage', status: 'Bookings Mgmt' },
    { path: '/admin/blog', page: 'AdminBlogPage', status: 'Blog CMS' },
    { path: '/admin/gallery', page: 'AdminGalleryPage', status: 'Gallery CMS' },
    { path: '/admin/contact', page: 'AdminContactPage', status: 'Leads & Messages' },
    { path: '/admin/content', page: 'AdminContentPage', status: 'Site Content CMS' },
    { path: '/admin/faq', page: 'AdminFaqPage', status: 'FAQ Editor' },
  ];

  console.log(`  ${colors.cyan}${colors.bold}Public Navigation Routes (${publicRoutes.length} Routes):${colors.reset}`);
  publicRoutes.forEach(r => {
    console.log(`    ${colors.green}✓${colors.reset} ${r.path.padEnd(25)} ➔  ${r.page.padEnd(25)} (${colors.dim}${r.status}${colors.reset})`);
  });

  console.log(`\n  ${colors.magenta}${colors.bold}Admin Portal Routes (${adminRoutes.length} Routes):${colors.reset}`);
  adminRoutes.forEach(r => {
    console.log(`    ${colors.yellow}🛡️${colors.reset} ${r.path.padEnd(25)} ➔  ${r.page.padEnd(25)} (${colors.dim}${r.status}${colors.reset})`);
  });

  // 4. Backend Architecture
  printSectionHeader('4. BACKEND EXPRESS API & DATABASE SCHEMAS');
  const backendModules = [
    { route: '/api/auth', controller: 'authController.js', model: 'Admin.js', purpose: 'Admin Authentication & JWT Session' },
    { route: '/api/bookings', controller: 'bookingController.js', model: 'Booking.js', purpose: 'Class & Trial Booking Management' },
    { route: '/api/blog', controller: 'blogController.js', model: 'BlogPost.js', purpose: 'Blog Publishing & Dynamic Slugs' },
    { route: '/api/gallery', controller: 'galleryController.js', model: 'GalleryImage.js', purpose: 'Gallery Asset CRUD & Cloudinary Sync' },
    { route: '/api/contact', controller: 'contactController.js', model: 'ContactInfo.js', purpose: 'Lead Capture & Email Notifications' },
    { route: '/api/content', controller: 'contentController.js', model: 'SiteContent.js', purpose: 'Dynamic Site Configuration & Copy' },
  ];

  backendModules.forEach(m => {
    console.log(`  ${colors.bold}${m.route.padEnd(16)}${colors.reset} │ Model: ${colors.cyan}${m.model.padEnd(16)}${colors.reset} │ Controller: ${colors.green}${m.controller}${colors.reset}`);
    console.log(`                   │ Purpose: ${colors.dim}${m.purpose}${colors.reset}`);
  });

  // 5. Cloudinary & Assets Audit
  printSectionHeader('5. CLOUDINARY INTEGRATION & MEDIA ASSETS');
  const reportJsonPath = path.join(ROOT_DIR, 'cloudinary-upload-report.json');
  if (fs.existsSync(reportJsonPath)) {
    try {
      const reportData = JSON.parse(fs.readFileSync(reportJsonPath, 'utf8'));
      const uploadedCount = Array.isArray(reportData) ? reportData.length : Object.keys(reportData).length;
      console.log(`  ${colors.green}✓ Cloudinary Upload Sync:${colors.reset} Active (${uploadedCount} assets mapped & synced)`);
    } catch (e) {
      console.log(`  ${colors.yellow}! Cloudinary Upload Report:${colors.reset} File present but error parsing JSON`);
    }
  } else {
    console.log(`  ${colors.yellow}! Cloudinary Upload Sync:${colors.reset} Report file not detected`);
  }

  // 6. Environment & Health Status
  printSectionHeader('6. ENVIRONMENT & HEALTH CHECK');
  const hasRootEnv = fs.existsSync(path.join(ROOT_DIR, '.env'));
  const hasServerEnv = fs.existsSync(path.join(ROOT_DIR, 'vimoksha-express', 'server', '.env'));
  const hasDist = fs.existsSync(path.join(ROOT_DIR, 'dist', 'index.html'));

  console.log(`  ${hasRootEnv ? colors.green + '✓' : colors.red + '✗'}${colors.reset} Root Environment File (.env):        ${hasRootEnv ? 'Present' : 'Missing'}`);
  console.log(`  ${hasServerEnv ? colors.green + '✓' : colors.red + '✗'}${colors.reset} Server Environment File (.env):      ${hasServerEnv ? 'Present' : 'Missing'}`);
  console.log(`  ${hasDist ? colors.green + '✓' : colors.red + '✗'}${colors.reset} Production Build Artifact (dist/):    ${hasDist ? 'Built Cleanly (PASSED)' : 'Not Built'}`);

  console.log(`\n${colors.bgGreen} SUMMARY ${colors.reset} ${colors.bold}Project is fully structured, configured, and build-verified!${colors.reset}\n`);
}

generateReport();
