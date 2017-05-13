CREATE DATABASE studybuddy;

USE studybuddy;

SELECT * FROM buddies;

 SELECT `id`, `firstName`, `lastName`, `email`, `password`, `photoURL`, `state`, `city`, `zipcode`, `age`, `phoneNumber`, `gender`, `school`, `aos`, `study_subject`, `uid`, `createdAt`, `updatedAt` FROM `Buddies` AS `Buddy` WHERE `Buddy`.`id` = '2';
