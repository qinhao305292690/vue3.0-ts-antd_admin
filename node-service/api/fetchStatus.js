module.exports = function () {
  const returnObj = {}
  const args = [...arguments]
  args.forEach(_arg => {
    if (_arg instanceof Object) returnObj.data = _arg
    if (!isNaN(Number(_arg))) returnObj.code = _arg
    if (typeof _arg === 'string') returnObj.message = _arg
  })
  console.log(args, 'args');
  console.log(returnObj, 'returnObj');
  if (!returnObj.hasOwnProperty('code')) returnObj.code = 0
  return returnObj
}
