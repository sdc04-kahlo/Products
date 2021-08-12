copy products
from '/home/mc_heindel/HackReactor/Products/csv-extracts/product.csv'
delimiter ','
csv header;

copy features
from '/home/mc_heindel/HackReactor/Products/csv-extracts/features.csv'
delimiter ','
csv header;

copy styles
from '/home/mc_heindel/HackReactor/Products/csv-extracts/styles.csv'
delimiter ','
csv header;

copy photos
from '/home/mc_heindel/HackReactor/Products/csv-extracts/photos.csv'
delimiter ','
csv header;

copy skus
from '/home/mc_heindel/HackReactor/Products/csv-extracts/skus.csv'
delimiter ','
csv header;

copy related
from '/home/mc_heindel/HackReactor/Products/csv-extracts/related.csv'
delimiter ','
csv header;
