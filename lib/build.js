const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const nunjucks = require("nunjucks");

const srcPath = "./src";
const outPath = "./public";

const parseFile = async file => {
  return path.parse(file);
};

const setPagePath = async file => {
  return file.name != "index"
    ? path.join(outPath, file.name)
    : path.join(outPath, file.dir);
};

const getJSON = async pageName => {
  return fs
    .readFile(`${srcPath}/data/${pageName}.json`)
    .then(json => {
      return JSON.parse(json);
    })
    .catch(err => console.log(err));
};

const getTemplateString = async file => {
  return fs.readFile(`${srcPath}/views/${file.base}`, "utf-8");
};

const compileTemplate = async (template, data) => {
  return nunjucks.renderString(template, data);
};

const writePage = async (path, page) => {
  return fs
    .ensureDir(path)
    .then(() => {
      fs.writeFile(`${path}/index.html`, page).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

async function buildPage(page) {
  const file = await parseFile(page);
  const data = await getJSON(file.name);
  const path = await setPagePath(file);
  const template = await getTemplateString(file);
  const compiledPage = await compileTemplate(template, data);

  await writePage(path, compiledPage);
}

const build = () => {
  fs.ensureDir(outPath)
    .then(() => {
      const files = glob.sync("**/*.njk", { cwd: `${srcPath}/views` });

      files.forEach(file => {
        buildPage(file);
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = build;
