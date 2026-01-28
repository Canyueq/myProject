package handler

import (
	"backend/model"

	"github.com/gin-gonic/gin"
)
func (h *DBHandler)GetUserInfo(c *gin.Context){
	id,_ := c.Get("user_id")
	var user model.UserInfo
	h.DB.Where("id",id).First(&user);
	c.JSON(200,gin.H{
		"code":0,
		"data":gin.H{
			"id": id,
			"user_name":user.Username,
		},
	})
}