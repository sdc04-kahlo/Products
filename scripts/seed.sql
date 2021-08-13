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
COPY products (product_id, name, slogan, description, category, default_price)
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/product.csv'
delimiter ','
csv header;


CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);
COPY features
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/features.csv'
delimiter ','
csv header;


CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT,
  default_style BOOLEAN
);
COPY styles
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/styles.csv'
delimiter ','
csv header;


CREATE TABLE photos (
  photo_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  url TEXT NOT NULL,
  thumbnail_url TEXT
);
COPY photos
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/photos.csv'
delimiter ','
csv header;


CREATE TABLE skus (
  sku_id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles,
  size TEXT NOT NULL,
  quantity TEXT NOT NULL
);
COPY skus
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/skus.csv'
delimiter ','
csv header;


CREATE TABLE related (
  realted_id SERIAL PRIMARY KEY,
  current_product_id INT,
  related_product_id INT
);
COPY related
FROM '/home/mc_heindel/HackReactor/Products/csv-extracts/small/related.csv'
delimiter ','
csv header;
