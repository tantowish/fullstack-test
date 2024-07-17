package initializers

import (
	models "user-auth/model"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}