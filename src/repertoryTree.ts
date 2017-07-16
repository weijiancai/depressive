import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import Repertory from './repertory';

export default class RepertoryTreeProvider implements vscode.TreeDataProvider<RepertoryItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<RepertoryItem | undefined> = new vscode.EventEmitter<RepertoryItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<RepertoryItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private rootPath?: string) {
		if(!rootPath) {
			rootPath = Repertory.repertoryDir;
		}
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: RepertoryItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: RepertoryItem): Thenable<RepertoryItem[]> {
		console.log(element);
		return new Promise((resolve, e) => {
			let items = [];
			if(element) {
				let parent = element.parent + path.sep + element.label;
				fs.readdirSync(parent).forEach(function(fileName) {
					let filePath = parent + path.sep + fileName;
					let isDir = fs.lstatSync(filePath).isDirectory();
					items.push(new RepertoryItem(fileName, isDir ? 1 : 0, parent));
				});
			} else {
				fs.readdirSync(Repertory.repertoryDir).forEach(function(fileName) {
					let filePath = Repertory.repertoryDir + path.sep + fileName;
					let isDir = fs.lstatSync(filePath).isDirectory();
					items.push(new RepertoryItem(fileName, isDir ? 1 : 0, Repertory.repertoryDir));
				});
			}
			
			
			return resolve(items);
		})
	}
}

class RepertoryItem extends vscode.TreeItem {
    constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly parent?: string
	) {
		super(label, collapsibleState);
		this.command = this.collapsibleState == 1 ? void 0 : {
			command: 'openRepertoryFile',
			arguments: [this.parent + path.sep + this.label],
				title: '打开文件'
		};
		this.iconPath = {
				light: this.collapsibleState == 1 ? path.join(__filename, '..', '..', '..', 'resources', 'light', 'folder.svg') : path.join(__filename, '..', '..', '..', 'resources', 'light', 'document.svg'),
				dark: this.collapsibleState == 1 ? path.join(__filename, '..', '..', '..', 'resources', 'dark', 'folder.svg') : path.join(__filename, '..', '..', '..', 'resources', 'dark', 'document.svg')
			}
	}
}