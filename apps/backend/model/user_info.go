package model

type UserInfo struct {
	ID       uint   `gorm:"column:id;primaryKey"`
	Username string `gorm:"column:username;not null"`
	PassWord string `gorm:"column:pass_word;not null"`
}

func (UserInfo) TableName() string {
	return "user_info"
}