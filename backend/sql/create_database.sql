
CREATE DATABASE IF NOT EXISTS movie_app
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE movie_app;


-- Note: User creation requires administrative privileges
-- Run these commands manually with root/admin user:
-- CREATE USER IF NOT EXISTS 'movie_app_user'@'%' IDENTIFIED BY 'movie_app_pass';
-- GRANT ALL PRIVILEGES ON movie_app.* TO 'movie_app_user'@'%';
-- FLUSH PRIVILEGES;


SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NULL,
  isEmailVerified BOOLEAN NOT NULL DEFAULT FALSE,
  emailVerificationToken VARCHAR(255) NULL,
  passwordResetToken VARCHAR(255) NULL,
  passwordResetExpires DATETIME NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE movies (
  imdbID VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NULL,
  year VARCHAR(255) NULL,
  type VARCHAR(255) NULL,
  poster VARCHAR(500) NULL,
  plot TEXT NULL,
  director VARCHAR(255) NULL,
  actors VARCHAR(255) NULL,
  imdbRating VARCHAR(255) NULL,
  rated VARCHAR(255) NULL,
  genre VARCHAR(255) NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_movies_title (title),
  INDEX idx_movies_year (year),
  INDEX idx_movies_imdbRating (imdbRating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE favorites (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  movieId VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_favorites_user_movie UNIQUE (userId, movieId),
  CONSTRAINT fk_favorites_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_favorites_movie FOREIGN KEY (movieId) REFERENCES movies(imdbID) ON DELETE CASCADE,
  INDEX idx_favorites_user (userId),
  INDEX idx_favorites_movie (movieId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;