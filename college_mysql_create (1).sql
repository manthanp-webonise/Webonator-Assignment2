CREATE TABLE `students` (
	`id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255),
	`roll_no` int,
	PRIMARY KEY (`id`)
);

CREATE TABLE `departments` (
	`id` int NOT NULL AUTO_INCREMENT,
	`dept_name` varchar(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `student_info` (
	`id` int NOT NULL AUTO_INCREMENT,
	`student_id` int NOT NULL,
	`dept_id` int NOT NULL,
	PRIMARY KEY (`id`),
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`),
	FOREIGN KEY (`dept_id`) REFERENCES `departments`(`id`),	
);








