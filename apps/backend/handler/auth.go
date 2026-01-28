package handler

import (
	"backend/model"
	"backend/utils"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Request struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"pass_word" binding:"required"`
}
func (h *DBHandler)Login(c *gin.Context) {
	req := Request{}
	//绑定请求体
	if err := c.ShouldBind(&req); err != nil {
			c.JSON(http.StatusOK, gin.H{
            "code":    400,
            "message": "请求错误",
        })
	}
	var user model.UserInfo
	//数据库中存储的对象
	if res:= h.DB.Where("username",req.Username).First(&user);res.Error !=nil{
		//不为空说明没有找到
		//1.没有找到
		if(errors.Is(res.Error, gorm.ErrRecordNotFound)){
			c.JSON(200,gin.H{
				"code": 1 ,
				"msg":"用户名不存在",
			})
		//2.程序错误
		}else {
			c.JSON(200,gin.H{
				"code": 99 ,
				"msg":"账号或密码错误",
			})
		}
	}else {
		//如果密码匹配
		if(utils.CheckPasswordHash(req.Password, user.PassWord)){
			token,_ := utils.GenerateJWT(user.ID)
			c.JSON(200,gin.H{
				"code":0 ,
				"msg":"账号密码正确",
				"data":gin.H{
					"id":user.ID,
					"username":user.Username,
					"token":token,
				},
			})
		}else{
			c.JSON(200,gin.H{
				"code": 1 ,
				"msg":"账号或密码错误",
			})
		}
	}

}
func (h *DBHandler)Signup(c *gin.Context) {
	var req Request
	
	if err := c.ShouldBind(&req); err!=nil{
		c.JSON(200, gin.H{
			"code":99,
			"msg":"请求错误",		
		})
		return 
	}
	//对存储于数据库的数据进行处理
	hashPassWord,_ := utils.HashPassword(req.Password);
	user := model.UserInfo {
		Username: req.Username,
		PassWord: hashPassWord,
	}
	if res := h.DB.Create(&user); res.Error!=nil{
		//err不等于nil有两种情况
		//1.已经有用户了
		c.JSON(200,gin.H{
			"code":1,
			"msg":`用户已经存在`,
		})
		//2.创建错误,目前没有遇到省略
	}else {
		c.JSON(200,gin.H{
			"code":0,
			"msg":"注册成功",
		})
	}
}