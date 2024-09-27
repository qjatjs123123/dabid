from common import client, model
from pprint import pprint

class Chatbot:

    def __init__(self, model):
        self.context = [{"role": "system", "content": "You are a helpful assistant."}]
        self.model = model

    def add_user_message(self, message):
        self.context.append({"role": "user", "content": message})

    def send_request(self):
        response = client.chat.completions.create(
            model=self.model, 
            messages=self.context
        ).model_dump()
        return response

    def add_response(self, response):
        self.context.append({
                "role" : response['choices'][0]['message']["role"],
                "content" : response['choices'][0]['message']["content"],
            }
        )

    def get_response_content(self):
        return self.context[-1]['content']