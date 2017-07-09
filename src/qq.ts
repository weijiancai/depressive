'use strict';

const GET_QR_CODE = "https://ssl.ptlogin2.qq.com/ptqrshow?appid=501004106&e=0&l=M&s=5&d=72&v=4&t=0.1"
const USER_AGENT = "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36 "

const VERIFY_QR_CODE = "https://ssl.ptlogin2.qq.com/ptqrlogin?" +
                    "ptqrtoken={0}&webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&" +
                    "u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&" +
                    "ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&0-0-157510&" +
                    "mibao_css=m_webqq&t=undefined&g=1&js_type=0&js_ver=10184&login_sig=&pt_randsalt=3"
const VERIFY_QR_CODE_REFERER = "https://ui.ptlogin2.qq.com/cgi-bin/login?" +
                    "daid=164&target=self&style=16&mibao_css=m_webqq&appid=501004106&enable_qlogin=0&no_verifyimg=1&" +
                    "s_url=http%3A%2F%2Fw.qq.com%2Fproxy.html&f_url=loginerroralert&strong_login=1&login_state=10&t" +
                        "=20131024001"
const GET_PTWEBQQ_REFERER = "http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1"
const GET_VFWEBQQ = "http://s.web2.qq.com/api/getvfwebqq?ptwebqq={0}&clientid=53999199&psessionid=&t=0.1"
const GET_VFWEBQQ_REFERER = "http://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1"
const GET_UIN_AND_PSESSIONID = "http://d1.web2.qq.com/channel/login2"
const GET_UIN_AND_PSESSIONID_REFERER = "http://d1.web2.qq.com/proxy.html?v=20151105001&callback=1&id=2"

const GET_FRIEND_STATUS = "http://d1.web2.qq.com/channel/get_online_buddies2?vfwebqq={0}&clientid=53999199&psessionid={" +
                    "1}&t=0.1"
const GET_FRIEND_STATUS_REFERER = "http://d1.web2.qq.com/proxy.html?v=20151105001&callback=1&id=2"
const POLL_MESSAGE = "http://d1.web2.qq.com/channel/poll2"
const POLL_MESSAGE_REFERER = "http://d1.web2.qq.com/proxy.html?v=20151105001&callback=1&id=2"

// 客户端id，固定的
const CLIENT_ID = 53999199

export default class QQ {
    // 二维码令牌
    qrsig:string = ''
    // 鉴权参数
    ptwebqq:string = ''
    vfwebqq:string = ''
    psessionid:string = ''
    uin:number = 0
    // 请求头信息
    headers = {'User-Agent': USER_AGENT}

    constructor() {

    }
    
}