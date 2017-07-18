'use strict'
import * as vscode from 'vscode';
import path = require('path');
import fs = require('fs');
import request = require('request')
import { VsCodeUtil } from './vscode_util'
import os = require('os')

export default class Repertory {
    // 资料库目录
    static repertoryDir = path.join(os.homedir(), 'repertory');
    // 软件目录
    softwareDir = path.join(Repertory.repertoryDir, 'software');
    // 文章目录
    articleDir = path.join(Repertory.repertoryDir, 'article');
    // 书籍目录
    bookDir = path.join(Repertory.repertoryDir, 'book');
    // 项目目录
    projectDir = path.join(Repertory.repertoryDir, 'project');


    init() {
        console.log('init......')
        let self = this;
        
        if(!fs.existsSync(Repertory.repertoryDir)) {
            console.log('make dir : ', Repertory.repertoryDir);
            fs.mkdir(Repertory.repertoryDir);
        }
       
        // 检查是否有repertory.json
        let host = vscode.workspace.getConfiguration().host;
        // 获得资料库配置
        request(host, function (error, response, body) {
            let repertoryPath = path.join(Repertory.repertoryDir, 'repertory.json');
            // 不存在，下载
            if (!fs.existsSync(repertoryPath)) {
                fs.createWriteStream(repertoryPath).write(body)
            }

            if(!body) {
                body = fs.readFileSync(repertoryPath);
            }

            let repertory = JSON.parse(body);
            self.init_vs_extentions(repertory);
            self.init_project(repertory['project']);
            self.init_article(repertory['article'])
        });

        let config = vscode.workspace.getConfiguration();
        console.log(vscode.extensions.all[0].id);
        for (let i = 0; i < vscode.extensions.all.length; i++) {
            console.log(vscode.extensions.all[i].id);
        }
        console.log('init end')
    }

    init_vs_extentions(repertory) {
        let plugins = repertory['vscode_plugins'];
        plugins.forEach(element => {
            // 没有安装扩展
            VsCodeUtil.installExtension(element);
        });
    }

    // 初始化项目
    init_project(project) {
        if(!fs.existsSync(this.projectDir)) {
            console.log('make dir : ', this.projectDir);
            fs.mkdir(this.projectDir);
        }

        for(let key in project) {
            // 创建目录
            let dir = path.join(this.projectDir, key);
            if(!fs.existsSync(dir)) {
                console.log('make dir : ', dir);
                fs.mkdir(dir);
            }

            project[key].forEach(element => {
                // clone git project
                if(element['vcs'] == 'git' && element['vcs_url'] && !fs.existsSync(path.join(dir, element['name']))) {
                    VsCodeUtil.gitClone(element['vcs_url'], path.join(dir, element['name']));
                }
            });
        }
    }

    // 初始化文章
    init_article(article) {
        if(!fs.existsSync(this.articleDir)) {
            console.log('make dir : ', this.articleDir);
            fs.mkdir(this.articleDir);
        }
    }
}