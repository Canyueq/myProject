package utils

import (
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

//用于生成token
func GenerateJWT(userID uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": strconv.FormatUint(uint64(userID), 10),
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})
	return token.SignedString([]byte(os.Getenv("JWT_SECRET_KEY")))
}