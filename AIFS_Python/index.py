import json
import os
import requests

def lambda_handler(event, context):
    # 从环境变量获取OpenAI API密钥
    openai_api_key = os.environ['OPENAI_API_KEY']
    api_url = 'https://api.openai.com/v1/chat/completions'

    # 从Lambda事件中提取查询字符串
    query = event.get('queryStringParameters', {}).get('query', '')

    # 构造OpenAI的prompt
    prompt = f"Given the following names and their translations:\n"\
             f"David Smith 大卫 斯密斯,\n"\
             f"Yueling Wang 月林张,\n"\
             f"Huawen Wu 华文吴,\n"\
             f"Annie Lee 李安妮,\n\n"\
             f"Find the best match for the input: \"{query}\""

    # 调用OpenAI API
    response = requests.post(
        api_url,
        headers={'Authorization': f'Bearer {openai_api_key}'},
        json={'prompt': prompt, 'max_tokens': 100}
    )

    if response.status_code == 200:
        result = response.json().get('choices', [{}])[0].get('text', '').strip()
    else:
        result = 'Error calling OpenAI API'

    # 返回Lambda响应
    return {
        'statusCode': 200,
        'body': json.dumps({'match': result})
    }
