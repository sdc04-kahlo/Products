--
select products.name, features.feature from products inner join features
on features.product_id=17067
and products.product_id=17067;
