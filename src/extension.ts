import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { template, camelCase, upperFirst, kebabCase, snakeCase } from 'lodash';
import { addComponent } from './tml';
import { Buffer } from 'buffer';
import { fileListByDirectory, getProps, loadFileToBuffer, pascalCase } from './utils';
/* const templateDir='d:\\wb\\vscode-wb-extension\\wb-boilerplate\\templates\\add-component'
const fileList = fileListByDirectory(templateDir);
console.log(fileList); */

const createDir = async (dirName: string) => {
	const dirUri = vscode.Uri.file(dirName);
	return await vscode.workspace.fs.createDirectory(dirUri);
}

const writeFile = async (fileName: string, content: string) => {
	const buffer = Buffer.from(content);
	const uint8Array = new Uint8Array(buffer);
	const componentFile = vscode.Uri.file(fileName);
	return await vscode.workspace.fs.writeFile(componentFile, uint8Array);
}


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
		const workspaceCompDir = path.join(workspaceDir, kebabCase(pageName));
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

	context.subscriptions.push(addPage);
}

export function deactivate() { }

/* 
const text2 = `import React, { memo } from 'react';
import styles from './index.module.scss';

type Props = {
};

export const <% name1 %> = memo(({ }: Props) => {
  return (
	<div className={styles.root}>

	</div>
  );
});`

const result = text.replace(regEx, 'TEst')

console.log(result)

	/* 	console.log(context)
		console.log(vscode.workspace.workspaceFolders)
		console.log(vscode.workspace.workspaceFile)
	
		vscode.workspace.fs.readDirectory(context.extensionUri).then(data=>{console.log(data)}) */




/* vscode.window.showInformationMessage('Hello World from WB boilerplate!2'); */

/* const { dir } = path.parse(fsPath);
const compName = await vscode.window.showInputBox({ title: 'file name' }) || '';
const compDir = dir+'/'+kebabCase(compName);
const compFile=compDir+'/'+addComponent.component.name;
const stylesFile=compDir+'/'+addComponent.styles.name;
const compContent=addComponent.component.getContent(pascalCase(compName));
const stylesContent=addComponent.styles.content;

await createDir(compDir);
await writeFile(compFile,compContent);
await writeFile(stylesFile,stylesContent); */

/* const compName = await vscode.window.showInputBox({ title: 'file name' }) || ''; */
/* const compFileList=await vscode.workspace.fs.readDirectory(vscode.Uri.from({path:templateDir})) */
/* 		const props: Record<string, string> = {};
		fileList.forEach(file => {
			const fileText = loadFileToBuffer(file);
			const list = getProps(fileText);
			list.forEach(item => { props[item] = ''; });
		});
		const propsList = Object.keys(props)
		for (let i = 0; i < propsList.length; i++) {
			const prop = propsList[i];
			props[prop] = await vscode.window.showInputBox({ title: prop }) || '';
		} 
				console.log(propsList)
		*/