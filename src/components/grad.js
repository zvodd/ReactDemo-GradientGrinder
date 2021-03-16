import Hashes from "jshashes";
import * as cssGparse from "gradient-parser";
// import { Pdf } from "pdf-parse"; // for Adobe Illustrator Files

class ColorU8 {
  // constructor(r, b, g, a) {
  //   // this.r = r;
  //   // this.b = b;
  //   // this.g = g;
  //   // this.a = a;
  //   if (typeof a == "undefined") {
  //     this.rgba = new Uint8Array([]);
  //   }
  // }

  static fromHex(hexstr) {
    const hxs = hexstr.trim().replace(/#/, "");
    switch (hxs.length) {
      case 3:
        return new Uint8Array([
          parseInt(hxs.charAt(1), 16) * 0x11,
          parseInt(hxs.charAt(2), 16) * 0x11,
          parseInt(hxs.charAt(0), 16) * 0x11,
          255
        ]);
      case 6:
        return new Uint8Array([
          parseInt(hxs.substr(0, 2), 16),
          parseInt(hxs.substr(2, 2), 16),
          parseInt(hxs.substr(4, 2), 16),
          255
        ]);
      default:
        throw Error(`Wrong Color Format : "${hxs}"`);
    }
  }

  static toHex(cols) {
    // console.log("Cols: ", cols.values());
    return "#" + cols.slice(0, 3).reduce((y, z) => y + z.toString(16), "");
  }
}

class Gradient {
  constructor(colors, offsets) {
    this.colors = colors;
    this.offsets = offsets;
    this.id = this._HashID();
  }

  asStops() {
    return this.colors.map((c) => ({ stopColor: ColorU8.toHex(c) }));
  }

  _HashID() {
    const jsoned = JSON.stringify(this.colors, this.offsets);
    return new Hashes.SHA1().hex(jsoned);
  }

  static fromHexs(hexarr, offsets) {
    const cols = hexarr.map((hc) => ColorU8.fromHex(hc));
    if (typeof offsets === "undefined") {
      offsets = equalOffsets(cols.length);
    }
    return new Gradient(cols, offsets);
  }
}

function equalOffsets(length) {
  const factor = 100 / (length - 1);
  var offsets = [0];
  for (var i = 1; i < length - 1; i++) {
    offsets[i] = i * factor;
  }
  offsets.push(100);
  return offsets;
}

const Thing = () => {
  return cssGparse.parse("linear-gradient(30deg, #000, transparent)");
};

export { Thing, Gradient, ColorU8 };
// function colors(incols) {
//   var out = {};
//   for (var x of incols) {
//     out.push({
//       color : x
//     })
//   }
// }
