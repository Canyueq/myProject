package middle

import (
	"fmt"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

//用于验证token的
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenStr := c.GetHeader("Authorization")
        if tokenStr == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "missing token"})
            return
        }
        token, err := jwt.Parse(strings.Replace(tokenStr, "Bearer ", "", 1), 
            func(t *jwt.Token) (any, error) {
                if t.Method != jwt.SigningMethodHS256 {
                    return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
                }
                return []byte(os.Getenv("JWT_SECRET_KEY")), nil
        })
        if err != nil || !token.Valid {
            c.AbortWithStatusJSON(200, gin.H{"error": "invalid token"})
            return
        }
        claims := token.Claims.(jwt.MapClaims)
        userID := claims["sub"].(string)
        c.Set("user_id", userID)
        c.Next()
    }
}