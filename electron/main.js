const { app, protocol, BrowserWindow, globalShortcut,session } = require('electron')

const path = require('path')
// 引入需要的模块
const http = require('http')
const axios = require('axios')
const url = require('url')
const loginAndGetCookie = require("./cookie")
 
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");

// 注册协议
protocol.registerSchemesAsPrivileged([
    { scheme: "app", privileges: { secure: true, standard: true } }
]);

const URL = `https://intonemanager.eintone.com/admin/company/workattendance`
const IP = `https://intonemanager.eintone.com/add_temp_ip`

// 创建HTTP服务器
const createApiServer = () => {
    const server = http.createServer(async (req, res) => {
        // 解析请求URL
        const parsedUrl = url.parse(req.url, true)
        const pathname = parsedUrl.pathname
        
        // 设置CORS头，允许前端访问
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        // 处理预检请求
        if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
        }
        if (pathname === '/api/ip' && req.method === 'GET') {
            try {
                // 获取请求参数中的url参数
                const nickname = parsedUrl.query.nickname;
                const password = parsedUrl.query.password;
                
                const response = await session.defaultSession.fetch(`${IP}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        username: nickname, // 替换为实际账号
                        password: password, // 替换为实际密码
                    }).toString(),
                });
                
                // 将获取的数据返回给页面
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: true,
                    data: response.data
                }))
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    error: error.message || '请求目标接口失败'
                }))
            }
            return
        }
        
        // 处理/api/html接口
        if (pathname === '/api/html' && req.method === 'GET') {
            try {
                // 获取请求参数中的url参数
                const team_user_id = parsedUrl.query.team_user_id
                const nickname = parsedUrl.query.nickname;
                const password = parsedUrl.query.password;
                const updata = parsedUrl.query.updata;
                
                // 先登录获取Cookie，再访问接口
                let cookie = await loginAndGetCookie(nickname,password,updata);
                const response = await axios.get(URL + '?team_user_id='+team_user_id,{
                    headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "zh-CN,zh;q=0.9",
                    "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1",
                    "cookie": cookie
                  },
                  referrerPolicy: "strict-origin-when-cross-origin"
                })

                
                // 将获取的数据返回给页面
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: true,
                    data: response.data
                }))
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    success: false,
                    error: error.message || '请求目标接口失败'
                }))
            }
            return
        }
        
        // 其他接口返回404
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: '接口不存在' }))
    })
    
    // 监听3001端口
    const PORT = 3033
    server.listen(PORT, () => {
        console.log(`API服务器已启动，监听端口 ${PORT}`)
        console.log(`可访问接口: http://localhost:${PORT}/api/html?url=目标接口地址`)
    })
    
    return server
}
 
const createWindow = () => {
    const win = new BrowserWindow({
        minWidth: 960,
        minHeight: 540,
        width: 960,
        height: 540,
        useContentSize: true,
        //窗口是否在屏幕居中. 默认值为 false
        center: true,
        //设置为 false 时可以创建一个无边框窗口 默认值为 true。
        frame: true,
        //窗口是否在创建时显示。 默认值为 true。
        show: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            preload: path.join(__dirname, 'preload.js'),
            webSecurity: true,
        }
    })
    win.setMenu(null)
    if (app.isPackaged) {
        win.loadURL(`file://${path.join(__dirname, '../dist/index/index.html')}`)
    } else {
        win.loadURL('http://localhost:3000/index/index.html')
        win.webContents.openDevTools()
    }
    globalShortcut.register("CommandOrControl+Shift+i", function () {
        win.webContents.openDevTools();
    });
}
 
app.whenReady().then(async () => {
 

    createWindow()

    // 创建API服务器
    createApiServer()
 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})