use db_purwadhika;

create table branches (
id int primary key auto_increment,
branch varchar(255),
address varchar(255)
);

create table lecturers (
id int primary key auto_increment, 
name varchar(255),
address varchar(255)
);

create table programs (
id int primary key auto_increment, 
program varchar(255), 
lecturerId int, 
branchId int,
CONSTRAINT FK_branches foreign key (branchId) references branches(id),
CONSTRAINT FK_lecturers foreign key (lecturerId) references lecturers(id)
);


insert into students (firstName,lastName,age,email,gender) values 
('Fahmi', 'Wellman', 26, 'fahmi@mail.com', 'Male'),
('Christoper', 'Wellman', 23 , 'chris@mail.com', 'Male'),
('Mikhael', 'Mubaraak', 26, 'mikhael@mail.com', 'Male'),
('Thomas', 'Bong', 19, 'thomas@mail.com', 'Male'),
('Indri', 'Elmac', 23, 'indri@mail.com', 'Female');

select * from students;

delete from students;
alter table students auto_increment = 1;

insert into branches (branch,address) values 
('BATAM', 'nongsa digital park'),
('BSD', 'GOP 9'), 
('JAKARTA', 'MSIG TOWER');
set sql_safe_updates = 0;

insert into lecturers (name,address) values
('Jordan', 'Batam'),
('Malik', 'Batam'),
('Ragil', 'Batam'),
('Defryan', 'BSD');

select * from lecturers;
insert into lecturers (name,address) values
('Joseph','Batam');

insert into programs (program,lecturerId,branchId) values
('JCWD', 1, 1), 
('JCDM',2,1), 
('JCDS',3,1), 
('JCWD', 4, 2),
('JCUIUX',5,1);



select * from programs;

create table nilai(
id int primary key auto_increment, 
nilai int, 
module varchar(255),
studentId int, 
programId int,
CONSTRAINT FK_Students foreign key (studentId) references Students(id),
CONSTRAINT FK_Programs foreign key (programId) references Programs(id)
);
select * from students;
select * from programs;
insert into nilai(nilai,module,studentId,programId) values
(100, 'Fundamental', 1,4),
(90, 'Fundamental', 2,1),
(95, 'Fundamental', 3,1),
(98, 'Fundamental', 4,1),
(99, 'Fundamental', 5,4),
(70, 'Frontend', 1,4),
(80, 'Frontend', 2,1),
(88, 'Frontend', 3,1),
(85, 'Frontend', 4,1),
(90, 'Frontend', 5,4);
delete from nilai;
select * from programs;

select * from nilai;

-- ada berapa student yang mengikuti program di batam? 
select count(distinct s.id) from nilai n
join programs p on p.id = n.programId 
join students s on s.id = n.studentId
join branches b on b.id = p.branchId
where b.branch ='Batam' ;

-- berapa avg nilai student di BSD? 
select avg( n.nilai) from nilai n
join programs p on p.id = n.programId 
join branches b on b.id = p.branchId
where b.branch ='BSD' ;


-- tampilkan student yg memiliki nilai tertinggi di batam dan bsd 
(
select s.firstName, s.lastName, n.nilai, n.module, b.branch from nilai n
join programs p on p.id = n.programId 
join students s on s.id = n.studentId
join branches b on b.id = p.branchId
where b.branch ='Batam'
order by nilai desc limit 1 )
union
(
select s.firstName, s.lastName, n.nilai, n.module, b.branch from nilai n
join programs p on p.id = n.programId 
join students s on s.id = n.studentId
join branches b on b.id = p.branchId
where b.branch ='BSD'
order by nilai desc limit 1 );

-- data 
-- transaction (
-- instruksi sql query 
-- commit = transaction selesai 
-- rollback = mengembalikan data pada keadaan sebelum commit di dalam transaction)

SET autocommit=1;

insert into students (firstName,lastName,age,email,gender) values 
('Fahmi2', 'Wellman', 26, 'fahmi@mail.com', 'Male');
commit;
select * from students;

Rollback;

-- transaksi id,trans_number,total_harga,tgl
-- 1, trs_00001 , 20000, hari ini

-- transaksi_detail id,produk,harga,qty,transaksiId
-- 1, sanford , 2500, 4 , 1
-- 2, oreo , 10000, 1 , 1 

-- transaksi > transaksi_detail 
-- 1. transaksi harus ada 
-- 2. setelah transaksi terbuat, ambil idnya 
-- 3. kirim id dari transaksi yg kita dapat menuju ke transaksi id di dalam Transaksi_detail


start transaction; -- merubah setautocommit = 0. selama belum ada commit/rollback.

insert into students (firstName,lastName,age,email,gender) values 
('Fahmi3', 'Wellman', 26, 'fahmi@mail.com', 'Male');

select * from students;

rollback;









