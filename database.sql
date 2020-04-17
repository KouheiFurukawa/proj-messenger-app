-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: MessengerApp
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friendship` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `friend_id` varchar(255) DEFAULT NULL,
  `user_icon_url` varchar(200) NOT NULL DEFAULT '',
  `friend_icon_url` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_from` varchar(255) DEFAULT NULL,
  `user_to` varchar(255) DEFAULT NULL,
  `text` varchar(10000) CHARACTER SET utf8mb4 DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'test1','test2','test','2020-04-02 12:51:02'),(2,'test1','test2','あああああ','2020-04-02 12:51:10'),(3,'test1','test2','メッセンジャーアプリ','2020-04-02 12:51:20'),(4,'test2','test1','hello','2020-04-02 18:46:53'),(5,'test2','test3','hogehoge','2020-04-02 23:19:41'),(6,'test2','test1','hi','2020-04-05 12:40:52'),(7,'test1','test2','hhhh','2020-04-05 12:51:08'),(8,'test1','test2','hoge','2020-04-05 12:52:18'),(9,'test1','test2','jjj','2020-04-05 12:53:16'),(10,'test1','test2','あああ','2020-04-05 14:21:27'),(11,'test1','test2','ああああ','2020-04-05 14:36:34'),(12,'test1','test2','aaaaa','2020-04-05 14:45:46'),(13,'test1','test2','test','2020-04-05 14:59:20'),(14,'test1','test2','asdf','2020-04-05 15:02:53'),(15,'test1','test2','asdfg','2020-04-05 15:07:01'),(16,'test1','test2','asdfghj','2020-04-05 15:12:16'),(17,'test1','test2','asdfdsaf','2020-04-05 15:14:48'),(18,'test1','test2','asdf','2020-04-05 15:17:07'),(19,'test1','test2','asdad','2020-04-05 15:19:32'),(20,'test1','test2','fd','2020-04-05 15:20:26'),(21,'test1','test2','asdf','2020-04-05 15:23:01'),(22,'test1','test2','asdf','2020-04-05 15:39:33'),(23,'test1','test2','asdf','2020-04-05 15:40:08'),(24,'test1','test2','qwer','2020-04-05 15:44:00'),(25,'test1','test2','asdasd','2020-04-05 15:44:35'),(26,'test1','test2','asdas','2020-04-05 15:51:31'),(27,'test1','test2','asdf','2020-04-05 15:52:11'),(28,'test2','test1','hoge','2020-04-05 15:54:51'),(29,'test1','test2','asdf','2020-04-05 15:58:01'),(30,'test2','test1','sex','2020-04-05 16:03:57'),(31,'test2','test1','aaaa','2020-04-05 16:58:17'),(32,'test1','test2','asd','2020-04-05 16:58:30'),(33,'test1','test2','ghjk','2020-04-05 17:32:47'),(34,'test1','test2','aaaaa','2020-04-05 17:37:03'),(35,'test2','test1','qwerty','2020-04-05 17:39:37'),(36,'test2','test1','112345','2020-04-05 17:44:16'),(37,'test2','test1','aaaaa','2020-04-05 17:44:57'),(38,'test1','test2','SsA','2020-04-05 17:45:13'),(39,'test1','test2','asdad','2020-04-05 17:49:31'),(40,'test1','test2','aaa','2020-04-05 17:50:34'),(41,'test2','test1','adasd','2020-04-05 17:50:49'),(42,'test1','test2','kkkk','2020-04-05 17:52:31'),(43,'test2','test1','zxcvb','2020-04-05 17:52:52'),(44,'test1','test2','sex','2020-04-05 17:57:24'),(45,'test2','test1','kane','2020-04-05 17:57:36'),(46,'test1','test2','aaaaa','2020-04-05 17:58:20'),(47,'test2','test1','aaaaa','2020-04-05 18:02:18'),(48,'test2','test1','eeeeee','2020-04-05 18:43:09'),(49,'test1','test2','金','2020-04-05 18:43:31'),(50,'test2','test1','暴力','2020-04-05 18:43:45'),(51,'test2','test1','asdf','2020-04-05 18:46:26'),(52,'test2','test1','1234567','2020-04-05 18:48:53'),(53,'test1','test2','jsjsjs','2020-04-05 18:50:45'),(54,'test2','test1','agsdcgjas','2020-04-05 18:51:00'),(55,'test1','test2','qqqqq','2020-04-05 19:14:50'),(56,'test1','test2','sex','2020-04-05 19:18:14'),(57,'test2','test1','893','2020-04-05 19:37:16'),(58,'test1','test2','asdf','2020-04-05 22:15:22'),(59,'test1','test2','zzz','2020-04-05 22:16:49'),(60,'test1','test2','くぇｒ','2020-04-05 22:19:11'),(61,'test1','test2','sdfsdgddfx','2020-04-06 00:31:46'),(62,'test1','test2','qqqq','2020-04-06 21:24:16'),(63,'test1','test2','qwer','2020-04-06 21:50:06'),(64,'test2','2','asdf','2020-04-10 19:59:55'),(65,'test2','test5','jhghfd','2020-04-10 20:16:55');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `icon_url` varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test1','test1','test','https://storage.googleapis.com/messenger-app/quick-reply.png'),(3,'test2','test2','test2','https://storage.googleapis.com/messenger-app/fix-carousel.png'),(4,'test3','test3','test3',''),(5,'undefined','undefined','undefined',''),(6,'test4','test4','test4',''),(7,'test5','test5','test5','https://storage.googleapis.com/messenger-app/fix-icon.png'),(8,'test5','test5','test5','https://storage.googleapis.com/messenger-app/fix-icon.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-17 20:55:56
