package main

import (
	_"fmt"
	"user-auth/controllers"
	"user-auth/initializers"
	"user-auth/middleware"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariable()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	r := gin.Default()
	r.GET("/api", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "server running",
		})
	})
	r.POST("/api/signup", controllers.SignUp)
	r.POST("/api/signin", controllers.SignIn)
	r.GET("/api/profile", middleware.Auth, controllers.LoggedUser)
	r.Run()
}