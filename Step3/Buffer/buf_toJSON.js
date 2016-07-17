
// buf.toJSON()#
// 将buffer转变成JSON对象

const buf = Buffer.from('test');
const json = JSON.stringify(buf);

console.log(json);
// Prints: '{"type":"Buffer","data":[116,101,115,116]}'

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer'
      ? Buffer.from(value.data)
      : value;
  });

console.log(copy.toString());
// Prints: 'test'