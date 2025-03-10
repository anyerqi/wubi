# 五笔编码查询系统

这是一个基于Next.js开发的五笔编码查询Web应用，可以查询汉字在不同版本五笔输入法中的编码，同时提供各版本五笔字根表图。

## 功能特点

- 支持查询单个汉字的五笔编码
- 同时显示86版、98版和新世纪版的编码
- 提供86版、98版和新世纪版的字根表图，方便学习和参考
- 从官方标准码表文件中获取五笔数据
- 简洁直观的用户界面
- 响应式设计，适配不同设备

## 技术栈

- [Next.js](https://nextjs.org/) - React框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架

## 数据源

应用从以下码表文件获取编码数据：

- `wubi86.dict.yaml` - 86版五笔码表
- `wubi98_zhishan.dict.yaml` - 98版五笔码表
- `wubi06_gb18030-2000_dz.dict.yaml` - 新世纪五笔码表

字根图来源：
- `wubi86.webp` - 86版五笔字根图
- `wubi98.png` - 98版五笔字根图
- `wubixsj.jpg` - 新世纪版五笔字根图

## 本地开发

1. 克隆仓库
```bash
git clone <repository-url>
cd wubi
```

2. 安装依赖
```bash
npm install
```

3. 确保将码表文件放在项目根目录：
   - wubi86.dict.yaml
   - wubi98_zhishan.dict.yaml
   - wubi06_gb18030-2000_dz.dict.yaml

4. 确保字根图放在public目录下：
   - public/wubi86.webp
   - public/wubi98.png
   - public/wubixsj.jpg

5. 启动开发服务器
```bash
npm run dev
```

6. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 许可证

MIT
