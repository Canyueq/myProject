package middle

import (
	"backend/db"
	"backend/handler"

	"github.com/gin-gonic/gin"
)

func InitRouter() {
	// 1. 初始化数据库（依赖）
    dbConn, err := db.NewDB()
    if err != nil {
        panic(err)
    }

	DBHandler := &handler.DBHandler{DB: dbConn}

	//创建cors中间件
	cors := Cors
	// 创建带默认中间件（日志与恢复）的 Gin 路由器
	router := gin.Default()

	//绑定跨域中间件
	router.Use(cors())
	auth := router.Group("/auth")
	//登录和注册不用绑定jwt中间件
	// auth.Use(AuthMiddleware())
	{
		//登录的接口
		auth.POST("/login", DBHandler.Login)

		//注册的接口
		auth.POST("/signup", DBHandler.Signup)
	}
	//获取用户信息
	user := router.Group("/user")
	user.Use(AuthMiddleware())
	{
		user.POST("/info",DBHandler.GetUserInfo)
	}
	// 默认端口 8080 启动服务器
	// 监听 0.0.0.0:8080（Windows 下为 localhost:8080）
	router.Run(":8080")
}