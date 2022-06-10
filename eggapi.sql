/*
 Navicat Premium Data Transfer

 Source Server         : localMysql
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : eggapi

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 10/06/2022 18:33:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
  `desc` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `head_img` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `classify_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `classify_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `comment_num` int(5) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('743a636b-34fd-427b-9a37-5b27985b246e', 'Test React', '<p>12345</p>', 'Test React', '', '2022-06-09 09:10:29', '2022-06-09 09:10:29', 'eecb7a28-14ac-4cb4-980b-fc0bb6924d21', '技术', NULL);
INSERT INTO `article` VALUES ('49fe5b80-bfff-481a-b119-a763107fa8df', 'Vue Test', '<p>Vue&nbsp;Test</p><p><img src=\"http://localhost:7001/public/uploads/1654857121505.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p>', 'Vue Test', 'http://localhost:7001/public/uploads/1654857100160.jpg', '2022-06-10 10:32:05', '2022-06-10 10:32:05', '1c020e1b-c782-4abf-b616-4da55590741e,eecb7a28-14ac-4cb4-980b-fc0bb6924d21', 'Vue,技术', NULL);

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classify
-- ----------------------------
INSERT INTO `classify` VALUES ('eecb7a28-14ac-4cb4-980b-fc0bb6924d21', '技术', '2022-06-07 06:44:39', '2022-06-09 07:44:50');
INSERT INTO `classify` VALUES ('9021bbff-8be4-4d54-aa6e-0829feaff9a1', '生活', '2022-06-08 03:12:23', '2022-06-09 07:45:08');
INSERT INTO `classify` VALUES ('1c020e1b-c782-4abf-b616-4da55590741e', 'Vue', '2022-06-10 10:31:00', '2022-06-10 10:31:00');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `article_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `article_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `upper_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `status` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('87ebfb9d-015b-43f4-a316-c0dbc68cd6d3', 'testqq', 'qq', '', '2022-06-10 10:28:39', '2022-06-10 10:28:39', 'Test React', '743a636b-34fd-427b-9a37-5b27985b246e', '', 0);
INSERT INTO `comment` VALUES ('6cbb46a7-ff7a-4ec4-a1ce-2f0faab6e4d4', 'Test123', 'Test123', '', '2022-06-10 10:25:54', '2022-06-10 10:25:54', 'Test React', '743a636b-34fd-427b-9a37-5b27985b246e', '', 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `age` int(11) NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('bad1cb36-3ae2-47bf-b24d-aff14c2245fd', 'gu1st', 22, '2022-06-10 06:41:56', '2022-06-10 06:41:56', '5b69a42a0fe4dbe1f6f1e41103930914');

SET FOREIGN_KEY_CHECKS = 1;
