package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)
var DataBase *gorm.DB
func NewDB()(*gorm.DB, error) {
	dsn := "host=localhost user=canyue password=123456 dbname=can-yue port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	var err error
    DataBase, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
        panic("连接数据库失败: " + err.Error())
    }
	return DataBase,err
}