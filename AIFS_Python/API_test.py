import requests

def query_openai_api(prompt):
    openai_api_key = 'API_KEY' #从环境变量获取OpenAI API密钥
    headers = {
        'Authorization': f'Bearer {openai_api_key}',
        'Content-Type': 'application/json'
    }

    data = {
        'prompt': prompt,
        'max_tokens': 50
    }

    response = requests.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions',
        json=data,
        headers=headers
    )

    return response.json()

# 测试prompt
prompt = "Translate the following English text to French: 'Hello, how are you?'"

# 调用API并打印响应
try:
    result = query_openai_api(prompt)
    print(result)
except Exception as e:
    print(f"Error: {e}")
