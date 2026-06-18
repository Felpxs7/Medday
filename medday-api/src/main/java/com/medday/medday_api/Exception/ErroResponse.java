package com.medday.medday_api.Exception;

import java.time.LocalDateTime;

public record ErroResponse(
        LocalDateTime timestamp,
        int status,
        String erro,
        String mensagem,
        String path
) {
    public ErroResponse(int status, String erro, String mensagem, String path) {
        this(LocalDateTime.now(), status, erro, mensagem, path);
    }
}
