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
