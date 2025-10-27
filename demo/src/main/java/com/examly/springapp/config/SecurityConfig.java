package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${jwt.secret:ChangeThisSecretKeyToAStrongRandomStringChangeThisSecretKey}")
    private String jwtSecret;

    @Value("${jwt.expirationMillis:7200000}") // default 2 hours
    private long jwtExpirationMillis;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Allow login/register and swagger; others require auth
                .requestMatchers("/auth/login", "/auth/register").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public read-only endpoints (MVP): allow GET without auth
                .requestMatchers(HttpMethod.GET,
                    "/squads", "/squads/**",
                    "/notifications", "/notifications/**",
                    "/analytics/teams", "/analytics/teams/**",
                    "/teams", "/teams/**",
                    "/players", "/players/**"
                ).permitAll()
                
                // Allow specific endpoints for testing
                .requestMatchers("/players/test", "/players/add").permitAll()
                .requestMatchers(HttpMethod.GET, "/teams", "/teams/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/teams").permitAll()

                // Admin-only endpoints //this
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // Admin-only write operations for core resources
                .requestMatchers(HttpMethod.POST, "/teams/**", "/players/**", "/matches/**", "/evaluations/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/teams/**", "/players/**", "/matches/**", "/evaluations/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/teams/**", "/players/**", "/matches/**", "/evaluations/**").hasRole("ADMIN")

                // Other requests require authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}