from flask import Flask, request
from chatbot import Chatbot
from common import model

app = Flask(__name__)

bidme = Chatbot(model.basic)

@app.route('/')
def hello():
    return 'Hello Flask World'

@app.route("/init")
def init():
    return 'Some Initial text'

@app.route("/ask", methods=['POST'])
def reply():
    content = request.json['content']
    bidme.add_user_message(content)
    response = bidme.send_request()
    bidme.add_response(response)
    return {"reply" : bidme.get_response_content()}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    