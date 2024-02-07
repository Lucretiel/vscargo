// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscargo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand(
		"vscargo.helloWorld",
		() => {
			const panel = vscode.window.createWebviewPanel(
				"hello-world",
				"Hello World Panel",
				vscode.ViewColumn.One,
				{},
			);

			const indexPath = vscode.Uri.file(
				path.join(context.extensionPath, "src", "index.html"),
			).with({ scheme: "vscode-resource" });

			fs.readFile(indexPath.fsPath, "utf8").then((index) => {
				panel.webview.html = index;
			});
		},
	);

	context.subscriptions.push(disposable);
};

// This method is called when your extension is deactivated
export const deactivate = () => {};
