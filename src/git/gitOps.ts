import * as vscode from 'vscode';
import simpleGit, { SimpleGit } from 'simple-git';

let git: SimpleGit | undefined;
let repoPath: string | undefined;

export function getGitClient(): SimpleGit {
    if (!git) {
        throw new Error('Git client is not initialized. Call initGitClient() first.');
    }
    return git;
}

export async function initGitClient() {
    repoPath = await getCurrentRepoPath();
    git = simpleGit(repoPath);
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

export async function isWorkingTreeClean(): Promise<boolean> {
    try {
        const status = await getGitClient().status();
        return status.isClean();
    } catch (err) {
        console.error('Failed to check if working tree is clean:', err);
        throw err;
    }
}

export async function stashCommits() {
    try {
        await getGitClient().stash();
    } catch (err) {

        console.error('Failed to stash changes:', err);
        throw err;
    }
}