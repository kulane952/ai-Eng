const fs = require("fs");
const path = require("path");

function exportContent(content, filename = "content.txt") {
  const outputDirectory = path.join(process.cwd(), "output");

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, {
      recursive: true,
    });
  }

  const filePath = path.join(outputDirectory, filename);

  fs.writeFileSync(filePath, content, "utf8");

  return filePath;
}

module.exports = exportContent;