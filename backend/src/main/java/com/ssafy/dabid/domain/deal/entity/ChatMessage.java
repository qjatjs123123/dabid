package com.ssafy.dabid.domain.deal.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "CHATMESSAGE")
@Getter
@ToString
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ChatMessage {

    @Id
    private ObjectId id;
    private int dealId; // 거래방id
    private Long memberId;  // 사용자id
    private String content; // 내용
    private LocalDateTime createdAt; // 작성일
}
