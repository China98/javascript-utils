
function isHexColor(color: string): boolean {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-f]{6})$/.test(color);
}

  // 位运算符之 <<
  // 例如：r = 255 转为二进制则为 0b11111111
  // 前进16位 则后面补16个0  即0b111111110000000000000000
  // 再转换为10进制， 16711680
  // 转为16进制则为 ff0000
  // g、b 同理  
function rgb_transform_hex(r: number, g: number, b: number) {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
}

// 取12、34、56位 进行10进制转换
function hex_transform_rgb(hex: string) {
    let sHex = hex.toLowerCase();
    if (isHexColor(hex)) {
      // 考虑到#fff、#333等类似情况
      //  需要先转成 #ffffff    
      if (sHex.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sHex.slice(i, i + 1).concat(sHex.slice(i, i + 1));
        }
        sHex = sColorNew;
      }
      const sColorChange: number[] = [];
      for (let i = 1; i < 7; i += 2) {
        // parseInt 转为10进制
        // #ffffff ff转为10进制就是255
        sColorChange.push(parseInt('0x' + sHex.slice(i, i + 2)));
      }
      return 'RGB(' + sColorChange.join(',') + ')';
    }
    return sHex;
  }