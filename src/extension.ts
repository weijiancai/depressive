'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import BrowserContentProvider from './browser'
import Repertory from './repertory'
import {RepertoryTreeProvider, RepertoryItem} from './repertoryTree'
import path = require('path');
import fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const browserContentProvider = new BrowserContentProvider();
    let browserRegister = vscode.workspace.registerTextDocumentContentProvider(BrowserContentProvider.scheme, browserContentProvider);
    let repertory = new Repertory();

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "depressive" is now active!');
    repertory.init();

    const repertoryTreeProvider = new RepertoryTreeProvider();
    vscode.window.registerTreeDataProvider('repertory', repertoryTreeProvider);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.browser', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        // vscode.window.showInformationMessage('Hello World!');
        // let uri = vscode.Uri.parse('file:///home/wei_jc/桌面/test.html');
        vscode.commands.executeCommand('vscode.previewHtml', 'http://www.baidu.com', vscode.ViewColumn.Two, '百度');
        // return vscode.commands.executeCommand('vscode.previewHtml', vscode.Uri.parse('http://www.baidu.com'), vscode.ViewColumn.Two, 'Browser Preview').then((success) => {
		// }, (reason) => {
		// 	vscode.window.showErrorMessage(reason);
		// });
    });

    // 选择资料库文件
    let cmdSelectRepertoryFile = vscode.commands.registerCommand('extension.selectRepertoryFile', (item:RepertoryItem, isDir:boolean) => {
        repertoryTreeProvider.selectedItem = item;
        if(item.isDir()) {
            return;
        }
        let path = 'file:///' + item.getPath().replace(/\\/g, '/');
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(path));
    });
    // 新建资料库文件
    vscode.commands.registerCommand('extension.NewRepertoryFile', () => {
        let item = repertoryTreeProvider.selectedItem;
        if(!item) {
            vscode.window.showErrorMessage('请选中资料库文件！');
            return;
        }
        let path = item.getPath();
        vscode.window.showInputBox({value: path, valueSelection: [path.length, path.length]}).then((value) => {
            fs.createWriteStream(value);

            let path = 'file:///' + value.replace(/\\/g, '/');
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(path));
            repertoryTreeProvider.refresh(); // 刷新
        });
    });
    // 删除资料库文件
    vscode.commands.registerCommand('extension.DelRepertoryFile', () => {
        let item = repertoryTreeProvider.selectedItem;
        if(!item) {
            vscode.window.showErrorMessage('请选中资料库文件！');
            return;
        }
        let path = item.getPath();
        fs.unlinkSync(path);
        repertoryTreeProvider.refresh(); // 刷新
        vscode.window.showInformationMessage('删除文件成功：' + path);
    });

    context.subscriptions.push(disposable, browserRegister, cmdSelectRepertoryFile);
}

// this method is called when your extension is deactivated
export function deactivate() {
}