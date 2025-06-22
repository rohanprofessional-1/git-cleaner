import { exec } from 'child_process';
import * as util from 'util';
import { getCurrentRepoPath } from './gitOps';
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

export async function stashCommits() {
    
}

