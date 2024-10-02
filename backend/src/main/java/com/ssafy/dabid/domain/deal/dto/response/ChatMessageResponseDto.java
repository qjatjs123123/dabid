package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor // 기본 생성자를 추가합니다.
@AllArgsConstructor // 모든 필드를 사용하는 생성자도 필요하면 추가합니다.
public class ChatMessageResponseDto {
    private int dealId; //거래방id
    private String email;
    private String nickname; //닉네임
    private String content; //메시지내용
    private String profile; //프로필이미지
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime createdAt;
}
