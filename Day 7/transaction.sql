START TRANSACTION;
SELECT 
    @id:=MAX(id)+1
FROM
    students;
    
    
    INSERT INTO STUDENTS(firstName,lastName,age,email,gender) values 
    ('udin','ucok',20,'ucok@mail.com','MALE'),
     ('udin2','ucok',20,'ucok@mail.com','MALE'),
      ('udin3','ucok',20,'ucok@mail.com','MALE');
    
COMMIT;

SET autocommit=0;

 INSERT INTO STUDENTS(firstName,lastName,age,email,gender) values 
    ('udinz','ucok',20,'ucok@mail.com','MALE'),
     ('udin22','ucok',20,'ucok@mail.com','MALE'),
      ('udin33','ucok',20,'ucok@mail.com','MALE');

ROLLBACK;

Select * from students;

delete from students;