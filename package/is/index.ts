
function is(value: unknown, type: string): boolean {
  return Object.prototype.toString.call(value) === `[object ${Object}]`
}

function isFunction(value: unknown): value is Function {
  return is(value, 'Funtion');
}

function isRegExp(value: unknown): value is RegExp {
  return is(value, 'RegExp');  
}
