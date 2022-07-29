create database ShareMe;
use ShareMe;
create table users(id integer auto_increment primary key, name varchar(255) not null, email varchar(255) unique key not null, password varchar(255) not null, verified varchar(10));