import * as vscode from 'vscode';
import * as path from 'path';
import { template, kebabCase, camelCase } from 'lodash';
import {  loadFileToBuffer, createDir, writeFile, getWorkspaceDir } from '../../utils';

export const addSaga = async (selectedUri: vscode.Uri, extensionUri: vscode.Uri) => {
    const sagaName = await vscode.window.showInputBox({ title: 'saga name' }) || '';
    const props = { name: camelCase(sagaName) };
    const templateFile = path.join(extensionUri.fsPath, 'templates', 'saga', 'index.ts');
    const workspaceDir = await getWorkspaceDir(selectedUri);
    const workspaceRequestDir = path.join(workspaceDir, kebabCase(sagaName));
    await createDir(workspaceRequestDir);
    const newFileName = path.join(workspaceRequestDir, 'index.ts');
    const fileText = loadFileToBuffer(templateFile);
    const compiled = template(fileText);
    const content = compiled(props);
    await writeFile(newFileName, content);
}