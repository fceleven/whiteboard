# 📅 部门周会议排班系统 (一个电子的……白板）

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

一个部门周会议管理系统，支持拖拽排班、冲突检测和大屏展示

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [部署](#-部署指南) • [文档](#-文档)

</div>

---

## 📖 项目简介

eBoard 是一个为团队设计的会议排班管理系统，提供直观的周视图界面和“强大”的会议管理功能。通过拖拽操作轻松调整会议时间，智能检测时间冲突，并支持大屏展示模式用于会议室展示。

### 核心优势

- 🎯 **直观易用**: 拖拽式操作，所见即所得
- ⚡ **智能检测**: 自动识别会议时间冲突
- 📱 **响应式设计**: 完美适配各种屏幕尺寸
- 🖥️ **大屏模式**: 专为会议室大屏设计的展示界面
- 🔄 **实时同步**: 前后端数据实时同步
- 🎨 **现代化UI**: 基于 Ant Design 的精美界面

---

## ✨ 功能特性

### 📋 会议管理

- ✅ 创建、编辑、删除会议
- ✅ 拖拽调整会议日期和时间段（上午/下午）
- ✅ 会议状态管理（正常、取消、改期）
- ✅ 设置会议标题、时间、地点、参与人、备注
- ✅ 全体会议特殊标识
- ✅ 时间段智能判断（根据时间自动切换上午/下午）

### 👥 人员管理

- ✅ 添加、删除员工
- ✅ 人员列表管理

### 🔍 冲突检测

- ✅ 同一人在同一时间段的多会议冲突检测
- ✅ 全体会议与个人会议的冲突提示
- ✅ 可视化冲突标识（红色高亮）

### 📅 周视图

- ✅ 默认显示工作日（周一~周五）
- ✅ 可选显示周末（周六、周日）
- ✅ 设置持久化（localStorage）
- ✅ 快速切换上一周/下一周
- ✅ 响应式布局，自适应屏幕大小

### 🖥️ 大屏展示模式

- ✅ 深色主题，适合大屏展示
- ✅ 自动刷新（每 5 分钟）
- ✅ 现代化设计（渐变背景、毛玻璃效果）
- ✅ 状态可视化（颜色标识）
- ✅ 全屏模式支持
- ✅ 同步管理端的周末显示设置
- ✅ 一屏展示完整周安排（无滚动条）

---

## 🏗️ 技术栈

### 后端

| 技术                | 版本   | 说明                |
| ------------------- | ------ | ------------------- |
| **NestJS**          | 10.4.8 | 企业级 Node.js 框架 |
| **TypeORM**         | 0.3.20 | ORM 框架            |
| **SQLite**          | 5.1.7  | 轻量级数据库        |
| **TypeScript**      | 5.7.2  | 类型安全            |
| **class-validator** | 0.14.1 | 数据验证            |

### 前端

| 技术             | 版本    | 说明      |
| ---------------- | ------- | --------- |
| **React**        | 18.3.1  | UI 框架   |
| **TypeScript**   | 5.7.2   | 类型安全  |
| **Vite**         | 5.4.11  | 构建工具  |
| **Ant Design**   | 5.22.6  | UI 组件库 |
| **React Router** | 6.28.0  | 路由管理  |
| **@dnd-kit**     | 6.3.1   | 拖拽功能  |
| **dayjs**        | 1.11.13 | 日期处理  |

### 架构

- **Monorepo**: npm workspaces 管理前后端
- **RESTful API**: 标准化的 API 设计
- **SPA**: 单页应用架构

---

## 📁 项目结构

```
eboard/
├── backend/                    # NestJS 后端
│   ├── src/
│   │   ├── users/             # 用户模块
│   │   │   ├── dto/           # 数据传输对象
│   │   │   ├── user.entity.ts # 用户实体
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── meetings/          # 会议模块
│   │   │   ├── dto/
│   │   │   ├── meeting.entity.ts
│   │   │   ├── meeting-attendee.entity.ts
│   │   │   ├── meetings.controller.ts
│   │   │   ├── meetings.service.ts
│   │   │   └── meetings.module.ts
│   │   ├── weeks/             # 周视图模块
│   │   │   ├── weeks.controller.ts
│   │   │   └── weeks.module.ts
│   │   ├── common/            # 公共工具
│   │   │   └── utils/
│   │   ├── config/            # 配置文件
│   │   ├── main.ts            # 入口文件
│   │   └── app.module.ts      # 根模块
│   ├── .env.example           # 环境变量示例
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React 前端
│   ├── src/
│   │   ├── components/        # 组件
│   │   │   ├── WeekTable.tsx           # 周视图表格
│   │   │   ├── TimeCell.tsx            # 时间格单元格
│   │   │   ├── MeetingCard.tsx         # 会议卡片
│   │   │   ├── DraggableMeetingCard.tsx # 可拖拽会议卡片
│   │   │   ├── DisplayMeetingCard.tsx  # 展示模式卡片
│   │   │   ├── MeetingFormModal.tsx    # 会议表单
│   │   │   └── SettingsBar.tsx         # 设置栏
│   │   ├── pages/             # 页面
│   │   │   ├── WeekViewPage.tsx   # 会议管理页面
│   │   │   ├── UsersPage.tsx      # 人员管理页面
│   │   │   └── DisplayPage.tsx    # 大屏展示页面
│   │   ├── api/               # API 调用
│   │   │   └── index.ts
│   │   ├── utils/             # 工具函数
│   │   │   ├── date.ts        # 日期工具
│   │   │   └── conflict.ts    # 冲突检测
│   │   ├── types/             # TypeScript 类型
│   │   │   └── index.ts
│   │   ├── App.tsx            # 应用根组件
│   │   ├── main.tsx           # 入口文件
│   │   └── index.css          # 全局样式
│   ├── .env.example           # 环境变量示例
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore                 # Git 忽略文件
├── package.json               # 根配置文件
├── README.md                  # 项目文档
└── DISPLAY_MODE.md            # 展示模式使用说明
```

---

## 🚀 快速开始

### 前置要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0

### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone <repository-url>
cd eboard
```

#### 2️⃣ 安装依赖

使用 npm workspaces 一键安装所有依赖：

```bash
npm install
```

如果遇到安装问题，可以尝试清理后重新安装：

```bash
# 清理所有依赖和构建产物
npm run clean

# 重新安装
npm install
```

#### 3️⃣ 配置环境变量

**后端配置：**

```bash
cp backend/.env.example backend/.env
```

编辑 `backend/.env`：

```env
PORT=3000
NODE_ENV=development
DATABASE_PATH=./db.sqlite
FRONTEND_URL=http://localhost:5173
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
```

**前端配置：**

```bash
cp frontend/.env.example frontend/.env
```

编辑 `frontend/.env`：

```env
VITE_API_BASE_URL=http://localhost:3000
```

#### 4️⃣ 启动开发服务器

**方式一：同时启动前后端（推荐）**

```bash
npm run dev
```

**方式二：分别启动**

```bash
# 终端 1：启动后端
npm run dev:backend

# 终端 2：启动前端
npm run dev:frontend
```

#### 5️⃣ 访问应用

- **会议管理**: http://localhost:5173/
- **人员管理**: http://localhost:5173/users
- **大屏展示**: http://localhost:5173/display
- **API 接口**: http://localhost:3000/api

---

## 📡 API 接口

### 用户相关

| 方法   | 路径             | 说明         |
| ------ | ---------------- | ------------ |
| GET    | `/api/users`     | 获取所有用户 |
| GET    | `/api/users/:id` | 获取单个用户 |
| POST   | `/api/users`     | 创建用户     |
| PATCH  | `/api/users/:id` | 更新用户     |
| DELETE | `/api/users/:id` | 删除用户     |

### 会议相关

| 方法   | 路径                             | 说明             |
| ------ | -------------------------------- | ---------------- |
| GET    | `/api/weeks/:weekStart/meetings` | 获取指定周的会议 |
| GET    | `/api/meetings/:id`              | 获取单个会议     |
| POST   | `/api/meetings`                  | 创建会议         |
| PUT    | `/api/meetings/:id`              | 更新会议         |
| DELETE | `/api/meetings/:id`              | 删除会议         |

### 请求示例

**创建会议：**

```bash
POST /api/meetings
Content-Type: application/json

{
  "date": "2024-12-17",
  "half_day": "AM",
  "start_time": "09:00",
  "title": "产品评审会",
  "location": "会议室A",
  "is_all_staff": false,
  "status": "normal",
  "note": "请提前准备产品文档",
  "attendee_ids": [1, 2, 3]
}
```

**更新用户信息：**

```bash
PATCH /api/users/1
Content-Type: application/json

{
  "name": "张三"
}
```



## 📦 部署指南

### Ubuntu 服务器生产部署

#### 一键部署脚本

```bash
# 1. 安装 Node.js 18.x LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git

# 2. 克隆并配置项目
sudo mkdir -p /var/www && cd /var/www
sudo git clone <repository-url> eboard
cd eboard && sudo chown -R $USER:$USER /var/www/eboard
npm install

# 3. 配置环境变量
cat > backend/.env << EOF
NODE_ENV=production
PORT=3000
DATABASE_PATH=/var/www/eboard/backend/db.sqlite
TYPEORM_SYNCHRONIZE=false
EOF

cat > frontend/.env << EOF
VITE_API_BASE_URL=http://localhost:3000
EOF

# 4. 构建项目
npm run build

# 5. 安装 PM2 并启动服务
sudo npm install -g pm2
cd /var/www/eboard/backend
pm2 start dist/main.js --name eboard-backend
pm2 save && pm2 startup systemd

# 6. 安装并配置 Nginx

```bash
sudo apt-get install -y nginx

sudo tee /etc/nginx/sites-available/eboard > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/eboard/frontend/dist;
    index index.html;
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/eboard /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx && sudo systemctl enable nginx
```

#### 验证部署

```bash
pm2 status                              # 检查后端
pm2 logs eboard-backend --lines 20     # 查看日志
curl http://localhost                   # 测试访问
```

---

### 日常管理命令

**PM2 管理**：

```bash
pm2 status                    # 查看状态
pm2 logs eboard-backend       # 查看日志
pm2 restart eboard-backend    # 重启
pm2 monit                     # 监控
```

**Nginx 管理**：

```bash
sudo systemctl restart nginx              # 重启
sudo tail -f /var/log/nginx/error.log    # 查看日志
```

**更新项目**：

```bash
cd /var/www/eboard && git pull && npm install && npm run build && pm2 restart eboard-backend
```

**数据库备份**：

```bash
# 创建备份脚本
cat > /var/www/eboard/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/www/eboard/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
cp /var/www/eboard/backend/db.sqlite $BACKUP_DIR/db_$DATE.sqlite
find $BACKUP_DIR -name "db_*.sqlite" -mtime +7 -delete
EOF

chmod +x /var/www/eboard/backup.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/eboard/backup.sh") | crontab -
```

---

### 其他平台部署

**Windows Server**：使用 PM2 管理后端进程
**Docker**：可根据需要创建 Dockerfile（暂未提供）

---

## 🛠️ 可用脚本

### 根目录

| 命令                   | 说明                     |
| ---------------------- | ------------------------ |
| `npm run dev`          | 并行启动前后端开发服务器 |
| `npm run dev:backend`  | 仅启动后端               |
| `npm run dev:frontend` | 仅启动前端               |
| `npm run build`        | 构建前后端               |
| `npm run clean`        | 清理依赖和构建产物       |

### 后端

| 命令                 | 说明               |
| -------------------- | ------------------ |
| `npm run start:dev`  | 开发模式（热重载） |
| `npm run build`      | 构建生产版本       |
| `npm run start:prod` | 启动生产版本       |

### 前端

| 命令              | 说明               |
| ----------------- | ------------------ |
| `npm run dev`     | 开发模式（热重载） |
| `npm run build`   | 构建生产版本       |
| `npm run preview` | 预览构建结果       |

---

---

## 🖥️ 展示模式使用说明

### 访问方式

展示模式是专门为大屏幕显示设计的全屏页面，具有现代化视觉设计和自动刷新功能。

**访问路径**: `/display`（例如：`http://localhost:5173/display`）

### 显示周末设置

展示模式会自动同步会议管理页面的"显示周末"开关状态。

- **自动同步**（推荐）：直接访问 `/display`，自动读取管理页面设置
- **URL 参数覆盖**：通过 URL 参数临时控制
  - 强制显示周末：`/display?weekend=true`
  - 强制不显示周末：`/display?weekend=false`

**优先级**：URL 参数 > 管理页面设置

### 功能特性

- ✅ 自动刷新（每 5 分钟）
- ✅ 响应式布局，适配 4K/1080P 等分辨率
- ✅ 一屏显示，无滚动条
- ✅ 现代化设计（渐变背景、毛玻璃效果）
- ✅ 状态可视化（正常-绿色 / 取消-红色 / 改期-黄色）

### 建议使用场景

- 会议室门口的大屏显示
- 办公区域的公共显示屏
- 团队协作区的信息看板

---

## 🗄️ 数据库说明

### 数据模型

#### users - 用户表

| 字段 | 类型    | 说明       |
| ---- | ------- | ---------- |
| id   | INTEGER | 主键，自增 |
| name | VARCHAR | 用户姓名   |

#### meetings - 会议表

| 字段         | 类型     | 说明                                     |
| ------------ | -------- | ---------------------------------------- |
| id           | INTEGER  | 主键，自增                               |
| date         | VARCHAR  | 会议日期（YYYY-MM-DD）                   |
| half_day     | VARCHAR  | 时间段（AM/PM）                          |
| start_time   | VARCHAR  | 开始时间（HH:mm）                        |
| title        | VARCHAR  | 会议标题                                 |
| location     | VARCHAR  | 会议地点（可选）                         |
| is_all_staff | BOOLEAN  | 是否全体会议（默认 false）               |
| status       | VARCHAR  | 会议状态（normal/cancelled/rescheduled） |
| note         | TEXT     | 备注（可选）                             |
| created_at   | DATETIME | 创建时间                                 |
| updated_at   | DATETIME | 更新时间                                 |

#### meeting_attendees - 会议参与人关联表

| 字段       | 类型    | 说明           |
| ---------- | ------- | -------------- |
| id         | INTEGER | 主键，自增     |
| meeting_id | INTEGER | 会议ID（外键） |
| user_id    | INTEGER | 用户ID（外键） |

### 数据库管理

**开发环境**：设置 `TYPEORM_SYNCHRONIZE=true`，TypeORM 自动同步数据库结构

**生产环境**：
- 设置 `TYPEORM_SYNCHRONIZE=false`
- 定期备份数据库文件
- 使用绝对路径配置 `DATABASE_PATH`

**数据库重置**（开发环境）：

```bash
# Linux/Mac
rm backend/db.sqlite && cd backend && npm run start:dev

# Windows
Remove-Item backend\db.sqlite -ErrorAction SilentlyContinue
cd backend
npm run start:dev
```

---

## ⚠️ 注意事项

### 开发环境

- ✅ 使用 `TYPEORM_SYNCHRONIZE=true` 自动同步数据库结构
- ✅ 启用详细日志输出便于调试
- ✅ 数据库文件位于 `backend/db.sqlite`

### 生产环境

- ⚠️ **必须**设置 `TYPEORM_SYNCHRONIZE=false`
- ⚠️ **必须**使用绝对路径配置数据库文件
- ⚠️ **定期备份** SQLite 数据库文件
- ⚠️ **建议**使用 PM2 等进程管理器
- ⚠️ **建议**添加身份认证和权限控制
- ⚠️ **建议**配置 HTTPS 和防火墙

---

## 🐛 常见问题

### Q: npm install 失败？

**A:** 尝试以下步骤：

```bash
# 1. 清理 npm 缓存
npm cache clean --force

# 2. 删除所有依赖
npm run clean

# 3. 重新安装
npm install
```

### Q: 端口已被占用？

**A:** 修改配置文件：

- **后端**: 编辑 `backend/.env` 中的 `PORT`
- **前端**: 编辑 `frontend/vite.config.ts` 中的 `server.port`

### Q: 展示模式不显示周末？

**A:** 两种方式：

1. **自动同步**：在会议管理页面打开"显示周末"开关，展示模式会自动同步
2. **URL 参数**：访问 `/display?weekend=true` 强制显示

### Q: 数据库文件丢失？

**A:** 检查以下事项：

- 确认 `DATABASE_PATH` 配置正确
- 生产环境使用绝对路径
- 检查文件权限
- 定期备份数据库文件

### Q: 拖拽功能不工作？

**A:** 检查：

- 浏览器是否支持（推荐使用 Chrome/Firefox 最新版本）
- 是否有 JavaScript 错误（打开浏览器控制台查看）

---

## 🔒 安全建议

1. **身份认证**: 建议添加 JWT 或 Session 认证
2. **权限控制**: 实现基于角色的访问控制（RBAC）
3. **输入验证**: 已集成 class-validator，注意自定义验证规则
4. **HTTPS**: 生产环境必须使用 HTTPS
5. **CORS**: 根据实际情况配置 CORS 白名单
6. **SQL 注入**: TypeORM 已提供保护，避免使用原始 SQL
7. **XSS**: React 已提供基本保护，注意 `dangerouslySetInnerHTML`
8. **定期更新**: 及时更新依赖包修复安全漏洞

---

## 📈 性能优化

1. **前端优化**:
   - 已配置代码分割和懒加载
   - 使用 Vite 的快速 HMR
   - 生产构建自动压缩和优化

2. **后端优化**:
   - TypeORM 查询优化（使用 relations 预加载）
   - 适当添加数据库索引
   - 考虑使用 Redis 缓存

3. **数据库优化**:
   - SQLite 适合小型应用
   - 大型应用建议迁移到 PostgreSQL/MySQL

---

## 🗺️ 开发路线

### 待实现功能

- [ ] 用户认证和权限管理
- [ ] 会议提醒通知
- [ ] 会议室资源管理
- [ ] 移动端适配
- [ ] 数据导出（Excel/PDF）
- [ ] 多语言支持
- [ ] 主题切换（浅色/深色）
- [ ] 会议统计报表

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

本项目采用 MIT 协议 - 详见 [LICENSE](LICENSE) 文件

---

## 👨‍💻 作者

**fceleven**

---

## 🙏 致谢

感谢以下开源项目：

- [NestJS](https://nestjs.com/)
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [TypeORM](https://typeorm.io/)
- [Vite](https://vitejs.dev/)
- [@dnd-kit](https://dndkit.com/)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给一个 Star！⭐**

Made with ❤️ by fceleven

</div>
