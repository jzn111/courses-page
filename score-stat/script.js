// 第一步：定义成绩数据
// 数组 + 对象 的组合：每条记录是一个对象，多条记录放在数组里
const scores = [
  { name: '李四', score: 92 },
  { name: '王五', score: 45 },
  { name: '赵六', score: 77 },
  { name: '孙七', score: 59 },
  { name: '周八', score: 88 },
  { name: '吴九', score: 105 },   // 故意混入非法值：满分100
  { name: '郑十', score: -3 }     // 负分也是非法值
];

console.table(scores);
