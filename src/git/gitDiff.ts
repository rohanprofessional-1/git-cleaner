import { exec } from 'child_process';
import * as util from 'util';
import * as vscode from 'vscode';
const execPromise = util.promisify(exec);

export async function getDiffBetweenCommits(from = 'HEAD~1', to = 'HEAD'): Promise<string> {
  try {
    const path = await getCurrentRepoPath();
    const { stdout } = await execPromise(`git diff ${from} ${to}`, { cwd: path });
    return stdout;
  } catch (err) {
    console.error('Failed to run git diff:', err);
    throw err;
  }
}
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
