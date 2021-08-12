--
select p.product_id, p.name, f.feature, f.value from products p inner join features f
on f.product_id = p.product_id
where p.product_id=1;

--
select product_id, name from products;
