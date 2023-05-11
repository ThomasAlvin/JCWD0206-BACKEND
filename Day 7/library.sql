CREATE TABLE `members` (
  `id` integer PRIMARY KEY auto_increment,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `address` varchar(255),
  `join_date` datetime,
  `gender` ENUM('MALE','FEMALE'),
  `deposit` integer
);

CREATE TABLE `books` (
  `id` integer PRIMARY KEY auto_increment,
  `title` varchar(255),
  `author` varchar(255),
  `publisher` varchar(255)
);

CREATE TABLE `stocks` (
  `id` integer PRIMARY KEY auto_increment,
  `status` varchar(255),
  `qty` integer,
  `bookId` integer,
  `referenceCode` varchar(255),
  `description` varchar(255)
);

CREATE TABLE `staffs` (
  `id` integer PRIMARY KEY auto_increment,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `address` varchar(255),
  `gender` ENUM('MALE','FEMALE')
);

CREATE TABLE `staff_schedules` (
  `id` integer PRIMARY KEY auto_increment, 
  `schedule_date` datetime,
  `staffId` int,
  `branchId` int
);

CREATE TABLE `branches` (
  `id` integer PRIMARY KEY auto_increment,
  `branch` varchar(255),
  `address` varchar(255)
);

CREATE TABLE `transactions` (
  `id` integer PRIMARY KEY auto_increment,
  `transaction_number` varchar(255),
  `rent_price` integer,
  `total_books` integer,
  `borrow_date` datetime,
  `return_date` datetime,
  `fine` integer,
  `staffId` integer,
  `memberId` integer
);

CREATE TABLE `transaction_details` (
  `bookId` integer,
  `qty` integer,
  `transactionId` integer
);

ALTER TABLE `stocks` ADD FOREIGN KEY (`bookId`) REFERENCES `books`(`id`);

ALTER TABLE `staff_schedules` ADD FOREIGN KEY (`staffId`) REFERENCES `staffs` (`id`);

ALTER TABLE `staff_schedules` ADD FOREIGN KEY (`branchId`) REFERENCES `branches` (`id`);

ALTER TABLE `transaction_details` ADD FOREIGN KEY (`transactionId`) REFERENCES `transactions` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`memberId`) REFERENCES `members` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`staffId`) REFERENCES `staffs` (`id`);

ALTER TABLE `transaction_details` ADD FOREIGN KEY (`bookId`) REFERENCES `books` (`id`);

-- drop database db_library;
-- create database db_library;
-- use db_library;
