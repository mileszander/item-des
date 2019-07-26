DROP DATABASE IF EXISTS casaDB;
CREATE DATABASE casaDB

USE itemsData;

CREATE TABLE items(
	id SERIAL primary key,
    itemName VARCHAR(50),
    catagory VARCHAR(50),
    price INT
);

-- CREATE TABLE itemImages(
-- 	id SERIAL,
--     img_id INT,
--     img_src TEXT,
--     FOREIGN KEY (img_id) REFERENCES itemDescription (id)
-- );