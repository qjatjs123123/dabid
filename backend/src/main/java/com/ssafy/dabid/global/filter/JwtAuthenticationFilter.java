package com.ssafy.dabid.global.filter;

import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.TokenType;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    private static final String LOGIN_URL = "/api/member/sign-in";
    private static final String HEADER_ACCESS = "Authorization";
    private static final String HEADER_REFRESH = "Authorization-refresh";

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        try{
            //로그인 요청인 경우 Username 어쩌구 필터으로 연결
            if(request.getRequestURI().equals(LOGIN_URL)){
                filterChain.doFilter(request, response);
                return;
            }

            String accessToken = getToken(request, HEADER_ACCESS);

            //유효한 액세스 토큰이 있으면
            if(StringUtils.hasText(accessToken)){

                String email = jwtUtils.extractTokenIfValid(accessToken, TokenType.ACCESS);
                if(StringUtils.hasText(email)
                        && SecurityContextHolder.getContext().getAuthentication() == null) {

                    saveAuthentication(request, email, accessToken);
                }
                filterChain.doFilter(request, response);
                return;
            }

            //리퀘스트에서 리프레시 토큰을 추출
            String refreshToken = getToken(request, HEADER_REFRESH);

            //리프레시 토큰이 없을 경우
            if(!StringUtils.hasText(refreshToken)){
                //액세스 토큰이 있을 경우

                filterChain.doFilter(request, response);
                return;

                //액세스 토큰도 없으면 인증에 실패한다
            }
            //리프레시 토큰이 있을 경우

            //액세스 토큰을 추출

            //토큰이 유효하면 액세스 토큰을 재발급한다
        } catch (Exception e){
            System.out.println(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private void saveAuthentication(HttpServletRequest request, String username, String accessToken){
        UserDetails user = userDetailsService.loadUserByUsername(username);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getAuthorities()
        );
        authToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authToken);
    }

    private String getToken (HttpServletRequest request, String headerType){
        String authorization = request.getHeader(headerType);

        if(!StringUtils.hasText(authorization)) return null;

        String prefix = "Bearer ";
        if(!authorization.startsWith(prefix)) return null;
        return authorization.substring(prefix.length());
    }
}
