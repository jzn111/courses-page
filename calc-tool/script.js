// 自主实践：绩点计算器
// 数据形态：数组 + 对象。每条记录包含课程名、学分、成绩
// 故意混入几条非法数据用于测试清洗逻辑
const courses = [
  { course: '高等数学', credit: 4, score: 92 },
  { course: '大学英语', credit: 3, score: 78 },
  { course: '程序设计', credit: 4, score: 85 },
  { course: '线性代数', credit: 3, score: 55 },
  { course: '体育',     credit: 1, score: 88 },
  { course: '无效课程', credit: 0, score: 90 },   // 非法：学分为0
  { course: '超分课程', credit: 2, score: 120 },  // 非法：成绩超过100
  { course: '负分课程', credit: 2, score: -10 }   // 非法：成绩为负
];

console.table(courses);

// 第二步：清洗与计算函数
// 清洗：只保留学分>0 且 成绩在0~100之间的合法课程（filter 返回新数组）
const cleanCourses = (list) =>
  list.filter(c => c.credit > 0 && c.score >= 0 && c.score <= 100);

// 单科成绩转绩点（纯函数，单值进单值出）
// 规则：90+→4.0，80+→3.0，70+→2.0，60+→1.0，<60→0
const toGPA = (score) => {
  if (score >= 90) return 4.0;
  if (score >= 80) return 3.0;
  if (score >= 70) return 2.0;
  if (score >= 60) return 1.0;
  return 0;
};

// 为每门课补算绩点：map 返回新数组，给每个对象加上 gpa 字段
const withGPA = (list) => list.map(c => ({ ...c, gpa: toGPA(c.score) }));

// 加权平均绩点：reduce 累计 (绩点×学分) 和 (学分)，两者相除
const totalGPA = (list) => {
  if (list.length === 0) return 0;
  const { points, credits } = list.reduce(
    (acc, c) => ({
      points: acc.points + c.gpa * c.credit,
      credits: acc.credits + c.credit
    }),
    { points: 0, credits: 0 }
  );
  return credits === 0 ? 0 : Number((points / credits).toFixed(2));
};

// 平均分：reduce 累加成绩后除以课程数
const averageScore = (list) => {
  if (list.length === 0) return 0;
  const total = list.reduce((sum, c) => sum + c.score, 0);
  return Number((total / list.length).toFixed(2));
};

// 不及格课程名单：filter 挑出 <60，再 map 只取课程名
const failedCourses = (list) =>
  list.filter(c => c.score < 60).map(c => c.course);

const valid = cleanCourses(courses);
const graded = withGPA(valid);
console.log('清洗后课程：', graded);
console.log('加权绩点：', totalGPA(graded));
console.log('平均分：', averageScore(graded));
console.log('不及格：', failedCourses(graded));

// 第三步：格式化报告
const report = (list) => {
  const valid = cleanCourses(list);
  if (valid.length === 0) {
    return '没有有效课程，无法计算绩点';
  }
  const graded = withGPA(valid);
  const totalCredits = graded.reduce((sum, c) => sum + c.credit, 0);
  const failed = failedCourses(graded);
  return `本学期共${graded.length}门有效课程，总学分${totalCredits}，加权平均绩点${totalGPA(graded)}，平均分${averageScore(graded)}；不及格${failed.length}门：${failed.join('、') || '无'}`;
};

// 正常数据
try {
  console.log('【正常数据】', report(courses));
} catch (err) {
  console.error('报告生成失败：', err.message);
}

// 空数据测试
try {
  console.log('【空数据】', report([]));
} catch (err) {
  console.error('报告生成失败：', err.message);
}
