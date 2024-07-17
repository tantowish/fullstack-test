package initializers

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb(){
	var err error
	dbName := os.Getenv("DB_NAME")
	conn_url := fmt.Sprintf("user=%s host=%s port=%s sslmode=disable",
		os.Getenv("DB_USER"),
		// os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
	)

	DB, err = gorm.Open(postgres.Open(conn_url), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to DB")
	}
    count  := 0
    DB.Raw("SELECT count(*) FROM pg_database WHERE datname = ?", dbName).Scan(&count)
    if count == 0 {
        sql := fmt.Sprintf("CREATE DATABASE %s", dbName)
        result := DB.Exec(sql)
		if result.Error != nil {
			panic("Failed to create database: " + result.Error.Error())
		}
    }

	conn_db_url := fmt.Sprintf("%s dbname=%s", conn_url, dbName)
	DB, err = gorm.Open(postgres.Open(conn_db_url), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to DB")
	}
}