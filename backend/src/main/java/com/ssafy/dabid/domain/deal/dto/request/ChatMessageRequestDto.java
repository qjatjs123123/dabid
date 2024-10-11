package com.ssafy.dabid.domain.deal.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor // 기본 생성자를 추가합니다.
@AllArgsConstructor // 모든 필드를 사용하는 생성자도 필요하면 추가합니다.
public class ChatMessageRequestDto {
    private int dealId;
    private String email;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime createdAt; // 작성일
}
