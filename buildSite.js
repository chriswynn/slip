const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const nunjucks = require("nunjucks");
const liveServer = require("live-server");
const chokidar = require("chokidar");

const srcPath = "./src";
const distPath = "./public";

const buildPage = (file, { srcPath, distPath }) => {
  const fileData = path.parse(file);
  const destPath = path.join(distPath, fileData.dir);

  const dataFileRaw = fs.readFileSync(`${srcPath}/data/${fileData.name}.json`);
  const dataFileParsed = JSON.parse(dataFileRaw);

  fs.mkdirsSync(destPath);

  const data = fs.readFileSync(`${srcPath}/views/${file}`, "utf-8");
  const pageContent = nunjucks.renderString(
    data,
    Object.assign({}, { body: data }, dataFileParsed)
  );

  fs.writeFile(`${distPath}/${fileData.name}.html`, pageContent);
};

const build = () => {
  const files = glob.sync("**/*.njk", { cwd: `${srcPath}/views` });

  files.forEach(file => {
    buildPage(file, { srcPath, distPath });
  });
};

chokidar.watch(srcPath).on("change", path => {
  console.log(`Change in ${path} reloading...`);
  build();
});

liveServer.start({
  port: 8080,
  logLevel: 0,
  root: "./public",
  file: "index.html"
});
