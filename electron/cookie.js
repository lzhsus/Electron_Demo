const { app, BrowserWindow, session } = require('electron');
const axios = require('axios');
const path = require('path');

// 目标网站信息
const LOGIN_SITE_URL = 'https://intonemanager.eintone.com/admin/auth/login'; // 登录页面URL
const COOKIE_NAME = 'intonemanager_session'; // 需要获取的Cookie名称


// 步骤1：登录目标网站并获取Cookie
async function loginAndGetCookie(nickname, password, updata = false) {
    try {
        if (!updata) {
            let temp = await session.defaultSession.cookies.get({
                name: COOKIE_NAME,
                url: LOGIN_SITE_URL // 确保与登录网站域名一致
            });
            if (temp && temp.length) {
                return `${COOKIE_NAME}=${temp[0].value}`;
            }
        }

        //  提交登录请求（根据网站登录接口和参数调整）
        const loginResponse = await session.defaultSession.fetch(`${LOGIN_SITE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: nickname, // 替换为实际账号
                password: password, // 替换为实际密码
            }).toString(),
        });

        if (!loginResponse.ok) {
            throw new Error(`登录失败: ${loginResponse.status}`);
        }

        // 3. 从会话中获取目标Cookie
        const cookies = await session.defaultSession.cookies.get({
            name: COOKIE_NAME,
            url: LOGIN_SITE_URL // 确保与登录网站域名一致
        });

        if (cookies.length === 0) {
            throw new Error(`未获取到 ${COOKIE_NAME} Cookie`);
        }

        return `${COOKIE_NAME}=${cookies[0].value}`;
    } catch (error) {
        console.error('登录或获取Cookie失败:', error);
        return null;
    }
}

function getCookie() {

}

module.exports = loginAndGetCookie
