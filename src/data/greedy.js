export const greedyPatterns = [
  {
    title: 'Interval Scheduling',
    tc: 'O(n log n)', sc: 'O(1)',
    concept: `<p>Sort intervals by <strong>end time</strong>. Greedily pick the earliest-finishing non-overlapping interval. Maximizes number of non-overlapping intervals.</p>`,
    recognition: `<ul><li><strong>"maximum non-overlapping intervals"</strong></li><li><strong>"minimum meeting rooms"</strong></li>
<li><strong>"minimum removals to make non-overlapping"</strong></li></ul>`,
    code: {
      cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
        return a[1] < b[1];
    });
    int count = 0, end = INT_MIN;
    for (auto& iv : intervals) {
        if (iv[0] >= end) end = iv[1];
        else count++;
    }
    return count;
}`,
      python: `def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count, end = 0, float('-inf')
    for s, e in intervals:
        if s >= end: end = e
        else: count += 1
    return count`,
      java: `int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a,b) -> a[1] - b[1]);
    int count = 0, end = Integer.MIN_VALUE;
    for (int[] iv : intervals) {
        if (iv[0] >= end) end = iv[1];
        else count++;
    }
    return count;
}`
    },
    problems: [
      { name: 'Non-overlapping Intervals', diff: 'Medium', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
      { name: 'Meeting Rooms', diff: 'Easy', url: 'https://leetcode.com/problems/meeting-rooms/' },
      { name: 'Minimum Number of Arrows', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
    ]
  },
  {
    title: 'Greedy Strategies',
    tc: 'Varies', sc: 'Varies',
    concept: `<p>Make the <strong>locally optimal choice</strong> at each step hoping to reach global optimum. Works when problem has <em>greedy choice property</em> and <em>optimal substructure</em>.</p>`,
    recognition: `<ul><li><strong>"jump game"</strong> → Track farthest reachable</li>
<li><strong>"gas station"</strong> → Track running deficit</li>
<li><strong>"assign cookies"</strong> → Sort both, match greedily</li></ul>`,
    code: {
      cpp: `// Jump Game — can you reach the end?
bool canJump(vector<int>& nums) {
    int farthest = 0;
    for (int i = 0; i <= farthest && i < nums.size(); i++)
        farthest = max(farthest, i + nums[i]);
    return farthest >= nums.size() - 1;
}`,
      python: `def canJump(nums):
    farthest = 0
    for i in range(len(nums)):
        if i > farthest: return False
        farthest = max(farthest, i + nums[i])
    return True`,
      java: `boolean canJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i <= farthest && i < nums.length; i++)
        farthest = Math.max(farthest, i + nums[i]);
    return farthest >= nums.length - 1;
}`
    },
    problems: [
      { name: 'Jump Game', diff: 'Medium', url: 'https://leetcode.com/problems/jump-game/' },
      { name: 'Jump Game II', diff: 'Medium', url: 'https://leetcode.com/problems/jump-game-ii/' },
      { name: 'Gas Station', diff: 'Medium', url: 'https://leetcode.com/problems/gas-station/' },
      { name: 'Task Scheduler', diff: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/' },
    ]
  },
];
