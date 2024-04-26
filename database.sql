CREATE DATABASE IF NOT EXISTS pagarme;
USE pagarme;

CREATE TABLE IF NOT EXISTS client (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS transactions (
    id_transactions VARCHAR(36) PRIMARY KEY,
    id_client VARCHAR(36) REFERENCES client(id),
    description VARCHAR(255),
    value DECIMAL(10, 2),
    method_payment VARCHAR(50),
    card_number VARCHAR(16),
    name_owner VARCHAR(255),
    validate_date VARCHAR(5),
    cvv VARCHAR(3)
);


CREATE TABLE IF NOT EXISTS payables (
    id_payble VARCHAR(36) PRIMARY KEY,
    id_client VARCHAR(36) REFERENCES client(id),
    id_transaction VARCHAR(36) REFERENCES transactions(id_transaction)
    value DECIMAL(10, 2),
    status VARCHAR(36),
    payment_date DATE
);
