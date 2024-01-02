import { APIGatewayProxyHandler } from 'aws-lambda';

// 预定义的人名列表
const names = [
  "David Smith 大卫 斯密斯",
  "Yueling Wang 月林张",
  "Huawen Wu 华文吴",
  "Annie Lee 李安妮"
];

// Lambda 函数
export const handler: APIGatewayProxyHandler = async (event) => {
  const inputName = event.queryStringParameters?.name;

  if (!inputName) {
    return { statusCode: 400, body: 'No name provided' };
  }

  // 分割输入名字为单独部分
  const inputParts = inputName.trim().split(/\s+/);
  
  // 初始化名字与权重的映射
  let nameWeights = names.map(name => ({
    name,
    weight: 0
  }));

  // 在人名列表中查找匹配项
  for (let part of inputParts) {
    nameWeights = nameWeights.map(({ name, weight }) => {
      const nameParts = name.split(/\s+/);
      const match = nameParts.some(namePart => namePart.toLowerCase() === part.toLowerCase());
      return { name, weight: match ? weight + 1 : weight };
    });
  }

  // 找到权重最高的匹配
  const bestMatch = nameWeights.reduce((prev, current) => {
    return (prev.weight > current.weight) ? prev : current;
  });

  console.log(`Best match for ${inputName} is ${bestMatch.name}`)
  return {
    statusCode: 200,
    body: JSON.stringify({ match: bestMatch.name })
  };
};
