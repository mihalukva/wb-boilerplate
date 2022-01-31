import * as vscode from 'vscode';
import { addComponent, addPage, addRedux, addRequest, addSaga } from './commands';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "wb-boilerplate" is now active!');

	let addComponentDisposal = vscode.commands.registerCommand('wb-boilerplate.addComponent',
		async (uri: vscode.Uri) => { addComponent(uri, context.extensionUri) });

	let addPageDisposal = vscode.commands.registerCommand('wb-boilerplate.addPage',
		async (uri: vscode.Uri) => { addPage(uri, context.extensionUri) });

	let addRequestDisposal = vscode.commands.registerCommand('wb-boilerplate.addRequest',
		async (uri: vscode.Uri) => { addRequest(uri, context.extensionUri) });

	let addReduxDisposal = vscode.commands.registerCommand('wb-boilerplate.addRedux',
		async (uri: vscode.Uri) => { addRedux(uri, context.extensionUri) });

	let addSagaDisposal = vscode.commands.registerCommand('wb-boilerplate.addSaga',
		async (uri: vscode.Uri) => { addSaga(uri, context.extensionUri) });

	context.subscriptions.push(addComponentDisposal, addPageDisposal, addRequestDisposal, addReduxDisposal, addSagaDisposal);
}

export function deactivate() { }
