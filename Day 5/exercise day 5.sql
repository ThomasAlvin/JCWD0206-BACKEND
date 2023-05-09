-- 1 Create db name as purwadhika_student, purwadhika_schedule, purwadhika_branch

create database purwadhika_student;
create database purwadhika_schedule;
create database purwadhika_branch;

-- 2 Show list of database with name contain purwadhika.


show databases LIKE "%purwadhika%";

-- 3 Delete database purwadhika_schedule

drop database purwadhika_schedule;

use purwadhika_student;

-- 4 
create table students(
id int primary key auto_increment ,
last_name varchar(255),
first_name varchar(255),
address varchar(255),
city varchar(255));


-- 5
alter table students add email varchar(255);

-- 6
alter table students add gender ENUM('MALE','FEMALE'),add phone_number varchar(255),add alternative_phone_number varchar(255);

-- 7 
alter table students change alternative_phone_number description varchar(255);

-- 8 
alter table students drop gender;

 -- edit column increment id primary key
alter table students change id id int auto_increment , add primary key(id);
 -- select students
select * from students;

use sakila;
select * from customer;

use purwadhika_branch;
-- 9 
create table branches (
id int auto_increment primary key,
branch_name varchar(255),
pic varchar(255),
address varchar(255),
city varchar(255),
province varchar(255));

insert into branches (branch_name,pic,address,city,province) values
('BSD','THOMAS','GREEN OFFICE PARK 9', 'BSD','TANGERANG'),
('JKT','BUDI','MSIG TOWER', 'JAKARTA SELATAN','JAKARTA'),
('BTM','ANGEL','NONGSA', 'BATAM','KEP. RIAU');

use purwadhika_branch;
SELECT * from branches;

SET sql_safe_updates=0;

update branches set pic = 'DONO' where city = 'BSD';
insert into branches (branch_name,pic,address,city,province) values
('BLI','TONO','Gianyar', 'Gianyar','Bali');

-- sakila 

use sakila;
select first_name, last_name from actor;

select * from actor where first_name like 'Joe%';
-- cara pertama
select address,district,city_id from address 
where district = 'California' or district = 'Alberta' or district = 'Mekka';

-- cara kedua
select address,district,city_id from address 
where district in ('California' ,'Alberta' ,'Mekka');

select count(last_name) from actor where last_name like '%WOOD%';

use sakila;
select customer_id, sum(amount) from payment group by customer_id having sum(amount) > 20;


select first_name, last_name, sum(amount) from payment p 
join customer c on c.customer_id = p.customer_id
group by first_name,last_name having sum(amount) > 20;


select concat(first_name, " ",last_name) as fullname, sum(amount) from payment p 
join customer c on c.customer_id = p.customer_id
group by fullname having sum(amount) > 20;


select customer_id, sum(amount) from payment where  sum(amount) > 20 group by customer_id; 
-- ga bisa


select customer_id, sum(amount),payment_id from payment 
group by amount, customer_id, payment_id order by sum(amount) desc limit 3;

select *
from (
select customer_id, sum(amount) totalAmount, count(customer_id) PaymentFreq 
from payment group by customer_id order by count(customer_id) desc, sum(amount) limit 3) this
 order by this.totalAmount desc;


select * from actor;
insert into actor (first_name,last_name,last_update) values ('JHONNY','DAVIS',CURDATE());

insert into actor (first_name,last_name,last_update) values ('ADAM','DAVIS',CURDATE()),
('JEREMY','DAVIS',CURDATE()), ('CRAIG','DAVIS',CURDATE()),  ('STEVE','DAVIS',CURDATE())
;

select count(last_name),last_name from actor  where last_name = 'DAVIS';

select * from actor limit 1;
select * from film_actor where actor_id = 1;
delete from actor where actor_id = 1;
delete from film_actor where actor_id = 1;

delete from film_actor where actor_id = 4;
delete from actor where last_name = 'DAVIS' and first_name = 'JENNIFER';


UPDATE actor set first_name = 'GEORGE' where last_name = 'Davis';
select count(actor_id), actor_id from film_actor group by actor_id order by count(actor_id) desc limit 10;
select count(actor_id), actor_id from film_actor group by actor_id order by count(actor_id) desc limit 10;

-- subquery 

select * from actor;
-- sumber data => memiliki return lebih dari 1 record/row
-- kolom => memiliki satu return record/row  saja dan return 1 kolom saja 

-- select * from something = table, query.

select * from (select count(actor_id), concat(first_name, " ", last_name)  from actor) this;

select total,full_name from
(
select count(actor_id) total, concat(first_name, " ", last_name) full_name  from actor group by first_name,last_name
) this;

select count(actor_id), last_name from actor group by last_name;

select count(actor_id) from actor where last_name = "AKROYD";

select distinct (select count(actor_id) from actor where last_name = a.last_name) 
as total, last_name from actor as a;


select count(amount) freq_payment, 
sum(amount) total_payment, customer_id from payment group by customer_id order by count(amount) desc limit 3;

select * from
(
select count(amount) freq_payment, 
sum(amount) total_payment, customer_id from payment group by customer_id order by count(amount) desc limit 3
) this order by this.total_payment desc;


-- Display title, description, length, and rating from film,
-- where special features include deleted scenes and behind the scenes order by most length

select * from film;
select title,description,length,rating from film where special_features like '%Deleted Scenes,Behind the Scenes%'
order by length desc;

-- Display country and total of inactive customer (active = 0)
-- from country where customer active = 0 order by the highest inactive (active = 0) customer


select * from customer; -- active = 0 , addressid
select * from address; -- cityid
select * from city; -- country id
select * from country; -- country

use sakila;
-- count(active)
select c.first_name,c.last_name, a.address, ct.city , cy.country from customer c 
join address a on a.address_id = c.address_id
join city ct on ct.city_id = a.city_id
join country cy on cy.country_id = ct.country_id
where c.active = 0;

select count(c.active) inactive_customer, cy.country from customer c 
join address a on a.address_id = c.address_id
join city ct on ct.city_id = a.city_id 
join country cy on cy.country_id = ct.country_id
where c.active = 0
group by cy.country order by count(c.active) desc;

select * from address;
select * from customer;

select * from address a
join customer c on c.address_id = a.address_id;

-- students id,firstname,lastname,age,email,gender, programId, locationId
-- 1, ucok, baba , 17, u@mail.com,male, 1, 2
-- 2, udin, baba , 17, u@mail.com,male, 1, 1
-- 100 data memiliki program dan location yang sama
-- programs id,program,location
-- 1 , 'JCWD', location ENUM(BSD,JKT,BATAM,BANDUNG), pic
-- 

-- world

use world;

select name,population from country order by population desc limit 1;

select name,population from country order by population desc limit 1 offset 1;
select name,population from country order by population desc limit 1,1;


select name,population from country order by population,name limit 2,1 ;
select name,population from country order by population limit 1 offset 1;


select name,population from country where population = (select min(population) from country) limit 1 offset 2;

select sum(surfaceArea), continent from country where lifeExpectancy > 75 group by continent order by sum(surfacearea) desc limit 1;


use world;

select sum(surfaceArea) surface, continent from country 
where lifeExpectancy > 75 group by continent order by sum(surfaceArea) desc;


select sum(surfaceArea) surface, continent,lifeExpectancy 
from country group by continent,lifeExpectancy 
having lifeExpectancy > 75 order by sum(surfaceArea) desc;

select sum(surface), continent from (

select sum(surfaceArea) surface, continent,lifeExpectancy 
from country group by continent,lifeExpectancy 
having lifeExpectancy > 75 order by sum(surfaceArea) desc
) this group by this.continent;



