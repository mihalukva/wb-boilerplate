import * as fs from 'fs';
import * as path from 'path';
import { template, camelCase, upperFirst, kebabCase } from 'lodash';

export const pascalCase = (text: string) => upperFirst(camelCase(text));

export function fileListByDirectory(dirName: string) {
    let fileList: Array<string> = [];
    const dirent = fs.readdirSync(dirName, { withFileTypes: true });
    dirent.forEach((direntItem) => {
        const filePath=path.join(dirName,direntItem.name);
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
	const match =text.match(regEx) || [];
	const trimmedMatch=match.map(item=>item.trim());
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