-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 05 fév. 2021 à 14:59
-- Version du serveur :  5.7.24
-- Version de PHP :  5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `oc_p7_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `commentContent` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`commentId`, `userId`, `postId`, `commentContent`, `createdAt`, `updatedAt`) VALUES
(39, 18, 58, 'trop stylé !', '2021-01-29 14:54:20', '2021-01-29 14:54:20'),
(40, 18, 59, 'lol', '2021-01-29 14:55:56', '2021-01-29 14:55:56'),
(41, 19, 60, 'que pensez vous de la vue ?', '2021-01-29 14:57:39', '2021-01-29 14:57:39'),
(42, 21, 61, 'cours forest ! ! ! ! ! ! ! ', '2021-01-29 15:08:56', '2021-02-05 09:58:18'),
(43, 21, 62, 'salut :!!', '2021-01-29 15:09:04', '2021-01-29 15:09:04'),
(44, 21, 60, 'magnifique', '2021-01-29 15:09:13', '2021-01-29 15:09:13'),
(45, 21, 59, 'trop marrant..', '2021-01-29 15:09:24', '2021-01-29 15:09:24'),
(46, 21, 58, 'Je ne suis pas dessus :-( dégouté', '2021-01-29 15:09:47', '2021-01-29 15:09:47'),
(47, 21, 64, 'Un petit spa !', '2021-01-29 15:11:35', '2021-01-29 15:11:35'),
(53, 23, 67, 'Classe avec le soleil derrière non ?', '2021-01-29 15:16:07', '2021-01-29 15:16:07'),
(54, 23, 65, 'C\'est clair !!', '2021-01-29 15:16:17', '2021-01-29 15:16:17'),
(55, 23, 64, 'T\'as pas l\'air bien lol', '2021-01-29 15:16:39', '2021-01-29 15:16:39'),
(56, 23, 63, 'pas mal !!', '2021-01-29 15:17:05', '2021-01-29 15:17:05'),
(57, 23, 59, 'hahaha', '2021-01-29 15:17:18', '2021-01-29 15:17:18'),
(58, 23, 66, 'Bonjour à moi même :-D', '2021-01-29 15:18:25', '2021-01-29 15:18:25'),
(59, 24, 58, 'Au premier plan B-)', '2021-01-29 15:21:12', '2021-01-29 15:21:12'),
(60, 18, 61, 'wow !!', '2021-02-01 08:10:15', '2021-02-01 08:10:21'),
(62, 18, 68, ':-(', '2021-02-01 09:26:43', '2021-02-01 09:26:43'),
(63, 18, 69, 'cool! :) :)', '2021-02-01 09:43:28', '2021-02-01 09:44:26'),
(64, 18, 69, 'wow !', '2021-02-01 09:56:37', '2021-02-01 09:56:37'),
(65, 19, 69, 'pas mal :)', '2021-02-01 10:49:11', '2021-02-01 10:49:11'),
(66, 19, 67, 'stylé !', '2021-02-01 10:49:30', '2021-02-01 10:49:30'),
(67, 18, 58, 'commentaire depuis postman', '2021-02-05 10:18:45', '2021-02-05 10:18:45');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `likeId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `postId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`likeId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`likeId`, `userId`, `postId`, `createdAt`, `updatedAt`) VALUES
(36, 18, 58, '2021-01-29 14:54:38', '2021-01-29 14:54:38'),
(37, 18, 59, '2021-01-29 14:55:58', '2021-01-29 14:55:58'),
(39, 19, 59, '2021-01-29 14:57:51', '2021-01-29 14:57:51'),
(40, 19, 58, '2021-01-29 14:57:53', '2021-01-29 14:57:53'),
(41, 19, 60, '2021-01-29 14:57:56', '2021-01-29 14:57:56'),
(44, 20, 59, '2021-01-29 14:59:31', '2021-01-29 14:59:31'),
(45, 20, 58, '2021-01-29 14:59:33', '2021-01-29 14:59:33'),
(46, 20, 61, '2021-01-29 15:07:10', '2021-01-29 15:07:10'),
(47, 20, 60, '2021-01-29 15:07:15', '2021-01-29 15:07:15'),
(48, 21, 63, '2021-01-29 15:08:38', '2021-01-29 15:08:38'),
(49, 21, 62, '2021-01-29 15:08:39', '2021-01-29 15:08:39'),
(50, 21, 61, '2021-01-29 15:08:41', '2021-01-29 15:08:41'),
(51, 21, 60, '2021-01-29 15:08:43', '2021-01-29 15:08:43'),
(72, 23, 67, '2021-01-29 15:16:08', '2021-01-29 15:16:08'),
(74, 23, 65, '2021-01-29 15:16:21', '2021-01-29 15:16:21'),
(75, 23, 64, '2021-01-29 15:16:24', '2021-01-29 15:16:24'),
(76, 23, 63, '2021-01-29 15:17:06', '2021-01-29 15:17:06'),
(77, 23, 60, '2021-01-29 15:17:08', '2021-01-29 15:17:08'),
(81, 18, 67, '2021-02-01 09:26:02', '2021-02-01 09:26:02'),
(82, 18, 65, '2021-02-01 09:26:04', '2021-02-01 09:26:04'),
(83, 18, 62, '2021-02-01 09:26:06', '2021-02-01 09:26:06'),
(84, 18, 61, '2021-02-01 09:26:08', '2021-02-01 09:26:08'),
(85, 18, 68, '2021-02-01 09:42:43', '2021-02-01 09:42:43'),
(86, 24, 69, '2021-02-01 10:28:04', '2021-02-01 10:28:04'),
(87, 24, 58, '2021-02-01 10:28:06', '2021-02-01 10:28:06'),
(88, 19, 70, '2021-02-01 10:51:40', '2021-02-01 10:51:40'),
(89, 19, 69, '2021-02-01 11:58:03', '2021-02-01 11:58:03'),
(90, 19, 68, '2021-02-01 11:58:07', '2021-02-01 11:58:07'),
(93, 19, 66, '2021-02-01 11:59:33', '2021-02-01 11:59:33'),
(95, 18, 70, '2021-02-05 09:55:24', '2021-02-05 09:55:24');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `postTitle` varchar(255) NOT NULL,
  `postContent` varchar(255) NOT NULL,
  `postImageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`postId`, `userId`, `postTitle`, `postContent`, `postImageUrl`, `createdAt`, `updatedAt`) VALUES
(58, 18, 'Photo de famille', 'Souriez ! ! ', '1_1611932038807.jpg', '2021-01-29 14:53:58', '2021-02-05 10:15:54'),
(59, 18, 'Un message sans image', 'C\'était pour rien dire', NULL, '2021-01-29 14:55:52', '2021-01-29 14:55:52'),
(60, 19, 'Bonjour tout le monde', 'Salut salut ! La vue est magnifique d\'ici', '8_1611932241409.jpg', '2021-01-29 14:57:21', '2021-01-29 14:57:21'),
(61, 20, 'Wonderwomaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan !', 'Wonderwomaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan !', '6_1611932355055.jpg', '2021-01-29 14:59:15', '2021-01-29 14:59:15'),
(62, 20, 'Salut tout le monde :)', 'Hello !', NULL, '2021-01-29 15:01:15', '2021-01-29 15:01:15'),
(63, 21, 'Ma photo sur insta :)', 'stylé ou pas ?', '4_1611932914501.jpg', '2021-01-29 15:08:34', '2021-01-29 15:08:34'),
(64, 21, 'Même pas mal', 'OKLM', '13_1611933067098.jpg', '2021-01-29 15:11:07', '2021-01-29 15:11:07'),
(65, 22, 'Boulot boulot', 'trop de taf en ce moment', '', '2021-01-29 15:12:31', '2021-01-29 15:12:31'),
(66, 23, 'Bonjour tout le monde', 'Bonjour tout le monde', NULL, '2021-01-29 15:15:16', '2021-01-29 15:15:16'),
(67, 23, 'Mon nouveau logo', 'pas mal non ?', '14_1611933346821.jpg', '2021-01-29 15:15:46', '2021-01-29 15:15:46'),
(68, 23, 'bad mood', 'bad mood', '15_1611933471639.jpg', '2021-01-29 15:17:51', '2021-01-29 15:17:51'),
(69, 24, 'Belle photo', 'Ya du monde !!', '1_1611933647584.jpg', '2021-01-29 15:20:47', '2021-02-01 09:22:33'),
(70, 19, 'Salut captain :)', 'photo ->>>', '9_1612176669357.jpg', '2021-02-01 10:51:09', '2021-02-01 10:51:27');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210107214847-create-user.js'),
('20210107214903-create-post.js'),
('20210107214921-create-comment.js'),
('20210107214940-create-like.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT '',
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `imageUrl` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `firstname`, `lastname`, `email`, `bio`, `password`, `isAdmin`, `imageUrl`, `username`, `createdAt`, `updatedAt`) VALUES
(18, 'Bruce', 'Banner', 'aHVsa0BodWxrLmZy', 'Le docteur Robert Bruce Banner (souvent nommé Bruce Banner, son deuxième prénom), alias Hulk, est un super-héros évoluant dans l\'univers Marvel de la maison d\'édition Marvel Comics.', '$2b$10$MMf.JKHvm2t9hW6l4n9kvuF4pwGvG8SzsHkFMGEsBzearyYpyaFaW', 1, 'hulk_1612173155151.jpg', 'Hulk', '2021-01-29 14:51:56', '2021-02-01 09:52:35'),
(19, 'Peter', 'Parker', 'c3BpZGVybWFuQHNwaWRlcm1hbi5mcg==', '', '$2b$10$y2bgT7GhJejwWMhoqvM4iO6QnoDOLQS7kpCQor64oOhOgvREqjKCa', 0, 'spiderman_1612172513996.jpg', 'Spiderman', '2021-01-29 14:56:37', '2021-02-01 09:41:54'),
(20, 'Diana', 'Prince', 'd29uZGVyd29tYW5Ad29uZGVyd29tYW4uZnI=', '', '$2b$10$Rz3hNVnq3w1OoL7rLdTPreXeEypaGNyX8vRMcmge/oNkF43sjJe7m', 0, 'wonderwoman_1612173191997.jpg', 'Wonderwoman', '2021-01-29 14:58:39', '2021-02-01 09:53:12'),
(21, 'James', 'Logan', 'd29sdmVyaW5lQHdvbHZlcmluZS5mcg==', '', '$2b$10$mXvVd63iEoLCN56wP8wHZOxJW/KBRRln44LPD14.qY2R4kA/cLGHm', 0, 'wolverine_1612172504555.jpg', 'Wolverine', '2021-01-29 15:08:01', '2021-02-01 09:41:44'),
(22, 'Bruce', 'Wayne', 'YmF0bWFuQGJhdG1hbi5mcg==', '', '$2b$10$Iu6g2DTVcegEniI22RUoPuNpNhIxpds2Mvw56fcQfHBZ/Y4kKDa1m', 0, 'batman_1612527408477.jpg', 'Batman', '2021-01-29 15:12:11', '2021-02-05 12:16:48'),
(23, 'Kara', 'Zor-El', 'c3VwZXJnaXJsQHN1cGVyZ2lybC5mcg==', '', '$2b$10$v5pQfXhk6586EgDEq7s32e1FvDzJ4rxxTzxfa7oJtdBxHdJ08cuyi', 0, 'supergirl_1612172533634.jpg', 'Supergirl', '2021-01-29 15:14:53', '2021-02-01 09:42:13'),
(24, 'Tony', 'Stark', 'aXJvbm1hbkBpcm9ubWFuLmZy', '', '$2b$10$bn6UpVqH623WJZ9ukpVnn.4P4g/5uG2TjlLFbOzspk7xLEnDYcVFq', 0, 'ironman_1612527270536.jpg', 'Ironman', '2021-01-29 15:19:10', '2021-02-05 12:14:30'),
(26, 'Postman', 'Postman', 'cG9zdG1hbkBwb3N0bWFuLmZy', '', '$2b$10$AJqW3IQzcQQZSBCYQY6zgertPixJrdcY7jVC2TxHh.slohvyr7uk2', 0, 'postman_1612527239956.jpg', 'Postman', '2021-02-05 11:01:55', '2021-02-05 12:13:59');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`);

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
