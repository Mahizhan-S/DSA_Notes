export const binarySearchPatterns = [
  {
    title: 'Binary Search Basics',
    tc: 'O(log n)', sc: 'O(1)',
    concept: `<p><strong>Binary Search</strong> repeatedly halves the search space on a sorted/monotonic structure. Three variants matter most:</p>
<ul><li><strong>Exact match:</strong> find target</li>
<li><strong>Lower bound:</strong> first element ≥ target</li>
<li><strong>Upper bound:</strong> first element > target</li></ul>`,
    recognition: `<ul><li>Sorted array + search → Binary Search</li>
<li><strong>"find first/last position"</strong> → Lower/Upper bound</li>
<li><strong>"search in rotated sorted array"</strong></li>
<li><strong>"minimum/maximum that satisfies condition"</strong> → Binary Search on Answer</li></ul>`,
    code: {
      cpp: `// Standard binary search
int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}

// Lower bound (first >= target)
int lo = 0, hi = n;
while (lo < hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
}
return lo;

// Binary Search on Answer
int lo = minAns, hi = maxAns, ans = -1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (isValid(mid)) { ans = mid; hi = mid - 1; } // minimize
    else lo = mid + 1;
}`,
      python: `# Standard
lo, hi = 0, n - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if arr[mid] == target: return mid
    elif arr[mid] < target: lo = mid + 1
    else: hi = mid - 1

# Lower bound
lo, hi = 0, n
while lo < hi:
    mid = (lo + hi) // 2
    if arr[mid] < target: lo = mid + 1
    else: hi = mid
return lo

# Binary search on answer
lo, hi, ans = min_ans, max_ans, -1
while lo <= hi:
    mid = (lo + hi) // 2
    if is_valid(mid):
        ans = mid; hi = mid - 1
    else: lo = mid + 1`,
      java: `int lo = 0, hi = n - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}`
    },
    mistakes: `<ul><li>Integer overflow: use <em>lo + (hi - lo) / 2</em> instead of <em>(lo + hi) / 2</em></li>
<li>Infinite loops: ensure search space shrinks every iteration</li>
<li>Off-by-one in lo < hi vs lo <= hi — know which template you're using</li></ul>`,
    tips: `<ul><li>🧠 <strong>lo <= hi</strong> for exact search, <strong>lo < hi</strong> for bound search</li>
<li>Binary Search on Answer: if you can verify answer in O(n), search the answer space in O(log(range))</li></ul>`,
    problems: [
      { name: 'Binary Search', diff: 'Easy', url: 'https://leetcode.com/problems/binary-search/' },
      { name: 'First Bad Version', diff: 'Easy', url: 'https://leetcode.com/problems/first-bad-version/' },
      { name: 'Search in Rotated Sorted Array', diff: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { name: 'Find Peak Element', diff: 'Medium', url: 'https://leetcode.com/problems/find-peak-element/' },
      { name: 'Koko Eating Bananas', diff: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/' },
      { name: 'Median of Two Sorted Arrays', diff: 'Hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
      { name: 'Split Array Largest Sum', diff: 'Hard', url: 'https://leetcode.com/problems/split-array-largest-sum/' },
    ]
  },
];
