import { exec } from 'child_process';
import * as util from 'util';
const execPromise = util.promisify(exec);

export async function getDiffBetweenCommits(repoPath: string, from = 'HEAD~1', to = 'HEAD'): Promise<string> {
  try {
    const { stdout } = await execPromise(`git diff ${from} ${to}`, { cwd: repoPath });
    return stdout;
  } catch (err) {
    console.error('Failed to run git diff:', err);
    throw err;
  }
}
