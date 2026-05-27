export const arrayPatterns = [
  {
    title: 'Prefix Sum',
    tc: 'O(n) build, O(1) query',
    sc: 'O(n)',
    concept: `<p><strong>Prefix Sum</strong> precomputes cumulative sums so any subarray sum can be answered in O(1).</p>
<p><em>prefix[i] = arr[0] + arr[1] + ... + arr[i-1]</em></p>
<p>Sum of subarray [l, r] = prefix[r+1] - prefix[l]</p>`,
    recognition: `<ul>
<li><strong>"sum of subarray"</strong> → Prefix Sum</li>
<li><strong>"subarray sum equals K"</strong> → Prefix Sum + HashMap</li>
<li><strong>"count subarrays with sum"</strong> → Prefix Sum + HashMap</li>
<li>Any range-sum query on a static array</li></ul>`,
    approaches: `<h4>Brute Force — O(n²)</h4><p>For every (l, r) pair, compute sum by iterating.</p>
<h4>Optimal — O(n)</h4><p>Build prefix array in one pass. Answer queries in O(1) using prefix[r+1] - prefix[l].</p>`,
    code: {
      cpp: `// Build prefix sum
vector<int> prefix(n + 1, 0);
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Query sum of [l, r]
int rangeSum = prefix[r + 1] - prefix[l];

// Subarray sum equals K (using hashmap)
int count = 0, sum = 0;
unordered_map<int,int> mp;
mp[0] = 1;
for (int x : arr) {
    sum += x;
    if (mp.count(sum - k)) count += mp[sum - k];
    mp[sum]++;
}`,
      python: `# Build prefix sum
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + arr[i]

# Query sum of [l, r]
range_sum = prefix[r + 1] - prefix[l]

# Subarray sum equals K
count = curr_sum = 0
mp = {0: 1}
for x in arr:
    curr_sum += x
    count += mp.get(curr_sum - k, 0)
    mp[curr_sum] = mp.get(curr_sum, 0) + 1`,
      java: `// Build prefix sum
int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++)
    prefix[i + 1] = prefix[i] + arr[i];

// Query sum of [l, r]
int rangeSum = prefix[r + 1] - prefix[l];

// Subarray sum equals K
int count = 0, sum = 0;
Map<Integer,Integer> mp = new HashMap<>();
mp.put(0, 1);
for (int x : arr) {
    sum += x;
    count += mp.getOrDefault(sum - k, 0);
    mp.merge(sum, 1, Integer::sum);
}`
    },
    dryRun: `<p><strong>arr = [1, 2, 3, 4, 5], query [1,3]</strong></p>
<table class="dry-run-table"><tr><th>i</th><th>prefix[i]</th></tr>
<tr><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td></tr><tr><td>2</td><td>3</td></tr>
<tr><td>3</td><td>6</td></tr><tr><td>4</td><td>10</td></tr><tr><td>5</td><td>15</td></tr></table>
<p>Sum[1..3] = prefix[4] - prefix[1] = 10 - 1 = <strong>9</strong> ✓ (2+3+4=9)</p>`,
    mistakes: `<ul>
<li>Off-by-one in prefix indexing — use <em>n+1</em> size array</li>
<li>Forgetting to initialize <em>mp[0]=1</em> in subarray-sum-equals-K</li>
<li>Integer overflow for large arrays — use <em>long long</em> in C++</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>Memory trick:</strong> "Prefix = running total, difference = instant answer"</li>
<li>💡 2D prefix sum extends to matrix region queries</li>
<li>🎯 If asked "how many subarrays with sum = K" → always think prefix sum + hashmap</li></ul>`,
    variations: `<ul>
<li><strong>2D Prefix Sum:</strong> For matrix region sum queries</li>
<li><strong>Prefix XOR:</strong> XOR variant for XOR-based subarray queries</li>
<li><strong>Difference Array:</strong> For range update operations (see below)</li></ul>`,
    problems: [
      { name: 'Running Sum of 1D Array', diff: 'Easy', url: 'https://leetcode.com/problems/running-sum-of-1d-array/' },
      { name: 'Range Sum Query - Immutable', diff: 'Easy', url: 'https://leetcode.com/problems/range-sum-query-immutable/' },
      { name: 'Subarray Sum Equals K', diff: 'Medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
      { name: 'Contiguous Array', diff: 'Medium', url: 'https://leetcode.com/problems/contiguous-array/' },
      { name: 'Range Sum Query 2D', diff: 'Medium', url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/' },
      { name: 'Max Sum of Rectangle No Larger Than K', diff: 'Hard', url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/' },
    ]
  },
  {
    title: 'Kadane\'s Algorithm',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Kadane's Algorithm</strong> finds the maximum sum contiguous subarray in O(n).</p>
<p>Core idea: At each index, decide — <em>extend the current subarray</em> or <em>start a new one</em>.</p>
<p>Recurrence: <em>maxEndingHere = max(arr[i], maxEndingHere + arr[i])</em></p>`,
    recognition: `<ul><li><strong>"maximum subarray sum"</strong> → Kadane's</li>
<li><strong>"largest sum contiguous"</strong> → Kadane's</li>
<li>Circular subarray max sum → Kadane's + total - minSubarray</li></ul>`,
    approaches: `<h4>Brute Force — O(n³)</h4><p>Try all (i,j) pairs, compute sum for each.</p>
<h4>Better — O(n²)</h4><p>Fix start, extend end, maintain running sum.</p>
<h4>Optimal — O(n) Kadane's</h4><p>Track maxEndingHere. Reset to current element when sum drops below it.</p>`,
    code: {
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], curr = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        curr = max(nums[i], curr + nums[i]);
        maxSum = max(maxSum, curr);
    }
    return maxSum;
}`,
      python: `def maxSubArray(nums):
    max_sum = curr = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        max_sum = max(max_sum, curr)
    return max_sum`,
      java: `int maxSubArray(int[] nums) {
    int maxSum = nums[0], curr = nums[0];
    for (int i = 1; i < nums.length; i++) {
        curr = Math.max(nums[i], curr + nums[i]);
        maxSum = Math.max(maxSum, curr);
    }
    return maxSum;
}`
    },
    dryRun: `<p><strong>arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]</strong></p>
<table class="dry-run-table"><tr><th>i</th><th>arr[i]</th><th>curr</th><th>maxSum</th></tr>
<tr><td>0</td><td>-2</td><td>-2</td><td>-2</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>2</td><td>-3</td><td>-2</td><td>1</td></tr>
<tr><td>3</td><td>4</td><td>4</td><td>4</td></tr>
<tr><td>4</td><td>-1</td><td>3</td><td>4</td></tr>
<tr><td>5</td><td>2</td><td>5</td><td>5</td></tr>
<tr><td>6</td><td>1</td><td>6</td><td>6</td></tr>
<tr><td>7</td><td>-5</td><td>1</td><td>6</td></tr>
<tr><td>8</td><td>4</td><td>5</td><td>6</td></tr></table>
<p>Answer: <strong>6</strong> → subarray [4,-1,2,1]</p>`,
    mistakes: `<ul><li>Initializing maxSum to 0 instead of nums[0] — fails for all-negative arrays</li>
<li>Not handling empty array edge case</li></ul>`,
    tips: `<ul><li>🧠 "Extend or restart" — that's the entire algorithm</li>
<li>For circular variant: answer = max(kadane_max, totalSum - kadane_min)</li></ul>`,
    variations: `<ul><li><strong>Circular Max Subarray:</strong> LC 918</li>
<li><strong>Max Product Subarray:</strong> Track both min and max products</li>
<li><strong>Max Sum with at most K elements</strong></li></ul>`,
    problems: [
      { name: 'Maximum Subarray', diff: 'Medium', url: 'https://leetcode.com/problems/maximum-subarray/' },
      { name: 'Maximum Product Subarray', diff: 'Medium', url: 'https://leetcode.com/problems/maximum-product-subarray/' },
      { name: 'Maximum Sum Circular Subarray', diff: 'Medium', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/' },
      { name: 'Max Sum of Rectangle No Larger Than K', diff: 'Hard', url: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/' },
    ]
  },
  {
    title: 'Merge Intervals',
    tc: 'O(n log n)', sc: 'O(n)',
    concept: `<p><strong>Merge Intervals</strong> — sort intervals by start, then merge overlapping ones greedily.</p>
<p>Two intervals overlap when <em>a.start ≤ b.end AND b.start ≤ a.end</em>.</p>`,
    recognition: `<ul><li><strong>"merge overlapping intervals"</strong></li>
<li><strong>"insert interval"</strong></li>
<li><strong>"meeting rooms"</strong></li></ul>`,
    approaches: `<h4>Optimal — O(n log n)</h4><p>Sort by start time. Iterate and merge if current overlaps with last merged interval.</p>`,
    code: {
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> res;
    for (auto& iv : intervals) {
        if (!res.empty() && res.back()[1] >= iv[0])
            res.back()[1] = max(res.back()[1], iv[1]);
        else
            res.push_back(iv);
    }
    return res;
}`,
      python: `def merge(intervals):
    intervals.sort()
    res = []
    for start, end in intervals:
        if res and res[-1][1] >= start:
            res[-1][1] = max(res[-1][1], end)
        else:
            res.append([start, end])
    return res`,
      java: `int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> res = new ArrayList<>();
    for (int[] iv : intervals) {
        if (!res.isEmpty() && res.get(res.size()-1)[1] >= iv[0])
            res.get(res.size()-1)[1] = Math.max(res.get(res.size()-1)[1], iv[1]);
        else
            res.add(iv);
    }
    return res.toArray(new int[0][]);
}`
    },
    mistakes: `<ul><li>Forgetting to sort first</li><li>Using < instead of <= for overlap check</li></ul>`,
    tips: `<ul><li>🧠 Sort by start → greedily merge → done</li></ul>`,
    problems: [
      { name: 'Merge Intervals', diff: 'Medium', url: 'https://leetcode.com/problems/merge-intervals/' },
      { name: 'Insert Interval', diff: 'Medium', url: 'https://leetcode.com/problems/insert-interval/' },
      { name: 'Meeting Rooms II', diff: 'Medium', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { name: 'Non-overlapping Intervals', diff: 'Medium', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
    ]
  },
  {
    title: 'Cyclic Sort',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Cyclic Sort</strong> places each number at its correct index (num → index num-1). Useful when array contains numbers in range [1, n].</p>`,
    recognition: `<ul><li><strong>"find missing number in range [1,n]"</strong></li>
<li><strong>"find duplicate in [1,n]"</strong></li>
<li><strong>"first missing positive"</strong></li></ul>`,
    approaches: `<h4>Optimal — O(n)</h4><p>Swap each element to its correct position. After sorting, any element not matching its index reveals the answer.</p>`,
    code: {
      cpp: `// Place each num at index num-1
int i = 0;
while (i < n) {
    int correct = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= n && nums[i] != nums[correct])
        swap(nums[i], nums[correct]);
    else i++;
}
// Find missing
for (int i = 0; i < n; i++)
    if (nums[i] != i + 1) return i + 1;`,
      python: `i = 0
while i < n:
    correct = nums[i] - 1
    if 0 < nums[i] <= n and nums[i] != nums[correct]:
        nums[i], nums[correct] = nums[correct], nums[i]
    else:
        i += 1
for i in range(n):
    if nums[i] != i + 1: return i + 1`,
      java: `int i = 0;
while (i < n) {
    int correct = nums[i] - 1;
    if (nums[i] > 0 && nums[i] <= n && nums[i] != nums[correct]) {
        int tmp = nums[i]; nums[i] = nums[correct]; nums[correct] = tmp;
    } else i++;
}`
    },
    problems: [
      { name: 'Missing Number', diff: 'Easy', url: 'https://leetcode.com/problems/missing-number/' },
      { name: 'Find All Duplicates', diff: 'Medium', url: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/' },
      { name: 'First Missing Positive', diff: 'Hard', url: 'https://leetcode.com/problems/first-missing-positive/' },
    ]
  },
];
