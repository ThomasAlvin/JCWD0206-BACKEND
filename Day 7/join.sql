use sakila;

select * from customer c 
left join address a on a.address_id = c.address_id
union all
select * from customer c 
right join address a on a.address_id = c.address_id;



-- customer id,firstname,lastname  
-- 1, udin,ucok
-- address id,address, 
-- 1, batam
-- transaction id, notrans,total, customerid ,tgl 
-- 1, trx-00001 , 20000 , 1
-- transaction_detail id,productId,price, qty, transactionId 
-- 1, sanford, 2, 1 
-- 2, sabun nuvo, 3500, 2 , 1 
-- 3, roti o, 8000, 1 ,1

-- product id,name,merk, price
-- 1, oreo blackpink, oreo,  8500
-- 2, air mineral, sanford, 3000 

-- stock id,stock,status, productId
-- 1, 10, 'available', 1
-- 2, 10, 'available' , 2
-- 3, 2, 'reserved' , 2 



select t.notrans, td.product , td.price , td.price * td.qty total 
 from transaction t
join transaction_detail td on td.transactionid = t.id 




one to one
from customer c
join address a on a.id = c.id

