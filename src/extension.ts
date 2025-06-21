// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-cleaner" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('git-cleaner.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from git-cleaner!');

	});
	printCurrentBranch();

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }


async function getGitApi() { //gets current git repo
	const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
	if (!gitExtension) {
	  vscode.window.showErrorMessage('Git extension not found');
	  return;
	}
	const git = gitExtension.getAPI(1);
	return git;
}

async function printCurrentBranch() {
	const git = await getGitApi();
	if (!git) return;
  
	const repo = git.repositories[0];
	if (!repo) {
	  vscode.window.showInformationMessage('No git repository found');
	  return;
	}
  
	vscode.window.showInformationMessage(`Current branch is ${repo.state.HEAD?.name}`);
}