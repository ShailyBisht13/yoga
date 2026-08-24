const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.bmp', '.tiff',
]);

const targets = process.argv.slice(2);
const roots = targets.length > 0 ? targets : ['./public'];
const CLOUDINARY_ROOT_FOLDER = 'vimoksha-yogshala';

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

function toCloudinaryFolder(localFilePath, root) {
  const relative = path.relative(root, path.dirname(localFilePath));
  const cleanRoot = root.replace(/^[.\/\\]+/, '').replace(/\\/g, '/');
  const parts = [CLOUDINARY_ROOT_FOLDER, cleanRoot, relative]
    .filter(Boolean)
    .join('/')
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/');
  return parts;
}

async function uploadFile(filePath, root) {
  const folder = toCloudinaryFolder(filePath, root);
  const publicId = path.basename(filePath, path.extname(filePath));
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      use_filename: true,
      unique_filename: false,
    });
    console.log(`✔ ${filePath} -> ${result.secure_url}`);
    return { localPath: filePath, status: 'success', url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    console.error(`✘ ${filePath} FAILED: ${err.message}`);
    return { localPath: filePath, status: 'error', error: err.message };
  }
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary credentials. Check your .env file.');
    process.exit(1);
  }

  let allFiles = [];
  for (const root of roots) {
    if (!fs.existsSync(root)) {
      console.warn(`Skipping missing path: ${root}`);
      continue;
    }
    const stat = fs.statSync(root);
    const files = stat.isDirectory() ? walk(root) : [root];
    allFiles = allFiles.concat(files.map((f) => ({ file: f, root: stat.isDirectory() ? root : path.dirname(root) })));
  }

  console.log(`Found ${allFiles.length} image(s) to upload.\n`);

  const results = [];
  const CONCURRENCY = 5;
  for (let i = 0; i < allFiles.length; i += CONCURRENCY) {
    const batch = allFiles.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(({ file, root }) => uploadFile(file, root)));
    results.push(...batchResults);
  }

  const succeeded = results.filter((r) => r.status === 'success');
  const failed = results.filter((r) => r.status === 'error');

  fs.writeFileSync('cloudinary-upload-report.json', JSON.stringify(results, null, 2));

  const csvLines = ['local_path,status,cloudinary_url'];
  for (const r of results) {
    csvLines.push(`${r.localPath},${r.status},${r.url || ''}`);
  }
  fs.writeFileSync('cloudinary-upload-report.csv', csvLines.join('\n'));

  console.log(`\nDone. ${succeeded.length} succeeded, ${failed.length} failed.`);
  console.log('Report written to cloudinary-upload-report.json / .csv');
}

main();