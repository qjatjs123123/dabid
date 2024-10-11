package com.ssafy.dabid.global.config;

import com.ssafy.dabid.global.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
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
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

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
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/member/auth/**", "/error", "/actuator/**", "/api/chat", "/api/deal/test/**", "/api/auctions", "api/auctions/title", "/api/auctions/test/title").permitAll()
                        .requestMatchers("/api/member/auth/sign-out").authenticated()
                        .anyRequest().authenticated())
                //세션 사용 방식 설정 -> Rest API 서버에서는 불필요하므로 미사용
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                //사용자 지정 필터를 해당 필터 다음에 추가
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOrigin("http://j11a505.p.ssafy.io");
        corsConfiguration.addAllowedOrigin("https://j11a505.p.ssafy.io");
        corsConfiguration.addAllowedOrigin("http://localhost:5173");// 잠시 추가
        corsConfiguration.addAllowedOrigin("https://finopenapi.ssafy.io/ssafy/api/v1");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}