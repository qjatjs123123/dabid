package com.ssafy.dabid.global.config.kafka;

import com.ssafy.dabid.domain.deal.dto.response.ChatMessageResponseDto;
import com.ssafy.dabid.domain.deal.entity.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;


@Slf4j
@Component
@RequiredArgsConstructor
public class Consumer {

    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "${spring.kafka.template.default-topic}", groupId = "${spring.kafka.consumer.group-id}")
    public void consume(ChatMessageResponseDto message){
        log.info("CONSUME PAYLOAD : " + message.getNickname()+":"+message.getContent());
        try{
            messagingTemplate.convertAndSend("/sub/chat/room/" + message.getDealId(), message);
        }catch(Exception ex){
            log.error(ex.getMessage() + "consumer 실패");
        }
    }


}