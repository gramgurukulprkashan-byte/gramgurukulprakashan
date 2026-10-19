import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const contentMediaDir = path.resolve('public/content-media');
const imagesDir = path.resolve('public/images');

async function convertDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
      const inputPath = path.join(dir, file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(dir, `${baseName}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${baseName}.webp`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }
}

// Named aliases for clean URLs
const aliases = [
  { src: 'WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg', alias: 'nav-bhagirath-book.webp' },
  { src: '25.jpeg', alias: 'bhilanchal-ki-aawaz.webp' },
  { src: '35.jpeg', alias: 'silkhodari-vachanalay.webp' },
  { src: '37.jpeg', alias: 'vachanalay-125-books.webp' },
  { src: '36.jpeg', alias: 'children-reading-circle.webp' },
  { src: '26.jpeg', alias: 'udaypuria-dharampuri-launch.webp' },
  { src: '27.jpeg', alias: 'bhamarda-launch.webp' },
  { src: '28.jpeg', alias: 'semalpada-gurukul-varg.webp' },
  { src: '31.jpeg', alias: 'salarpada-gurukul-varg.webp' },
  { src: '33.jpeg', alias: 'halma-youth-group.webp' },
  { src: '23.jpeg', alias: 'mahesh-sharma-elder.webp' },
  { src: '20.jpeg', alias: 'child-gopan-slingshot.webp' },
  { src: '22.jpeg', alias: 'veer-kotia-bhil.webp' },
  { src: '11.jpeg', alias: 'malvai-ancient-temple.webp' },
  { src: 'img7.jpeg', alias: 'temple-sculpture.webp' },
  { src: '10.jpeg', alias: 'deojhiri-temple.webp' },
  { src: '29.jpeg', alias: 'chhagola-village-school.webp' },
  { src: 'img2.jpeg', alias: 'palash-bloom.webp' },
];

async function createAliases() {
  for (const { src, alias } of aliases) {
    const inputPath = path.join(contentMediaDir, src);
    const outputPath = path.join(contentMediaDir, alias);
    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
        console.log(`Created alias: ${alias}`);
      } catch (err) {
        console.error(`Error alias for ${src}:`, err.message);
      }
    }
  }
}

async function main() {
  console.log('Converting public/content-media...');
  await convertDir(contentMediaDir);
  console.log('Converting public/images...');
  await convertDir(imagesDir);
  console.log('Creating semantic webp aliases...');
  await createAliases();
  console.log('All images converted to WebP successfully!');
}

main();
