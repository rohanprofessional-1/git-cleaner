import { getCurrentRepoPath } from './gitOps';
import simpleGit, { SimpleGit } from 'simple-git';

let git: SimpleGit | undefined;
let repoPath: string | undefined;

export async function initGitClient() {
    repoPath = await getCurrentRepoPath();
    git = simpleGit(repoPath);
}

export async function getDiffBetweenCommits(from = 'HEAD~1', to = 'HEAD'): Promise<string> {
  if (!git) {
    throw new Error('Git client not initialized');
  }
  try {
      const diff = await git.diff([from, to]);
      console.log(diff);
    return diff;
  } catch (err) {
    console.error('Failed to run git diff:', err);
    throw err;
  }
}

export async function stashCommits() {

}

