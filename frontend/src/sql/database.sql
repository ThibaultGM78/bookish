DROP DATABASE IF EXISTS bookish;
CREATE DATABASE bookish;
USE bookish;

CREATE TABLE bookish_product (
    id_product INT AUTO_INCREMENT,
    product_name VARCHAR(30),
    product_price DECIMAL(6, 2),
    product_category VARCHAR(15),
    product_stock INT,
    product_desc TEXT,
    product_img VARCHAR(100),
    PRIMARY KEY(id_product)
);

INSERT INTO bookish_product (product_name, product_price, product_category, product_stock, product_desc, product_img) VALUES
    ('Livre A', 19.99, 'fantastic', 50, 'Description du Livre A', 'src/img/book.jpg'),
    ('Livre B', 29.99, 'fantastic', 30, 'Description du Livre B', 'src/img/book.jpg'),
    ('Livre C', 39.99, 'fantastic', 20, 'Description du Livre C', 'src/img/book.jpg'),
    ('Livre D', 49.99, 'fantastic', 25, 'Description du Livre D', 'src/img/book.jpg'),
    ('Livre E', 59.99, 'romance', 40, 'Description du Livre E', 'src/img/book.jpg'),
    ('Livre F', 69.99, 'romance', 15, 'Description du Livre F', 'src/img/book.jpg'),
    ('Livre G', 79.99, 'romance', 35, 'Description du Livre G', 'src/img/book.jpg'),
    ('Livre H', 89.99, 'romance', 10, 'Description du Livre H', 'src/img/book.jpg'),
    ('Livre I', 99.99, 'adventure', 45, 'Description du Livre I', 'src/img/book.jpg'),
    ('Livre J', 109.99, 'adventure', 22, 'Description du Livre J', 'src/img/book.jpg'),
    ('Livre K', 119.99, 'adventure', 18, 'Description du Livre K', 'src/img/book.jpg'),
    ('Livre L', 129.99, 'adventure', 27, 'Description du Livre L', 'src/img/book.jpg'),
    ('Livre M', 139.99, 'historical', 33, 'Description du Livre M', 'src/img/book.jpg'),
    ('Livre N', 149.99, 'historical', 12, 'Description du Livre N', 'src/img/book.jpg'),
    ('Livre O', 159.99, 'historical', 8, 'Description du Livre O', 'src/img/book.jpg');


    
