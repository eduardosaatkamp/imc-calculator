CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imc_cliente DECIMAL(5,2),
    glicemia_cliente DECIMAL(5,2),
    obs_imc VARCHAR(255),
    obs_glicemia VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
