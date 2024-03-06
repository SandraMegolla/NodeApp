create DATABASE if not EXISTS userlogin;

use userlogin;

create table user(
    id int AUTO_INCREMENT PRIMARY KEY,
    nameuser VARCHAR(255) NOT  NULL,
    password VARCHAR(255) NOT NULL
);

insert USER (nameuser,password) values ('sssss','1414')

select * from user