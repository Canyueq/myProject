package handler

import "gorm.io/gorm"

type DBHandler struct {
	DB *gorm.DB
}