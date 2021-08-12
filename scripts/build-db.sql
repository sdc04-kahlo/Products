DROP DATABASE atelierproducts;
CREATE DATABASE atelierproducts;

\c atelierproducts;

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT
);
ALTER SEQUENCE products_product_id_seq RESTART WITH 17067;

CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN
);

CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  url TEXT NOT NULL,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  size TEXT NOT NULL,
  quantity TEXT NOT NULL
);

CREATE TABLE related (
  realted_id SERIAL PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);
