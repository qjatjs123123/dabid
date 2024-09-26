package com.ssafy.dabid.domain.member.dto.response;

import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RandomNicknameResponseDto extends CommonResponseDto {
    private String nickname;

    public RandomNicknameResponseDto(String nickname) {
        super();
        this.nickname = nickname;
    }
}
