import * as vscode from 'vscode';
import * as path from 'path';
import { template, kebabCase, snakeCase } from 'lodash';
import { fileListByDirectory, loadFileToBuffer, createDir, writeFile, getWorkspaceDir } from '../../utils';

export const addPage = async (selectedUri: vscode.Uri, extensionUri: vscode.Uri) => {
    const pageName = await vscode.window.showInputBox({ title: 'page name' }) || '';
    const pageTitle = await vscode.window.showInputBox({ title: 'page title' }) || '';
    const props = { name: kebabCase(pageName), path: kebabCase(pageName), title: pageTitle, node: snakeCase(pageName).toUpperCase() };
    const templateDir = path.join(extensionUri.fsPath, 'templates', 'page');
    const templateFileList = fileListByDirectory(templateDir);
    const workspaceDir = await getWorkspaceDir(selectedUri);
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
}