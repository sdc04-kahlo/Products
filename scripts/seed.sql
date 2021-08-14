-- create database
DROP DATABASE atelierproducts;
CREATE DATABASE atelierproducts;

-- connect to database
\c atelierproducts;

-- create role
DROP ROLE api;
-- TODO: replace with a secure password
CREATE ROLE api LOGIN PASSWORD 'apipassword';

-- create table
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT
);

-- load from CSV extract
COPY products (product_id, name, slogan, description, category, default_price)
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/product.csv'
  DELIMITER ',' CSV HEADER;

-- index the table
CREATE INDEX ON products (product_id);

-- grant api permission to access table
GRANT ALL ON products TO api;


CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

COPY features
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/features.csv'
  DELIMITER ',' CSV HEADER;

CREATE INDEX ON features (product_id);

GRANT ALL ON features TO api;


CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN
);

COPY styles
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/styles.csv'
  DELIMITER ',' CSV HEADER;

CREATE INDEX ON styles (product_id);

GRANT ALL ON styles TO api;


CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  url TEXT NOT NULL,
  thumbnail_url TEXT
);

COPY photos
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/photos.csv'
  DELIMITER ',' CSV HEADER;

CREATE INDEX ON photos (style_id);

GRANT ALL ON photos TO api;


CREATE TABLE skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  size TEXT NOT NULL,
  quantity TEXT NOT NULL
);

COPY skus
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/skus.csv'
  DELIMITER ',' CSV HEADER;

CREATE INDEX ON skus (style_id);

GRANT ALL ON skus TO api;


CREATE TABLE related (
  related_id SERIAL PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);

COPY related
  FROM '/home/mc_heindel/HackReactor/Products/csv-full/related.csv'
  DELIMITER ',' CSV HEADER;

CREATE INDEX ON related (current_product_id);

GRANT ALL ON related TO api;
