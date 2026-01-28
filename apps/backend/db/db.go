package db

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB


func InitDB()(*sql.DB, error) {
	// 自动加载 .env 文件（仅在开发环境）
    if err := godotenv.Load(); err != nil {
        log.Println("未找到 .env 文件，假设在生产环境运行")
        // 生产环境通常通过系统环境变量传入，所以不报错
    }
    // 从环境变量读取数据库连接信息（推荐）
    connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
        // 默认开发配置（不建议硬编码在生产）
        connStr = "host=localhost port=5432 user=canyue password=4399qinfugui dbname=canyue-db sslmode=disable"
    }
	var err error
    DB, err = sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal("无法打开数据库连接:", err)
    }
	if err = DB.Ping(); err != nil {
        log.Fatal("无法连接到数据库:", err)
    }
	log.Println("✅ 成功连接到 PostgreSQL 数据库")
	return DB,err
}