
import axios from 'axios';

interface OpenAIResponse {
    choices: Array<{ text: string }>;
}

async function queryOpenAI(prompt: string): Promise<string> {
    const openAiApiKey = "API_KEY" // 从环境变量获取OpenAI API密钥
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await axios.post<OpenAIResponse>(
            apiUrl,
            { prompt, max_tokens: 100 }, 
            { headers: { 'Authorization': `Bearer ${openAiApiKey}` } }
        );
        return response.data.choices[0].text;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return '';
    }
}

async function findMatchingName(input: string): Promise<string> {
    const prompt = `Given the following names and their translations:
    David Smith 大卫 斯密斯,
    Yueling Wang 月林张,
    Huawen Wu 华文吴,
    Annie Lee 李安妮,

    Find the best match for the input: "${input}"`;

    const response = await queryOpenAI(prompt);
    return response;
}

// 测试函数
const input = 'David'; // 可替换为任意输入
findMatchingName(input).then(response => {
    console.log(response); // 输出最匹配的姓名
});
