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
    private static final String AUTH_HEADER = "Authorization";

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

            String accessToken = getAccessToken(request);

            //유효한 액세스 토큰이 있으면 인가 처리
            if(StringUtils.hasText(accessToken)){
                //TODO : 블랙리스트를 확인해 있으면 인가 진행

                String email = jwtUtils.extractTokenIfValid(accessToken, TokenType.ACCESS);
                if(StringUtils.hasText(email)
                        && SecurityContextHolder.getContext().getAuthentication() == null) {

                    saveAuthentication(request, email);
                }
            }
        } catch (Exception e){
            System.out.println(e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private void saveAuthentication(HttpServletRequest request, String username){
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

    private String getAccessToken (HttpServletRequest request){
        String authorization = request.getHeader(AUTH_HEADER);

        if(!StringUtils.hasText(authorization)) return null;

        String prefix = "Bearer ";
        if(!authorization.startsWith(prefix)) return null;
        return authorization.substring(prefix.length());
    }
}
