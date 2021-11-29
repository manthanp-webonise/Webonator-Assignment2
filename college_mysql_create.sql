CREATE TABLE `users` (
	`id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `user_roles` (
	`id` int NOT NULL,
	`user_id` int NOT NULL,
	`role_id` int NOT NULL,
	PRIMARY KEY(`id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`),
);

CREATE TABLE `roles` (
	`id` int NOT NULL,
	`role_name` varchar(255) NOT NULL
	PRIMARY KEY(`id`)
);








