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

// 第二步：清洗与统计函数
// 清洗：只保留 0 至 100 之间的合法成绩（filter 返回新数组，不改原数据）
const cleanScores = (list) => list.filter(s => s.score >= 0 && s.score <= 100);

// 平均分：reduce 累加，空数组保护避免除零产生 NaN
const average = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, s) => sum + s.score, 0);
  return (total / list.length).toFixed(2);
};

// 最高分：用 reduce 逐个比较，保留成绩更大的那条记录
const highest = (list) => list.reduce((max, s) => (s.score > max.score ? s : max), list[0]);

// 不及格名单：先 filter 挑出不及格，再 map 只取名字
const failed = (list) => list.filter(s => s.score < 60).map(s => s.name);

console.log('清洗后：', cleanScores(scores));
console.log('平均分：', average(cleanScores(scores)));
console.log('最高分：', highest(cleanScores(scores)));
console.log('不及格：', failed(cleanScores(scores)));
