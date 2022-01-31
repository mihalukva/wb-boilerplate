import * as vscode from 'vscode';
import * as path from 'path';
import { template, kebabCase } from 'lodash';
import { fileListByDirectory, loadFileToBuffer, pascalCase, createDir, writeFile, getWorkspaceDir } from '../../utils';

export const addComponent = async (selectedUri: vscode.Uri, extensionUri: vscode.Uri) => {
    const compName = await vscode.window.showInputBox({ title: 'component name' }) || '';
    const props = { name: pascalCase(compName) };
    const templateDir = path.join(extensionUri.fsPath, 'templates', 'component');
    const templateFileList = fileListByDirectory(templateDir);
    const workspaceDir = await getWorkspaceDir(selectedUri);

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
}