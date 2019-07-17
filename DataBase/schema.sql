DROP DATABASE IF EXISTS itemsData;
CREATE DATABASE itemsData;
USE itemsData;

CREATE TABLE itemDescription(
	id INT,
    name TEXT,
    description TEXT,
    price INT,
    brand TEXT,
    PRIMARY KEY (id)
);
CREATE TABLE itemImages(
	id SERIAL,
    img_id INT,
    img_src TEXT,
    FOREIGN KEY (img_id) REFERENCES itemDescription (id)
);