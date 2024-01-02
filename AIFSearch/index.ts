import { APIGatewayProxyHandler } from 'aws-lambda';
import axios from 'axios';

// 定义OpenAI响应的接口
interface OpenAIResponse {
    choices: Array<{
        message:{
            content:string
        };
    }>;
}

// 函数用于查询OpenAI API
async function queryOpenAI(prompt: string): Promise<string> {
    // 从环境变量获取OpenAI API密钥
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
        
    try {
        const response = await axios.post<OpenAIResponse>(
            apiUrl,
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "system", "content": prompt}],
            },
            { headers: { 'Authorization': `Bearer ${openAiApiKey}` } }
        );
        console.log("OpenAI API Response:", JSON.stringify(response.data));
        const content = response.data.choices[0].message.content;
        const match = content.match(/(David Smith 大卫 斯密斯|Yueling Wang 月林张|Huawen Wu 华文吴|Annie Lee 李安妮)/); //正则表达式匹配
        if (match) {
            return match[0];
        }
        return 'No match found';
        //return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return '';
    }
}


// Lambda处理器函数
export const handler: APIGatewayProxyHandler = async (event) => {
    // 提取查询字符串
    const input = event.queryStringParameters?.query || '';

    // 构造OpenAI的prompt
    const prompt = `Given the following names translations:
    David Smith 大卫 斯密斯,
    Yueling Wang 月林张,
    Huawen Wu 华文吴,
    Annie Lee 李安妮,

    The input is "${input}". Return only the matching name in English followed by Chinese from the list above.`;

    // 调用OpenAI API
    const response = await queryOpenAI(prompt);
    // 返回Lambda响应
    

    return {
        statusCode: 200,
        body: JSON.stringify({ match: response })
    };
};
