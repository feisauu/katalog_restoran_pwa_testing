/* eslint-disable no-multi-spaces */
/* eslint-disable no-else-return */
/* eslint-disable arrow-parens */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros'); // Adjust target path as needed
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

const maxSize = 200 * 1024; // 200 KB in bytes

fs.readdirSync(target).forEach((image) => {
  const ext = path.extname(image).toLowerCase();
  const basename = path.basename(image, ext);

  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    // Create the large version
    sharp(`${target}/${image}`)
      .resize(800)
      .jpeg({ quality: 60 })  // Initial quality
      .toBuffer()
      .then(data => {
        if (data.length > maxSize) {
          // Adjust quality if image exceeds 200 KB
          return sharp(data)
            .jpeg({ quality: 60 - Math.ceil(((data.length - maxSize) / 1000)) }) // Decrease quality
            .toFile(path.resolve(destination, `${basename}-large.jpg`));
        } else {
          return sharp(data)
            .toFile(path.resolve(destination, `${basename}-large.jpg`));
        }
      })
      .then(() => console.log(`Created: ${basename}-large.jpg`))
      .catch(err => console.error(`Error processing ${image} as JPEG:`, err));

    // Create the small version
    sharp(`${target}/${image}`)
      .resize(480)
      .jpeg({ quality: 60 })  // Initial quality
      .toBuffer()
      .then(data => {
        if (data.length > maxSize) {
          // Adjust quality if image exceeds 200 KB
          return sharp(data)
            .jpeg({ quality: 60 - Math.ceil(((data.length - maxSize) / 1000)) }) // Decrease quality
            .toFile(path.resolve(destination, `${basename}-small.jpg`));
        } else {
          return sharp(data)
            .toFile(path.resolve(destination, `${basename}-small.jpg`));
        }
      })
      .then(() => console.log(`Created: ${basename}-small.jpg`))
      .catch(err => console.error(`Error processing ${image} as JPEG:`, err));

    // Create WebP versions with similar logic
    sharp(`${target}/${image}`)
      .resize(800)
      .webp({ quality: 50 })  // Initial quality
      .toBuffer()
      .then(data => {
        if (data.length > maxSize) {
          return sharp(data)
            .webp({ quality: 50 - Math.ceil(((data.length - maxSize) / 1000)) }) // Decrease quality
            .toFile(path.resolve(destination, `${basename}-large.webp`));
        } else {
          return sharp(data)
            .toFile(path.resolve(destination, `${basename}-large.webp`));
        }
      })
      .then(() => console.log(`Created: ${basename}-large.webp`))
      .catch(err => console.error(`Error processing ${image} as WebP:`, err));

    sharp(`${target}/${image}`)
      .resize(480)
      .webp({ quality: 50 })  // Initial quality
      .toBuffer()
      .then(data => {
        if (data.length > maxSize) {
          return sharp(data)
            .webp({ quality: 50 - Math.ceil(((data.length - maxSize) / 1000)) }) // Decrease quality
            .toFile(path.resolve(destination, `${basename}-small.webp`));
        } else {
          return sharp(data)
            .toFile(path.resolve(destination, `${basename}-small.webp`));
        }
      })
      .then(() => console.log(`Created: ${basename}-small.webp`))
      .catch(err => console.error(`Error processing ${image} as WebP:`, err));
  }
});
