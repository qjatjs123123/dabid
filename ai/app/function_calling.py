from common import client, model, makeup_response 

topic_details = {
    "다비드":"This is the site name. 다비드 applies an auction system to the buying and selling of used items, allowing buyers to secure desired items by paying slightly more even if they discover them later than others. Sellers can often sell at a higher price than expected. After a successful bid, 다비드 ensures a safe transaction through an escrow system using a virtual account to prevent fraud.",
    "비딩":
"""
This auction method, used by 다비드, is also called a 'Vickrey Auction'.
Only the second-highest bid amount is displayed rather than the current highest bid amount, and bidders attempt to bid without knowing the highest.
Bids only register if they exceed the current highest bid, updating the highest and second-highest bids.
If the bid is below the highest bid, it is canceled. When the auction ends, the top bidder purchases at the second-highest bid price.
Through bidding, sellers can encourage competition, and buyers may purchase at prices below their target amount.
""",
    "에스크로":"다비드 uses an escrow system where a neutral third party (다비드) mediates between the seller and buyer. Buyers deposit payment into 다비드’s virtual account rather than sending it directly to the seller.",
    "포인트":"다비드 uses points as a deposit for auction registration and participation to prevent misuse by buyers and sellers. To join or register an auction, users must charge their account with points via 'My Page' after verifying their account with a 1 KRW deposit. Unused points are refundable.",
    "회원정보":"Users can view their membership information on '마이페이지'. For security, 다비드 restricts changes to membership details after sign-up to prevent impersonation.",
    "경매등록":"Sellers can register an auction by depositing 5,000 points. When registering, sellers describe the product, upload images, and set an auction period. Detailed descriptions and images can increase buyer interest. When the auction ends, the seller receives a notification and the deposit back. Sellers can cancel an auction midway, though they will not be refunded the deposit",
    "경매참여":"Buyers interested in bidding must pay a deposit of 30% of the starting bid in points. They may then bid multiple times without additional points. Participants can check if they are the highest bidder. Non-highest bidders can exit the auction at any time and receive their points back. If an auction is canceled, all participants are notified and refunded. If successful, the highest bidder becomes the winning bidder and proceeds with the transaction with the seller. The winning bidder is refunded their points after the transaction is complete.",
    "거래":"Sellers and buyers proceed via 다비드’s transaction page, where they can view updates and message each other. The winning bidder must deposit the final bid amount into 다비드’s virtual account within two days of the auction ending. Sellers confirm the deposit and ship the item, registering the tracking number. This allows buyers to track the shipment. After confirming receipt, buyers check the item condition and click '인수확인'. If no issues arise, the transaction is completed successfully.",
    "은행":"다비드 provides a 1 million KRW test account to support cash-strapped job seekers. Test accounts are automatically issued upon registration and are managed through '다비드뱅크', the virtual bank within 다비드.",
    "고객센터":"Some issues may arise during the auction or transaction that require assistance beyond the system’s capabilities. Customer support can be contacted for prompt resolution. For privacy, users can only view inquiries they have submitted.",
    "개발자":
"""
다비드 and 비드미 were developed by six programmers in their 20s, described here by name and characteristics:
유우준 (Diligent; resembles 조원상, the lead vocalist of the band "LUCY"),
조성욱 (Smart; skilled developer),
이민정 (Intimidating),
홍범선 (Reliable),
장윤주 (Talented),
황태건 (Useless)
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

def get_details_bank():
    return get_details("은행")

def get_details_cs():
    return get_details("고객센터")

def get_details_dev():
    return get_details("개발자")

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
            "description": "다비드의 비딩 시스템에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_escrow",
            "description": "다비드의 에스크로 거래 시스템에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_point",
            "description": "다비드에서 사용하는 포인트에 대한 정보 제공",
            "parameters": {
                "type": "void"
            },
        },
        {
            "name": "get_details_user_info",
            "description": "다비드의 회원 정책에 대한 정보 제공",
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
            "name": "get_details_bank",
            "description": "다비드의 은행 '다비드뱅크'에 대한 정보 제공",
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
            "name": "get_details_dev",
            "description": "다비드 사이트를 만든 개발자들에 대한 정보 제공",
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
            "get_details_bank" : get_details_bank,
            "get_details_cs" : get_details_cs,
            "get_details_dev" : get_details_dev,
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
                    