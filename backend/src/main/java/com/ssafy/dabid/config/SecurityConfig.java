package com.ssafy.dabid.config;

import com.ssafy.dabid.filter.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        
        //보안 설정
        http
                //corsConfigurationSource 기반으로 cors 허용
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                //csrf는 웹 MVC에서 필요 -> Rest API 서버에서는 불필요하므로 미사용
                .csrf(CsrfConfigurer::disable)
                //httpBasic은 웹 MVC에서 필요 -> Rest API 서버에서는 불필요하므로 미사용
                .httpBasic(HttpBasicConfigurer::disable)
                //formLogin은 웹 MVC에서 필요 -> Rest API 서버에서는 불필요하므로 미사용
                .formLogin(FormLoginConfigurer::disable)
                //시큐리티를 적용/미적용할 url 지정
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/", "/sign-up", "/sign-in").permitAll()
                        .anyRequest().authenticated())
                //로그아웃 시 행동 설정
                .logout((logout) -> logout.logoutSuccessUrl("/")) //성공 시 메인페이지로 이동
                //세션 사용 방식 설정 -> Rest API 서버에서는 불필요하므로 미사용 
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //사용자 지정 필터를 해당 필터 다음에 추가 
                .addFilterBefore(new JwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOrigin("http://j11a505.p.ssafy.io");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}