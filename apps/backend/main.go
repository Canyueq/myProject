package main

import (
	"backend/middle"

	"github.com/joho/godotenv"
)

func main(){
	godotenv.Load()
	middle.InitRouter()
}