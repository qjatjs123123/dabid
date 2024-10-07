import redis
import json
from flask import Flask, request
from flask_cors import CORS
from chatbot import Chatbot
from common import model
from characters import system_role, instruction
from memory_manager import MemoryManager
from function_calling import FunctionCalling, func_specs

app = Flask(__name__)
CORS(app)

bidme = Chatbot(model.basic, instruction)
func_calling = FunctionCalling(model = model.basic)

memoryManager = MemoryManager()

# 리액트 저장소에 email이 저장되어있다면 session을 사용할 필요는 없을 듯

# post 방식
@app.route("/chatbot/init", methods=['POST'])
def init():
    # 프론트에서 로그인 성공 후 호출됨
    # 해당 user의 context를 초기화하고 system role을 추가한다
    user_id = request.json.get('email')
    memoryManager.clear(user_id)
    memoryManager.add(user_id, json.dumps({"role": "system", "content": system_role}, ensure_ascii=False))
    return "OK"

# get 방식
@app.route("/chatbot/list")
def list():
    user_id = request.args.get('email')
    context_list = memoryManager.list(user_id)
    response = []
    for item in context_list[1:]:
        response.append(json.loads(item))
    # 빈 리스트를 반환했을 경우 프론트에서 초기 메세지 출력(context에는 남지 않는다)
    return response

@app.route("/chatbot/ask", methods=['POST'])
def reply():
    # 해당 user의 대화를 읽고 새 응답만 반환
    # 대화 내용 갱신은 프론트에서 처리. 단 context에는 제대로 추가된다
    user_id = request.json['email']
    content = request.json['message']
    memoryManager.add(user_id, json.dumps({"role" : "user", "content" : content}, ensure_ascii=False))
    context_list = memoryManager.list(user_id)
    context = []
    for item in context_list:
        context.append(json.loads(item))

    analyzed_dict = func_calling.analyze(content, func_specs)

    if(analyzed_dict.get("function_call")):
        response = func_calling.run(analyzed_dict, context)
    else:
        response = bidme.send_request(context)
        
    bidme.handle_token_limit(response, context)
    bidme.clean_context(context)
    response_json = {"role" : response['choices'][0]['message']["role"], "content" : response['choices'][0]['message']["content"]}
    memoryManager.add(user_id, json.dumps(response_json, ensure_ascii=False))
    return {"reply" : response_json["content"]}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    