package com.ssafy.dabid.domain.member.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RandomNicknameMapper {
    String selectRandomNickname();
    void updateUsed(String nickname);
}
