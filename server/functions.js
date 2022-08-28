const fs = require("fs");
const Font = require("./model/Font");
const path = require("path");
// const express = require()

async function getFont(fontFamily) {
  const fontFound = await Font.find({
    fontName: fontFamily,
  });

  fontFound[0]["fontWeights"].map((w) => {
    switch (w["fontWeight"]) {
      case "100":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "200":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "300":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "400":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "500":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "600":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "700":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "800":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;
      case "900":
        writeCss(fontFamily, w["fontWeight"], w["fontUrl"]);
        break;

      default:
        break;
    }
  });
}

function writeCss(fontFamily, fontWeight, fontUrl) {
  fs.appendFile(
    __dirname + "/public/styles.css",
    `
@font-face {
  font-family: '${fontFamily}';
  src: url('${fontUrl}') format('woff2');
  font-weight: ${parseInt(fontWeight)};
}
          `,
    (err) => {
      if (!err) {
        console.log("created");
      }
    }
  );
}

module.exports = { getFont, writeCss };
