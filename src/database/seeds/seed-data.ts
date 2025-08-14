import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Problem } from '../../modules/problems/entities/problem.entity';
import { TestCase } from '../../modules/problems/entities/test-case.entity';
import { LearningSession } from '../../modules/learning-sessions/entities/learning-session.entity';
import { SessionProgress } from '../../modules/learning-sessions/entities/session-progress.entity';
import {
	ProblemDifficulty,
	ProblemCategory,
} from '../../common/enums/difficulty.enum';
import { ProgrammingLanguage } from '../../common/enums/language.enum';
import * as bcrypt from 'bcryptjs';

export class SeedData {
	static async run(dataSource: DataSource): Promise<void> {
		const userRepository = dataSource.getRepository(User);
		const problemRepository = dataSource.getRepository(Problem);
		const testCaseRepository = dataSource.getRepository(TestCase);

		// Create sample users
		const hashedPassword = await bcrypt.hash('password123', 10);

		const students = await userRepository.save([
			{
				email: 'alice@example.com',
				username: 'alice_student',
				password: hashedPassword,
				role: 'student',
				profile: {
					firstName: 'Alice',
					lastName: 'Johnson',
					bio: 'Computer Science student passionate about algorithms',
				},
				preferences: {
					theme: 'dark',
					fontSize: 14,
					preferredLanguage: ProgrammingLanguage.PYTHON,
				},
			},
			{
				email: 'bob@example.com',
				username: 'bob_coder',
				password: hashedPassword,
				role: 'student',
				profile: {
					firstName: 'Bob',
					lastName: 'Smith',
					bio: 'Learning to code one problem at a time',
				},
				preferences: {
					theme: 'light',
					fontSize: 16,
					preferredLanguage: ProgrammingLanguage.JAVASCRIPT,
				},
			},
		]);

		const instructors = await userRepository.save([
			{
				email: 'prof.wilson@example.com',
				username: 'prof_wilson',
				password: hashedPassword,
				role: 'instructor',
				profile: {
					firstName: 'Prof. Emily',
					lastName: 'Wilson',
					bio: 'Computer Science Professor with 10+ years of teaching experience',
				},
				preferences: {
					theme: 'light',
					fontSize: 14,
					preferredLanguage: ProgrammingLanguage.JAVA,
				},
			},
		]);

		// Create sample problems
		const problems = await problemRepository.save([
			{
				title: 'Two Sum',
				description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]`,
				difficulty: ProblemDifficulty.EASY,
				category: ProblemCategory.ARRAYS_HASHING,
				tags: ['array', 'hash-table'],
				initialCode: {
					[ProgrammingLanguage.PYTHON]: `def two_sum(nums, target):
    """
    Find two numbers in the array that add up to target
    
    Args:
        nums: List of integers
        target: Target sum
    
    Returns:
        List of two indices
    """
    # Your code here
    pass`,
					[ProgrammingLanguage.JAVASCRIPT]: `function twoSum(nums, target) {
    /**
     * Find two numbers in the array that add up to target
     * 
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target sum
     * @returns {number[]} Array of two indices
     */
    // Your code here
}`,
					[ProgrammingLanguage.JAVA]: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
				},
				solution: {
					[ProgrammingLanguage.PYTHON]: `def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
				},
				hints: [
					'Think about what you need to find for each number',
					"Can you use a hash table to store numbers you've seen?",
					'For each number, calculate what its complement would be',
				],
				timeLimit: 1000,
				memoryLimit: 128,
			},
			{
				title: 'Reverse String',
				description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.

Example 1:
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]

Example 2:
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]`,
				difficulty: ProblemDifficulty.EASY,
				category: ProblemCategory.TWO_POINTERS,
				tags: ['string', 'two-pointers'],
				initialCode: {
					[ProgrammingLanguage.PYTHON]: `def reverse_string(s):
    """
    Reverse the input array of characters in-place
    
    Args:
        s: List of characters
    """
    # Your code here
    pass`,
					[ProgrammingLanguage.JAVASCRIPT]: `function reverseString(s) {
    /**
     * Reverse the input array of characters in-place
     * 
     * @param {character[]} s - Array of characters
     */
    // Your code here
}`,
				},
				solution: {
					[ProgrammingLanguage.PYTHON]: `def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1`,
				},
				hints: [
					'Use two pointers, one at the start and one at the end',
					'Swap characters and move pointers towards each other',
					'Continue until the pointers meet in the middle',
				],
				timeLimit: 1000,
				memoryLimit: 128,
			},
			{
				title: 'Binary Tree Inorder Traversal',
				description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Follow up: Recursive solution is trivial, could you do it iteratively?`,
				difficulty: ProblemDifficulty.MEDIUM,
				category: ProblemCategory.TREES,
				tags: ['binary-tree', 'depth-first-search', 'stack'],
				initialCode: {
					[ProgrammingLanguage.PYTHON]: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """
    Return inorder traversal of binary tree
    
    Args:
        root: TreeNode - Root of binary tree
    
    Returns:
        List[int] - Inorder traversal values
    """
    # Your code here
    pass`,
				},
				solution: {
					[ProgrammingLanguage.PYTHON]: `def inorder_traversal(root):
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result`,
				},
				hints: [
					'Inorder traversal visits: left subtree, root, right subtree',
					'You can solve this recursively or iteratively with a stack',
					'For iterative solution, use a stack to simulate the call stack',
				],
				timeLimit: 1000,
				memoryLimit: 128,
			},
		]);

		// Create test cases for problems
		await testCaseRepository.save([
			// Two Sum test cases
			{
				problemId: problems[0].id,
				input: JSON.stringify({ nums: [2, 7, 11, 15], target: 9 }),
				expectedOutput: JSON.stringify([0, 1]),
				isHidden: false,
				weight: 1,
			},
			{
				problemId: problems[0].id,
				input: JSON.stringify({ nums: [3, 2, 4], target: 6 }),
				expectedOutput: JSON.stringify([1, 2]),
				isHidden: false,
				weight: 1,
			},
			{
				problemId: problems[0].id,
				input: JSON.stringify({ nums: [3, 3], target: 6 }),
				expectedOutput: JSON.stringify([0, 1]),
				isHidden: true,
				weight: 1,
			},
			// Reverse String test cases
			{
				problemId: problems[1].id,
				input: JSON.stringify({ s: ['h', 'e', 'l', 'l', 'o'] }),
				expectedOutput: JSON.stringify(['o', 'l', 'l', 'e', 'h']),
				isHidden: false,
				weight: 1,
			},
			{
				problemId: problems[1].id,
				input: JSON.stringify({ s: ['H', 'a', 'n', 'n', 'a', 'h'] }),
				expectedOutput: JSON.stringify(['h', 'a', 'n', 'n', 'a', 'H']),
				isHidden: false,
				weight: 1,
			},
			// Binary Tree test cases
			{
				problemId: problems[2].id,
				input: JSON.stringify({ root: [1, null, 2, 3] }),
				expectedOutput: JSON.stringify([1, 3, 2]),
				isHidden: false,
				weight: 1,
			},
			{
				problemId: problems[2].id,
				input: JSON.stringify({ root: [] }),
				expectedOutput: JSON.stringify([]),
				isHidden: false,
				weight: 1,
			},
		]);

		console.log('✅ Seed data created successfully!');
		console.log(`📊 Created ${students.length + instructors.length} users`);
		console.log(`🧩 Created ${problems.length} problems`);
		console.log('🌱 Database seeded with sample data');
	}
}
