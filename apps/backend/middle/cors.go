package middle

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	// 其他导入...
)

func Cors()gin.HandlerFunc{

    // 创建 CORS 中间件
    c := cors.New(cors.Config{
       AllowOrigins:     []string{"http://localhost:5023"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization","X-Custom-Header"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    })
	return c
}