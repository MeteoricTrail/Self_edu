import requests

def query_openai_api(prompt):
    # 替换为你的OpenAI API密钥
    openai_api_key = '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'
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
