package com.ssafy.dabid.domain.member.entity;

import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {
    @Id @GeneratedValue
    private Integer id;

    private String email;

    private String password;

    private String phoneNumber;

    private String refreshToken;

    private String userKey;

    private String nickname;

    private String imageUrl;

    private Integer point;

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
