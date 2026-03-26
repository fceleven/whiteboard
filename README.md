# 部门周会议排班系统（eBoard）

## 项目概述

eBoard 是一套面向企业部门的会议排班管理系统，旨在提供高效的会议日程管理与可视化展示能力。系统采用前后端分离架构，支持拖拽式排班操作、智能冲突检测以及会议室大屏展示功能。

---

## 核心功能

### 会议管理
- 会议全生命周期管理（创建、编辑、删除）
- 拖拽调整会议日期与时段（上午/下午）
- 会议状态管理（正常、取消、改期）
- 会议属性配置：标题、时间、地点、参与人、备注
- 全体会议标识支持

### 人员管理
- 员工信息维护（添加、删除、编辑）
- 人员列表统一管理

### 冲突检测
- 同一人员同一时段多会议冲突识别
- 全体会议与个人会议冲突提示
- 可视化冲突标识

### 周视图展示
- 默认工作日模式（周一至周五）
- 可选周末显示（周六、周日）
- 用户偏好持久化（localStorage）
- 周次快速切换

### 大屏展示模式
- 深色主题适配会议室大屏
- 自动刷新机制（5 分钟间隔）
- 会议状态可视化标识
- 与管理端周末显示设置同步

---

## 技术架构

### 后端技术栈
| 技术 | 版本 |
|------|------|
| NestJS | 10.4.8 |
| TypeORM | 0.3.20 |
| SQLite | 5.1.7 |
| TypeScript | 5.7.2 |

### 前端技术栈
| 技术 | 版本 |
|------|------|
| React | 18.3.1 |
| TypeScript | 5.7.2 |
| Vite | 5.4.11 |
| Ant Design | 5.22.6 |
| React Router | 6.28.0 |
| @dnd-kit | 6.3.1 |

### 架构模式
- Monorepo 项目结构（npm workspaces）
- RESTful API 接口规范
- SPA 单页应用架构

---

## 项目结构

```
eboard/
├── backend/
│   ├── src/
│   │   ├── users/             # 用户模块
│   │   ├── meetings/          # 会议模块
│   │   ├── weeks/             # 周视图模块
│   │   ├── common/            # 公共工具类
│   │   ├── config/            # 配置模块
│   │   └── main.ts            # 应用入口
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # 公共组件
│   │   ├── pages/             # 页面组件
│   │   ├── api/               # API 调用封装
│   │   ├── utils/             # 工具函数
│   │   └── main.tsx           # 应用入口
│   └── package.json
│
├── package.json
└── README.md
```

---

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

1. 克隆仓库
```bash
git clone <repository-url>
cd eboard
```

2. 安装依赖
```bash
npm install
```

3. 环境变量配置

后端配置（`backend/.env`）:
```env
PORT=3000
NODE_ENV=development
DATABASE_PATH=./db.sqlite
TYPEORM_SYNCHRONIZE=true
```

前端配置（`frontend/.env`）:
```env
VITE_API_BASE_URL=http://localhost:3000
```

4. 启动开发服务
```bash
npm run dev
```

### 访问地址
| 模块 | 地址 |
|------|------|
| 会议管理 | http://localhost:5173/ |
| 人员管理 | http://localhost:5173/users |
| 大屏展示 | http://localhost:5173/display |
| API 接口 | http://localhost:3000/api |

---

## API 接口文档

### 用户接口
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/users` | 获取用户列表 |
| POST | `/api/users` | 创建用户 |
| PATCH | `/api/users/:id` | 更新用户信息 |
| DELETE | `/api/users/:id` | 删除用户 |

### 会议接口
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/weeks/:weekStart/meetings` | 获取指定周会议列表 |
| POST | `/api/meetings` | 创建会议 |
| PUT | `/api/meetings/:id` | 更新会议信息 |
| DELETE | `/api/meetings/:id` | 删除会议 |

### 请求示例

创建会议：
```bash
POST /api/meetings
Content-Type: application/json

{
  "date": "2024-12-17",
  "half_day": "AM",
  "start_time": "09:00",
  "title": "产品评审会",
  "location": "会议室 A",
  "is_all_staff": false,
  "status": "normal",
  "attendee_ids": [1, 2, 3]
}
```

---

## 部署指南

### 生产环境配置

1. 环境变量设置
```env
# backend/.env
NODE_ENV=production
TYPEORM_SYNCHRONIZE=false
DATABASE_PATH=/var/www/eboard/backend/db.sqlite
```

2. 项目构建
```bash
npm run build
```

3. 服务启动
```bash
# 后端服务
cd backend
pm2 start dist/main.js --name eboard-backend

# 前端服务（推荐 Nginx 托管 dist 目录）
```

### Nginx 配置参考
```nginx
server {
    listen 80;
    root /var/www/eboard/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 可用命令

### 根目录
| 命令 | 说明 |
|------|------|
| `npm run dev` | 并行启动前后端开发服务 |
| `npm run build` | 构建前后端生产版本 |
| `npm run clean` | 清理依赖及构建产物 |

### 后端
| 命令 | 说明 |
|------|------|
| `npm run start:dev` | 开发模式（热重载） |
| `npm run start:prod` | 生产模式 |

### 前端
| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式 |
| `npm run build` | 生产构建 |

---

## 大屏展示模式

访问路径：`/display`

展示模式默认同步管理页面的"显示周末"配置，支持 URL 参数覆盖：
- `/display?weekend=true` - 强制显示周末
- `/display?weekend=false` - 强制隐藏周末

---

## 数据库设计

### users 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| name | VARCHAR | 姓名 |

### meetings 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| date | VARCHAR | 日期（YYYY-MM-DD） |
| half_day | VARCHAR | 时段（AM/PM） |
| start_time | VARCHAR | 开始时间 |
| title | VARCHAR | 标题 |
| location | VARCHAR | 地点 |
| is_all_staff | BOOLEAN | 是否全体会议 |
| status | VARCHAR | 状态（normal/cancelled/rescheduled） |
| note | TEXT | 备注 |

### meeting_attendees 表
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| meeting_id | INTEGER | 会议 ID |
| user_id | INTEGER | 用户 ID |

---

## 注意事项

### 开发环境
- `TYPEORM_SYNCHRONIZE=true` 启用数据库结构自动同步
- 数据库文件默认位于 `backend/db.sqlite`

### 生产环境
- 必须设置 `TYPEORM_SYNCHRONIZE=false` 禁用自动同步
- 数据库路径建议使用绝对路径
- 建议实施定期数据库备份策略
- 建议部署身份认证机制及 HTTPS 加密

---

## 常见问题

**问题：npm install 失败**

解决方案：
```bash
npm cache clean --force
npm run clean
npm install
```

**问题：端口已被占用**

解决方案：修改 `backend/.env` 中的 `PORT` 配置，或调整 `frontend/vite.config.ts` 中的端口设置。

---

## 开发规划

- [ ] 用户认证与权限管理
- [ ] 会议提醒通知
- [ ] 数据导出功能
- [ ] 主题切换功能

---

## 开源协议

MIT License
