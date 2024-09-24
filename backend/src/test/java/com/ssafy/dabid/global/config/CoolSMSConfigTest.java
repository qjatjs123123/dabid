package com.ssafy.dabid.global.config;

import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.MessageListRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MessageListResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CoolSMSConfigTest {

    @Autowired
    DefaultMessageService messageService;

    @Test
    void 동작여부확인() {
        MessageListRequest request = new MessageListRequest();
        request.setLimit(1);

        MessageListResponse response = messageService.getMessageList(request);
        System.out.println(response);
    }

    @Test
    void 이게되겠어(){
        Message message = new Message();

        message.setFrom("01066406343");
        message.setTo("01045649350");
        message.setText("이게되겠냐고");

        messageService.sendOne(new SingleMessageSendingRequest(message));
    }
}