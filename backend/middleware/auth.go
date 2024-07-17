package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"
	"user-auth/initializers"
	models "user-auth/model"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Auth(c *gin.Context) {
	// Get token from Authorization header
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Abort()
		return
	}

	tokenString := strings.Split(authHeader, " ")[1] // Extract JWT token from "Bearer <token>"
	if tokenString == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
		c.Abort()
		return
	}

	// Parse and validate JWT
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		// TODO: Replace with your actual secret key or retrieve it from a secure location
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	// Validate token claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Check expiration
		exp := claims["exp"].(float64)
		if time.Unix(int64(exp), 0).Before(time.Now()) {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is expired"})
			c.Abort()
			return
		}

		// Find the user with token sub
		var user models.User
		initializers.DB.First(&user, claims["sub"])

		// Attach user info to context
		if user.ID == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
			c.Abort()
			return
		}
		c.Set("user", user)

		c.Next()
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
		c.Abort()
		return
	}

	c.Next()
}