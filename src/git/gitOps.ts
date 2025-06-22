import * as vscode from 'vscode';

export async function getCurrentRepoPath(): Promise<string | undefined> {
    const git = await getGitApi();
    return git.repositories[0].rootUri.fsPath;
}
  
async function getGitApi() { // gets current git repo
    const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
    if (!gitExtension) {
      vscode.window.showErrorMessage('Git extension not found');
      return;
    }
    const git = gitExtension.getAPI(1);
    return git;
}