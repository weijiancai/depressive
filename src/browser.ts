'use strict';

import * as vscode from 'vscode';

export default class Provider implements vscode.TextDocumentContentProvider {
    static scheme = 'http';

    provideTextDocumentContent(uri: vscode.Uri):string {
        console.log(uri);
        return `
                <style>
                    body, iframe {
                        width: 100%;
                        height: 100%;
                    }
                    body {
                        background-color: red;
                    }
                </style>
				<body>
                    <div style="width:100%;height:1000px;background-color:green;">
					<iframe src="http://www.baidu.com/"/>
                    </div>
				</body>`;
    }
}