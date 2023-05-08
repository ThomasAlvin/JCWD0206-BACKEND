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

select customer_id, sum(amount) from payment group by customer_id having sum(amount) > 20;

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

delete from film_actor where actor_id = 4;
delete from actor where last_name = 'DAVIS' and first_name = 'JENNIFER';


UPDATE actor set first_name = 'GEORGE' where last_name = 'Davis';
select count(actor_id), actor_id from film_actor group by actor_id order by count(actor_id) desc limit 10;




-- world

use world;

select name,population from country order by population desc limit 1;

select name,population from country order by population desc limit 1 offset 1;

select name,population from country order by population  limit 1;

select name,population from country where population = (select min(population) from country) limit 1 offset 2;

select sum(surfaceArea), continent from country where lifeExpectancy > 75 group by continent order by sum(surfacearea) desc limit 1;






