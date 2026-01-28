// internal/utils/password.go
package utils

import (
	"golang.org/x/crypto/bcrypt"
)

// HashPassword 生成 bcrypt 哈希值
func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    return string(bytes), err
}

// CheckPasswordHash 验证密码是否匹配
func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}