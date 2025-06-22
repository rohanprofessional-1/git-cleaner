import { getCurrentRepoPath } from './gitOps';
import * as ops from './gitOps';

export async function getDiffBetweenCommits(from = 'HEAD~1', to = 'HEAD'): Promise<string> {
    try {
        if (await ops.isWorkingTreeClean()) {
            console.log('Working tree is clean, no changes to diff.');
            return '';
        }
        if (!from || !to) {
            throw new Error('Invalid commit references provided for diff.');
        }
        const diff = await ops.getGitClient().diff([from, to]);
        console.log(diff);
        return diff;
    } catch (err) {
        console.error('Failed to run git diff:', err);
        throw err;
    }
}

