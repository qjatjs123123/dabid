from common import client, model, makeup_response 

topic_details = {
    "다비드":"이 사이트의 이름입니다. 다비드에서는 중고 제품 매매에 경매 시스템을 적용하여, 구매자는 원하던 중고 제품을 남들보다 늦게 발견하더라도 돈만 더 내면 물건을 얻을 수 있으며, 판매자는 중고 제품을 기대하던 가격보다 더 비싸게 팔 수 있습니다. 또한 다비드는 낙찰 후 '가상 계좌를 통한 에스크로 방식 거래'를 통해 사기를 방지하고 안전한 거래를 보장합니다.",
    "비딩":
"""
다비드에서 채택한 경매 방식입니다. '비크리 경매'라고도 부르는 이 방식에서는 경매에서 현재 최고가가 아닌 두 번째로 높은 입찰가만 공개되고, 입찰자는 최고가를 알지 못한 채 입찰을 시도하게 됩니다. 입찰 금액이 최고가보다 높을 경우에만 입찰이 인정되고 최고가와 두 번째 입찰가가 갱신됩니다. 입찰 금액이 최고가보다 낮으면 입찰 자체가 취소됩니다. 경매가 종료되면, 최고가를 제시한 입찰자가 두 번째 입찰 금액을  지불하게 됩니다. 비딩을 통해 판매자는 구매자들의 경쟁을 유도할 수 있고 구매자는 물건을 목표 금액보다 저렴하게 구매할 수 있습니다.
""",
    "에스크로":"다비드에서 채택한 거래 방식입니다. 판매자와 구매자 사이에서 신뢰할 수 있는 중립적인 제삼자, 즉 다비드가 거래를 중개합니다. 구매자는 금액을 판매자가 아닌 다비드의 거래용 가상 계좌로 입금합니다.",
    "포인트":"다비드에서 포인트는 경매 등록과 참여에 대한 보증금으로 활용됩니다. 보증금을 적용하여 판매자와 구매자의 악의적인 행동을 예방할 수 있습니다. 경매 참여나 등록을 위해서는 다비드의 마이페이지에서 1원 인증으로 등록한 내 계좌로 포인트를 충전해서 사용해야 합니다. 사용하지 않는 포인트를 계좌로 환급받을 수 있습니다.",
    "회원정보":"유저 본인의 회원 정보는 '마이페이지'에서 확인할 수 있습니다. 사칭 방지를 위해 다비드에서는 회원가입 이후에는 회원 정보의 수정을 제한했습니다.",
    "경매등록":"판매자는 보증금으로 5000 포인트를 지불하고 경매를 등록할 수 있습니다. 경매를 등록할 때는 제품에 대한 설명을 작성하고 이미지를 첨부한 뒤 경매 기간을 설정해야 합니다. 설명과 이미지가 자세할수록 구매자들의 경매 참여율이 높아질 것입니다. 경매 기간이 만료되면 판매자는 종료 알림을 받고 포인트를 돌려 받습니다. 판매자는 경매 진행 도중에도 경매를 중단할 수 있습니다. 이 경우 포인트를 돌려 받지 못합니다.",
    "경매참여":"물품 구매를 희망하는 유저는 해당 물품 경매의 시작 입찰가의 30%를 포인트로 지불하고 경매에 참여할 수 있습니다. 참여 후에는 포인트 추가 지불 없이 얼마든지 입찰을 시도할 수 있습니다. 참가자는 경매에서 자신이 최고가 입찰자인지 확인할 수 있습니다. 최고가 입찰자를 제외한 모든 참가자는 경매를 도중에 포기하고 포인트를 돌려받을 수 있습니다. 경매가 도중에 취소되면 모든 참가자가 알림을 받고 포인트를 돌려 받습니다. 경매가 성공적으로 종료되면 최고가 입찰자가 낙찰자가 되어 판매자와 거래를 진행하게 됩니다. 낙찰자는 거래를 정상적으로 마친 후에 포인트를 돌려 받을 수 있습니다.",
    "거래":"판매자와 구매자는 다비드의 거래 페이지에서 거래를 진행하게 됩니다. 둘은 거래 진행 상황을 실시간으로 확인하고 채팅을 주고 받을 수 있습니다. 낙찰에 성공한 구매자는 경매 종료 후 이틀 이내에 다비드의 가상 계좌에 낙찰액을 입금해야 합니다. 판매자는 가상계좌에 돈이 입금된 사실을 확인한 뒤 택배를 배송하고, 배송한 택배의 송장번호를 등록해야 합니다. 송장 번호를 등록하면 구매자는 택배 배송 상황을 확인할 수 있습니다. 택배가 도착한 사실을 확인하면 구매자는 물품의 상태를 확인하고 '인수하기' 버튼을 누릅니다. 이 일련의 절차가 문제 없이 진행되면 거래가 성공적으로 종료됩니다.",
    "은행과 계좌":"가난한 취업 준비생들의 서비스 이용을 위해 다비드에서는 100만원이 입금된 테스트용 계좌를 제공하고 있습니다. 테스트 계좌는 회원 가입 시 자동으로 발급되며, 다비드 내부의 가상 은행 '다비드뱅크'에서 계좌를 관리할 수 있습니다.",
    "고객센터":"경매나 거래 중 시스템적으로 해결하지 못하는 문제가 발생할 수 있습니다. 고객센터에서 문의를 작성하면 빠른 시일 내에 적절한 조치를 받을 수 있습니다. 개인 정보 유출 우려가 있으므로 유저는 자신이 작성한 문의만 확인할 수 있습니다.",
    "사람":
"""
다비드와 비드미를 개발한 6명의 20대 프로그래머들입니다. 비드미는 나머지 사람들에 대해서는 알지 못합니다.
유우준(부지런함, 밴드 "LUCY"의 메인 보컬 "조원상"을 닮음)
조성욱(똑똑함, 개발을 잘함) 
이민정(무서움)
홍범선(든든함)
장윤주(재능있음)
황태건(쓸모없음)
"""
}
def get_details(topic):
    return topic_details.get(topic)

def get_details_dabid():
    return get_details("다비드")

def get_details_bidding():
    return get_details("비딩")

def get_details_escrow():
    return get_details("에스크로")

def get_details_point():
    return get_details("포인트")

def get_details_user_info():
    return get_details("회원정보")

def get_details_apply_auction():
    return get_details("경매등록")

def get_details_enter_auction():
    return get_details("경매참여")

def get_details_deal():
    return get_details("거래")

def get_details_bank_account():
    return get_details("은행과 계좌")

def get_details_cs():
    return get_details("고객센터")

def get_details_person():
    return get_details("사람")

func_specs = [
        {
            "name": "get_details_dabid",
            "description": "다비드 사이트에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_bidding",
            "description": "비딩에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_escrow",
            "description": "에스크로 거래에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_point",
            "description": "포인트에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_user_info",
            "description": "회원 정책에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_apply_auction",
            "description": "다비드에서 경매를 등록하는 방법에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_enter_auction",
            "description": "다비드에서 경매에 참가하는 방법에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_deal",
            "description": "다비드에서 경매 물품을 거래하는 방법에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_bank_account",
            "description": "다비드의 은행 '다비드뱅크'와 다비드에서 제공하는 '테스트 계좌'에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_cs",
            "description": "다비드의 고객센터에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_person",
            "description": "비드미가 아는 사람들에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
    ]


class FunctionCalling:

    def __init__(self, model):
        self.available_functions = {
            "get_details_dabid" : get_details_dabid,
            "get_details_bidding" : get_details_bidding,
            "get_details_escrow" : get_details_escrow,
            "get_details_point" : get_details_point,
            "get_details_user_info" : get_details_user_info,
            "get_details_apply_auction" : get_details_apply_auction,
            "get_details_enter_auction" : get_details_enter_auction,
            "get_details_deal" : get_details_deal,
            "get_details_bank_account" : get_details_bank_account,
            "get_details_cs" : get_details_cs,
            "get_details_person" : get_details_person,
        }
        self.model = model


    def analyze(self, user_message, func_specs):
        try:
            response = client.chat.completions.create(
                    model=model.basic,
                    messages=[{"role": "user", "content": user_message}],
                    functions=func_specs,
                    function_call="auto", 
                )
            message = response.choices[0].message
            message_dict = message.model_dump() 
            return message_dict
        except Exception as e:
            return makeup_response("자세한 정보를 가져오지 못했습니다")
        

    def run(self, analyzed_dict, context):
        func_name = analyzed_dict["function_call"]["name"]
        func_to_call = self.available_functions[func_name]
        try:
            details = func_to_call()
            context.append({
                "role": "function", 
                "name": func_name, 
                "content": details
            })
            return client.chat.completions.create(model=self.model,messages=context).model_dump()            
        except Exception as e:
            print("Error occurred(run):",e)
            return makeup_response("자세한 정보를 가져오지 못했습니다")
                    