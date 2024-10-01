from common import client, model, makeup_response

# context를 유저별로 관리하도록, 즉 Chatbot 내부에서 context를 사용하지 않도록 한다
class Chatbot:

    def __init__(self, model, instruction):
        self.model = model
        self.instruction = instruction
        self.max_token_size = 16 * 1024
        self.available_token_rate = 0.9

    def _send_request(self, context):
        try:
            response = client.chat.completions.create(
                model=self.model, 
                messages=context,
                temperature=0.5,
                top_p=1,
                max_tokens=256,
                frequency_penalty=0,
                presence_penalty=0
            ).model_dump()
        except Exception as e:
            print(f"Exception 오류({type(e)}) 발생:{e}")
            if 'maximum context length' in str(e):
                self.context.pop()
                return makeup_response("질문이 너무 길어요. 잘 이해하지 못 하겠어요.")
            else: 
                return makeup_response("제 머릿속에 문제가 생긴 것 같아요. 죄송하지만 잠깐 쉬고 올게요.")

        return response

    def send_request(self, context):
        context[-1]['content'] += self.instruction
        return self._send_request(context)

    # token 수가 너무 커지는 걸 방지한다
    def handle_token_limit(self, response, context):
        try:
            current_usage_rate = response['usage']['total_tokens'] / self.max_token_size
            exceeded_token_rate = current_usage_rate - self.available_token_rate
            if exceeded_token_rate > 0:
                remove_size = math.ceil(len(context) / 10)
                context = [context[0]] + context[remove_size+1:]
        except Exception as e:
            print(f"handle_token_limit exception:{e}")

    # context에 추가한 instruction을 지운다
    def clean_context(self, context):
        for idx in reversed(range(len(context))):
            if context[idx]["role"] == "user":
                context[idx]["content"] = context[idx]["content"].split("instruction:\n")[0].strip()
                break