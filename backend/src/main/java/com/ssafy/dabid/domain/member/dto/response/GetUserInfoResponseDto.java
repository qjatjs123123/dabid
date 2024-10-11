package com.ssafy.dabid.domain.member.dto.response;

import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetUserInfoResponseDto extends CommonResponseDto {
    private String email;
    private String phoneNumber;
    private String nickname;
    private String imageUrl;
    private int point;
    private String role;
    private String accountNo;
    private boolean accountActive;
}
