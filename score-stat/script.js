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

// 第三步：等级分布与格式化报告
// 等级判定：单值进单值出的纯函数
const toGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// 各等级人数统计：forEach 遍历，用对象计数
const gradeCount = (list) => {
  const result = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  list.forEach(s => { result[toGrade(s.score)]++; });
  return result;
};

// 格式化报告：组装所有统计结果为一段可读文字
const report = (list) => {
  const valid = cleanScores(list);
  if (valid.length === 0) {
    return '没有有效成绩';
  }
  const dist = gradeCount(valid);
  const top = highest(valid);
  return `有效人数${valid.length}人，平均${average(valid)}分，最高${top.score}分（${top.name}）；等级分布：A${dist.A}人 B${dist.B}人 C${dist.C}人 D${dist.D}人 F${dist.F}人；不及格名单：${failed(valid).join('、') || '无'}`;
};

// 用 try...catch 包住报告生成，防止意外崩溃
try {
  console.log(report(scores));
} catch (err) {
  console.error('报告生成失败：', err.message);
}
