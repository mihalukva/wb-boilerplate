import * as vscode from 'vscode';
import * as path from 'path';
import { template, kebabCase } from 'lodash';
import {  loadFileToBuffer, createDir, writeFile, getWorkspaceDir } from '../../utils';

export const addRequest = async (selectedUri: vscode.Uri, extensionUri: vscode.Uri) => {
    const requestName = await vscode.window.showInputBox({ title: 'request name' }) || '';
    const requestMethod = await vscode.window.showInputBox({ title: 'method' }) || 'GET';
    const requestUrl = await vscode.window.showInputBox({ title: 'url' }) || '/';
    const props = { method: requestMethod.toUpperCase(), url: requestUrl };
    const templateFile = path.join(extensionUri.fsPath, 'templates', 'request', 'index.ts');
    const workspaceDir = await getWorkspaceDir(selectedUri);
    const workspaceRequestDir = path.join(workspaceDir, kebabCase(requestName));
    await createDir(workspaceRequestDir);
    const newFileName = path.join(workspaceRequestDir, requestMethod.toLowerCase() + '.ts');
    const fileText = loadFileToBuffer(templateFile);
    const compiled = template(fileText);
    const content = compiled(props);
    await writeFile(newFileName, content);
}