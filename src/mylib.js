// 01.02.2026  library functions
function hexRgbConverter(hex) {
  //test hex for correct format
  const validHex = /^#?([a-fA-F0-9]{6})$|^#?([a-fA-F0-9]{3})$/.test(hex)
  if (!validHex) {
    throw new Error("Invalid hex color format")
  }
  //remove # from begining of string if present
  if (hex.startsWith("#")) {
    hex = hex.slice(1)
  }
  //parse hex to rgb for 6digit format
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return { r, g, b }
    //parse hex to rgb for 3 digit format
  } else if (hex.length === 3) {
    const r = parseInt(hex.charAt(0) + hex.charAt(0), 16)
    const g = parseInt(hex.charAt(1) + hex.charAt(1), 16)
    const b = parseInt(hex.charAt(2) + hex.charAt(2), 16)
    return { r, g, b }
  }
}
module.exports = { hexRgbConverter }
