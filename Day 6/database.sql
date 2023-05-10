-- day 6

-- database 
-- database yang baik : 
					-- tidak redundant,
					-- memiliki access key untuk mengkases informasi antar table,
                    -- informasi sesuai 
                    -- informasi mudah diakses karena miliki design database yang terstruktur 
                    
-- relational database : 
					-- one to one . hubungan antar table dihubungkan dari masing2 primary key
                    -- one to many. hubungan antara table dihubungkan dengan primary key dan foreign key . 
-- country 
-- id , nama 
1 , indonesia 
2, amerika

-- customer 
-- id , nama, countryId
1, chris, 1
2, fahmi, 1 
3, mikhael, 2
                    -- many to many. hubungan antara table dihubungkan dengan primary key dan foreign key .
-- students 
-- id, nama 
1, chris 
2, baraak 
3, ridho

-- programs
-- id , nama_program
1, masak bareng master chef
2, belajar javascript 
3, belajar ui/ux
4, belajar data science 

-- students_programs
-- student_id, program_id
1,1 
1, 2 
2, 1 
1,1 => error 
composite key merupakan gabungan antara student_id dan program_id

-- db_purwadhika 
-- create 3 tables. students , programs , branch 
-- id, name, program, branch
1. udin, JCWD, batam 
2. rey, JCWD, batam 
3. fahmi, JCWD,batam 


-- relational database 
-- primary key, foreign key, composite key

-- join, left join , right join 
join = mencari persamaan antara dua table 
left join = mencari persamaan antara dua table, 
			data yg tidak memiliki persamaan akan tetap muncul selama data tersebut milik si parent. 
right join =  mencari persamaan antara dua table, 
			data yg tidak memiliki persamaan akan tetap muncul selama data tersebut milik si children. 
            
-- contoh            
  
select c.customer_id, c.first_name, ad.address, ad.address_id from customer c
right join address ad on ad.address_id = c.address_id; -- parent = customer , child = address
-- semua data address akan muncul sebagai child

select c.customer_id, c.first_name, ad.address, ad.address_id from address ad 
left join customer c on c.address_id = ad.address_id; -- parent = address, child = customer
-- semua data address akan muncul sebagai parent

select c.customer_id, c.first_name, ad.address, ad.address_id from address ad 
join customer c on c.address_id = ad.address_id; 
-- data yang muncul hanyalah data yg memiliki persamaan  
   
   use sakila;
-- subquery 
		-- di dalam kolom 
			-- 	select  (select first_name from customer where customer_id = payment.customer_id) test , payment.* from payment;
--                 munculkan nama staff, nama customer, tgl payment. -- select * from payment
        -- di dalam from 
        
        -- di dalam where
        -- didalam having 
        -- dalam join
        
        

-- union 
select district, 'ini adalah district A' grup from address where district like 'a%'
union
select district, 'ini adalah district B' grup from address where district like 'b%';
-- transaction 
SET autocommit = 0;
use db_purwadhika;

create table branches (
id int primary key  auto_increment, 
branch varchar(255), 
address varchar(255) );

create table programs (
id int auto_increment primary key, 
program varchar(255), 
branchId int,
CONSTRAINT FK_branches foreign key (branchId) references branches(id)
);

CREATE INDEX idx_lastname
ON students (lastName)



-- index 

select * from customer where last_name = "jones";
=> mencari last_name = jones dari seluruh kolom di dalam customer 
indexing => kolom => first_name
