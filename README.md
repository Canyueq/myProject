# vue-gin

本项目采用monoreop建构使用使用vue3作为前端框架，gin作为后端框架构建项目。仅供本人学习使用

## 前后端同时启动

```
pnpm dev
```

## 前端

```
pnpm dev:frontend
```

### 安装各种工具包

#### vue官方推荐路由工具vue-router

```
pnpm add vue-router@4
```

#### 前端组件库elementplus

```
pnpm install element-plus
```

按需导入

```
pnpm install -D unplugin-vue-components unplugin-auto-import
```

#### 前后端联调axios

```
pnpm add axios
```

#### 状态管理工具pinia

```
pnpm add pinia
```

## 后端

```
pnpm dev:backend
```

### 初始化main包

```
go mod init main
```

### 安装gin

```
go get github.com/gin-gonic/gin
```

### 安装go依赖工具包

设置代理

```
go env -w GOPROXY=https://goproxy.cn,direct
```

安装依赖

```
go install golang.org/x/tools/gopls@latest
```

## 数据库

postgresql作为世界上最强大的开源数据库
所以本项目选择使用pg数据库作为存储数据库
