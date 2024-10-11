package com.ssafy.dabid.domain.member.dto.response;

import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RefreshResponseDto extends CommonResponseDto {
    String accessToken;

    public RefreshResponseDto(String accessToken) {
        super();
        this.accessToken = accessToken;
    }
}
