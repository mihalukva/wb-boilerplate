import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { template, camelCase, upperFirst, kebabCase, snakeCase } from 'lodash';
import { addComponent } from './tml';
import { Buffer } from 'buffer';
import { fileListByDirectory, getProps, loadFileToBuffer, pascalCase, createDir, writeFile } from './utils';



export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "wb-boilerplate" is now active!');

	let addComponent = vscode.commands.registerCommand('wb-boilerplate.addComponent', async (uri: vscode.Uri) => {
		const { fsPath } = uri;
		const stat = await vscode.workspace.fs.stat(uri);
		if (stat.type === vscode.FileType.Directory) {

		}
		if (stat.type === vscode.FileType.File) {

		}
		const compName = await vscode.window.showInputBox({ title: 'component name' }) || '';
		const props = { name: pascalCase(compName), test: kebabCase(compName), style: camelCase(compName) };
		const templateDir = path.join(context.extensionUri.fsPath, 'templates', 'component');
		const templateFileList = fileListByDirectory(templateDir);
		const test = path.parse(path.normalize(fsPath))
		const { dir: workspaceDir } = path.parse(fsPath);
		const workspaceCompDir = path.join(workspaceDir, kebabCase(compName));
		await createDir(workspaceCompDir);
		for (let i = 0; i < templateFileList.length; i++) {
			const file = templateFileList[i];
			const { base: fileBase } = path.parse(file);
			const newFileName = path.join(workspaceCompDir, fileBase);
			const fileText = loadFileToBuffer(file);
			const compiled = template(fileText);
			const content = compiled(props);
			await writeFile(newFileName, content);
		}
	});

	context.subscriptions.push(addComponent);

	let addPage = vscode.commands.registerCommand('wb-boilerplate.addPage', async ({ fsPath }: vscode.Uri) => {
		const pageName = await vscode.window.showInputBox({ title: 'page name' }) || '';
		const pageTitle = await vscode.window.showInputBox({ title: 'page title' }) || '';
		const props = { name: kebabCase(pageName), path: kebabCase(pageName), title: pageTitle, node: snakeCase(pageName).toUpperCase() };
		const templateDir = path.join(context.extensionUri.fsPath, 'templates', 'page');
		const templateFileList = fileListByDirectory(templateDir);
		const { dir: workspaceDir } = path.parse(fsPath);
		const workspacePageDir = path.join(workspaceDir, kebabCase(pageName));
		await createDir(workspacePageDir);
		for (let i = 0; i < templateFileList.length; i++) {
			const file = templateFileList[i];
			const { base: fileBase } = path.parse(file);
			const newFileName = path.join(workspacePageDir, fileBase);
			const fileText = loadFileToBuffer(file);
			const compiled = template(fileText);
			const content = compiled(props);
			await writeFile(newFileName, content);
		}
	});

	context.subscriptions.push(addPage);

	let addRequest = vscode.commands.registerCommand('wb-boilerplate.addRequest', async ({ fsPath }: vscode.Uri) => {
		const requestName = await vscode.window.showInputBox({ title: 'request name' }) || '';
		const requestMethod = await vscode.window.showInputBox({ title: 'method' }) || 'GET';
		const requestUrl = await vscode.window.showInputBox({ title: 'url' }) || '/';
		const props = { method: requestMethod.toUpperCase(), url: requestUrl };
		const templateFile = path.join(context.extensionUri.fsPath, 'templates', 'request', 'index.ts');
		const { dir: workspaceDir } = path.parse(fsPath);
		const workspaceRequestDir = path.join(workspaceDir, kebabCase(requestName));
		await createDir(workspaceRequestDir);
		const newFileName = path.join(workspaceRequestDir, requestMethod.toLowerCase() + '.ts');
		const fileText = loadFileToBuffer(templateFile);
		const compiled = template(fileText);
		const content = compiled(props);
		await writeFile(newFileName, content);
	});

	context.subscriptions.push(addRequest);

	let addRedux = vscode.commands.registerCommand('wb-boilerplate.addRedux', async ({ fsPath }: vscode.Uri) => {
		const sliceName = await vscode.window.showInputBox({ title: 'slice name' }) || '';
		const props = { name: camelCase(sliceName), type: pascalCase(sliceName), constantName: snakeCase(sliceName).toUpperCase() };
		const templateDir = path.join(context.extensionUri.fsPath, 'templates', 'redux');
		const { dir: workspaceDir } = path.parse(fsPath);
		const workspaceReduxDir = path.join(workspaceDir, kebabCase(sliceName));

		const copyDirectory = (from: string, to: string) => {
			const dirent = fs.readdirSync(from, { withFileTypes: true });
			for (let i = 0; i < dirent.length; i++) {
				const direntItem = dirent[i];
				const filePath = path.join(from, direntItem.name);
				const newFilePath = path.join(to, direntItem.name);
				if (direntItem.isDirectory()) {
					createDir(newFilePath);
					copyDirectory(filePath, newFilePath);
				} else {
					const fileText = loadFileToBuffer(filePath);
					const compiled = template(fileText);
					const content = compiled(props);
					writeFile(newFilePath, content);
				}
			}

		};
		copyDirectory(templateDir, workspaceReduxDir);
	});

	context.subscriptions.push(addRedux);

	let addSaga = vscode.commands.registerCommand('wb-boilerplate.addSaga', async ({ fsPath }: vscode.Uri) => {
		const sagaName = await vscode.window.showInputBox({ title: 'saga name' }) || '';
		const props = { name: camelCase(sagaName) };
		const templateFile = path.join(context.extensionUri.fsPath, 'templates', 'saga', 'index.ts');
		const { dir: workspaceDir } = path.parse(fsPath);
		const workspaceRequestDir = path.join(workspaceDir, kebabCase(sagaName));
		await createDir(workspaceRequestDir);
		const newFileName = path.join(workspaceRequestDir, 'index.ts');
		const fileText = loadFileToBuffer(templateFile);
		const compiled = template(fileText);
		const content = compiled(props);
		await writeFile(newFileName, content);
	});

	context.subscriptions.push(addSaga);
}

export function deactivate() { }
