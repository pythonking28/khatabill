CREATE DATABASE khatabillDatabase;

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Billbooks (
    billbook_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    total_pages INT NOT NULL,
    created_at VARCHAR NOT NULL

);

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    address TEXT,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    bill_id INTEGER REFERENCES bills(bill_id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    rate DECIMAL(10, 2) NOT NULL CHECK (rate >= 0),
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0)
);

CREATE TYPE Status AS ENUM('order', 'purchased');

CREATE TABLE Bills (
    bill_id SERIAL PRIMARY KEY,
    billbook_id INT REFERENCES Billbooks(billbook_id) ON DELETE CASCADE,
    customer_id INT REFERENCES Customers(customer_id) ON DELETE SET NULL,
    bill_number VARCHAR(50) NOT NULL,
    original_amount DECIMAL(10,2) NOT NULL,
    due_amount DECIMAL(10,2) DEFAULT 0,
    status Status DEFAULT 'purchased',
    discount DECIMAL(10,2) DEFAULT 0,
    pending BOOLEAN DEFAULT FALSE,
    created_at VARCHAR(20) DEFAULT NOW()
);


CREATE TABLE Transactions (
   transaction_id SERIAL PRIMARY KEY,
   bill_id INT REFERENCES Bills(bill_id) ON DELETE CASCADE,
   user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
   billbook_id INT REFERENCES Billbooks(billbook_id) ON DELETE CASCADE,
   payment_date VARCHAR(50),
   amount_paid DECIMAL(10, 2) NOT NULL,
   notes TEXT
);

