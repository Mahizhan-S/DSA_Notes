export const bitPatterns = [
  {
    title: 'XOR Tricks',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>XOR properties:</strong> a^a=0, a^0=a, commutative, associative. XOR all elements to find the "odd one out".</p>`,
    recognition: `<ul><li><strong>"single number"</strong> (one element appears once, rest twice)</li>
<li><strong>"missing number"</strong> → XOR [0..n] with array</li></ul>`,
    code: {
      cpp: `int singleNumber(vector<int>& nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}
// Check power of 2: n > 0 && (n & (n-1)) == 0
// Count set bits: __builtin_popcount(n)
// Lowest set bit: n & (-n)`,
      python: `def singleNumber(nums):
    res = 0
    for x in nums: res ^= x
    return res
# Power of 2: n > 0 and (n & (n-1)) == 0
# Count bits: bin(n).count('1')`,
      java: `int singleNumber(int[] nums) {
    int res = 0;
    for (int x : nums) res ^= x;
    return res;
}
// Integer.bitCount(n), Integer.highestOneBit(n)`
    },
    problems: [
      { name: 'Single Number', diff: 'Easy', url: 'https://leetcode.com/problems/single-number/' },
      { name: 'Missing Number', diff: 'Easy', url: 'https://leetcode.com/problems/missing-number/' },
      { name: 'Counting Bits', diff: 'Easy', url: 'https://leetcode.com/problems/counting-bits/' },
      { name: 'Single Number II', diff: 'Medium', url: 'https://leetcode.com/problems/single-number-ii/' },
      { name: 'Single Number III', diff: 'Medium', url: 'https://leetcode.com/problems/single-number-iii/' },
    ]
  },
];
