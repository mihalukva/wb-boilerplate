import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { template, snakeCase, camelCase } from 'lodash';
import { loadFileToBuffer, createDir, writeFile, getWorkspaceDir, pascalCase } from '../../utils';

export const addRedux = async (selectedUri: vscode.Uri, extensionUri: vscode.Uri) => {
    const sliceName = await vscode.window.showInputBox({ title: 'slice name' }) || '';
    const props = { name: camelCase(sliceName), type: pascalCase(sliceName), constantName: snakeCase(sliceName).toUpperCase() };
    const templateDir = path.join(extensionUri.fsPath, 'templates', 'redux');
    const workspaceDir = await getWorkspaceDir(selectedUri);
    const workspaceReduxDir = path.join(workspaceDir, 'redux');

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
}