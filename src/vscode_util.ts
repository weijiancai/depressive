'use strict'
import * as vscode from 'vscode';

export class VsCodeUtil {
    static installExtension(element) {
        // 没有安装扩展
        if (!vscode.extensions.getExtension(element)) {
            console.log("安装插件：" + element)
            const { spawn } = require('child_process');
            const code = spawn('code', ['--install-extension', element]);

            code.stdout.on('data', (data) => {
                // console.log(`stdout: ${data}`);
                
                console.log('data = ' + `${data}`);
            })

            code.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            code.on('close', (code) => {
                console.log(`child process [code] exited with code ${code}`);
            })
        }
    }

    static reloadWindow() {
        vscode.commands.executeCommand('workbench.action.reloadWindow').then((success) => {
            console.log('重新加载窗口成功：' + success);
        }, (reason) => {
            console.log('重新加载窗口失败：' + reason);
        })
    }

    static gitClone(url:string, targetDir:string) {
        console.log("克隆项目" + url)
        const { spawn } = require('child_process');
        const git = spawn('git', ['clone', url, targetDir]);

        git.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        })

        git.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        git.on('close', (code) => {
            console.log(`child process [code] exited with code ${code}`);
        })
    }
}