import shelljs from 'shelljs';
import fs from 'fs';
import path from 'path';

const { exec, cd, mv } = shelljs;
const icon_path = path.resolve(path.join(process.cwd(), process.env.ICON));

console.log('Welcome to use pake-cli to build app');
console.log('Node.js info in your localhost ', process.version);
console.log('\n=======================\n');
console.log('Pake parameters is: ');
console.log('url: ', process.env.URL);
console.log('name: ', process.env.NAME);
console.log('icon: ', icon_path);
console.log('height: ', process.env.HEIGHT);
console.log('width: ', process.env.WIDTH);
console.log('transparent: ', process.env.TRANSPARENT);
console.log('resize: ', process.env.RESIZE);
console.log('is multi arch? only for Mac: ', process.env.MULTI_ARCH);
console.log('targets type? only for Linux: ', process.env.TARGETS);
console.log('===========================\n');

cd('node_modules/pake-cli');
let params = `node cli.js ${process.env.URL} --name ${process.env.NAME} --height ${process.env.HEIGHT} --width ${process.env.WIDTH}`;

if (process.env.TRANSPARENT === 'true') {
  params = `${params} --transparent`;
}

if (process.env.FULLSCREEN === 'true') {
  params = `${params} --resize`;
}

if (process.env.MULTI_ARCH === 'true') {
  exec('rustup target add aarch64-apple-darwin');
  params = `${params} --multi-arch`;
}

if (process.env.TARGETS) {
  params = `${params} --targets ${process.env.TARGETS}`;
}

if (process.platform === 'win32') {
  params = `${params} --show-system-tray`;
}

if (process.platform === 'linux') {
  params = `${params} --show-system-tray`;
}

if (process.platform === 'darwin') {
  params = `${params} --show-menu`;
}

const main = async () => {
  console.log('Pake parameters is: ', params);
  console.log('Compile....');
  params = `${params} --icon ${icon_path}`
  exec(params);

  if (!fs.existsSync('output')) {
    fs.mkdirSync('output');
  }
  mv(`${process.env.NAME}.*`, 'output/');
  console.log('Build Success');
  cd('../..');
};

main();
