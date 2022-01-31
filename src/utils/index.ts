import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { camelCase, upperFirst } from 'lodash';

export const pascalCase = (text: string) => upperFirst(camelCase(text));

export function fileListByDirectory(dirName: string) {
    let fileList: Array<string> = [];
    const dirent = fs.readdirSync(dirName, { withFileTypes: true });
    dirent.forEach((direntItem) => {
        const filePath = path.join(dirName, direntItem.name);
        if (direntItem.isDirectory()) {
            const subDirList = fileListByDirectory(filePath);
            fileList.push(...subDirList);
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

export function loadFileToBuffer(fileName: string): string {
    return fs.readFileSync(fileName, { encoding: "utf-8" });
}

export const getProps = (text: string) => {
    const regEx = /(?<=<%).+?(?=%>)/gims
    const match = text.match(regEx) || [];
    const trimmedMatch = match.map(item => item.trim());
    return trimmedMatch;
}

export const replaceProps = (text: string, replaceList: Record<string, string>) => {
    const match = getProps(text);
    let replacedText = text;
    match.forEach(item => {
        const reg = new RegExp(`/<%.+${item}.+?%>/gims`);
        replacedText = replacedText.replace(reg, replaceList[item]);
    });
    return replacedText;
}

export const createDir = async (dirName: string) => {
    const dirUri = vscode.Uri.file(dirName);
    return await vscode.workspace.fs.createDirectory(dirUri);
}

export const writeFile = async (fileName: string, content: string) => {
    const buffer = Buffer.from(content);
    const uint8Array = new Uint8Array(buffer);
    const componentFile = vscode.Uri.file(fileName);
    return await vscode.workspace.fs.writeFile(componentFile, uint8Array);
}

export const getWorkspaceDir = async (uri: vscode.Uri) => {
    const { fsPath } = uri;
    const stat = await vscode.workspace.fs.stat(uri);
    const isFile = stat.type === vscode.FileType.File;
    const workspaceDir = isFile ? path.parse(fsPath).dir : fsPath;
    return workspaceDir;
}