package com.example.imc_calculator.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite todas as rotas
                .allowedOrigins("http://localhost:3000")  // Permite o frontend rodando no localhost:3000
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Métodos permitidos
                .allowedHeaders("*")  // Permite todos os headers
                .allowCredentials(true);  // Permite envio de credenciais (cookies, etc.)
    }
}