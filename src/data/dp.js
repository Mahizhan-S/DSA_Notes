export const dpPatterns = [
  {
    title: 'Fibonacci DP / 1D DP',
    tc: 'O(n)', sc: 'O(1) optimized',
    concept: `<p>Base pattern where <em>dp[i]</em> depends on a fixed number of previous states. Space can be optimized to O(1).</p>
<p>Examples: Climbing Stairs, House Robber, Decode Ways.</p>`,
    recognition: `<ul><li><strong>"climbing stairs"</strong></li><li><strong>"house robber"</strong></li><li><strong>"how many ways"</strong></li></ul>`,
    code: {
      cpp: `// Climbing Stairs
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}

// House Robber
int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int x : nums) {
        int curr = max(prev1, prev2 + x);
        prev2 = prev1; prev1 = curr;
    }
    return prev1;
}`,
      python: `def climbStairs(n):
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b

def rob(nums):
    prev2 = prev1 = 0
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1`,
      java: `int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b; a = b; b = c;
    }
    return b;
}`
    },
    problems: [
      { name: 'Climbing Stairs', diff: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
      { name: 'House Robber', diff: 'Medium', url: 'https://leetcode.com/problems/house-robber/' },
      { name: 'House Robber II', diff: 'Medium', url: 'https://leetcode.com/problems/house-robber-ii/' },
      { name: 'Decode Ways', diff: 'Medium', url: 'https://leetcode.com/problems/decode-ways/' },
    ]
  },
  {
    title: '0/1 Knapsack',
    tc: 'O(n·W)', sc: 'O(W) optimized',
    concept: `<p>Given items with weight and value, maximize value within capacity W. Each item used <strong>at most once</strong>.</p>
<p><em>dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])</em></p>
<p>Space optimization: iterate weights <strong>right to left</strong> in 1D array.</p>`,
    recognition: `<ul><li><strong>"maximize/minimize with capacity constraint"</strong></li>
<li><strong>"partition equal subset sum"</strong> → subset sum variant</li>
<li><strong>"target sum"</strong> → count subsets</li></ul>`,
    code: {
      cpp: `// 0/1 Knapsack (space optimized)
int knapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}`,
      python: `def knapsack(wt, val, W):
    dp = [0] * (W + 1)
    for i in range(len(wt)):
        for w in range(W, wt[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i])
    return dp[W]`,
      java: `int knapsack(int[] wt, int[] val, int W) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < wt.length; i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}`
    },
    tips: `<ul><li>🧠 <strong>0/1 → reverse loop</strong>, Unbounded → forward loop</li>
<li>Subset Sum is knapsack where val[i] = wt[i] and check dp[target] > 0</li></ul>`,
    problems: [
      { name: 'Partition Equal Subset Sum', diff: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
      { name: 'Target Sum', diff: 'Medium', url: 'https://leetcode.com/problems/target-sum/' },
      { name: 'Last Stone Weight II', diff: 'Medium', url: 'https://leetcode.com/problems/last-stone-weight-ii/' },
    ]
  },
  {
    title: 'LIS (Longest Increasing Subsequence)',
    tc: 'O(n log n)', sc: 'O(n)',
    concept: `<p><strong>LIS</strong> finds the longest strictly increasing subsequence. O(n²) DP or O(n log n) with patience sorting (binary search on tails array).</p>
<p><em>tails[i]</em> = smallest tail element for increasing subsequence of length i+1.</p>`,
    recognition: `<ul><li><strong>"longest increasing subsequence"</strong></li>
<li><strong>"Russian doll envelopes"</strong></li>
<li><strong>"number of LIS"</strong></li></ul>`,
    code: {
      cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
      python: `from bisect import bisect_left
def lengthOfLIS(nums):
    tails = []
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails): tails.append(x)
        else: tails[i] = x
    return len(tails)`,
      java: `int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int pos = Collections.binarySearch(tails, x);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(x);
        else tails.set(pos, x);
    }
    return tails.size();
}`
    },
    problems: [
      { name: 'Longest Increasing Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { name: 'Number of LIS', diff: 'Medium', url: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/' },
      { name: 'Russian Doll Envelopes', diff: 'Hard', url: 'https://leetcode.com/problems/russian-doll-envelopes/' },
    ]
  },
  {
    title: 'LCS (Longest Common Subsequence)',
    tc: 'O(m·n)', sc: 'O(min(m,n))',
    concept: `<p><em>dp[i][j]</em> = LCS of first i chars of s1 and first j chars of s2.</p>
<p>If s1[i-1]==s2[j-1]: dp[i][j] = dp[i-1][j-1]+1, else max(dp[i-1][j], dp[i][j-1]).</p>`,
    recognition: `<ul><li><strong>"longest common subsequence"</strong></li><li><strong>"edit distance"</strong></li>
<li><strong>"minimum deletions to make strings equal"</strong></li></ul>`,
    code: {
      cpp: `int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = s1[i-1] == s2[j-1] ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
      python: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
      java: `int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m+1][n+1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = s1.charAt(i-1)==s2.charAt(j-1) ? dp[i-1][j-1]+1 : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`
    },
    problems: [
      { name: 'Longest Common Subsequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { name: 'Edit Distance', diff: 'Medium', url: 'https://leetcode.com/problems/edit-distance/' },
      { name: 'Shortest Common Supersequence', diff: 'Hard', url: 'https://leetcode.com/problems/shortest-common-supersequence/' },
    ]
  },
  {
    title: 'Grid DP',
    tc: 'O(m·n)', sc: 'O(n) optimized',
    concept: `<p>Fill a grid where each cell depends on adjacent cells (usually top and left). Classic: unique paths, min path sum.</p>`,
    recognition: `<ul><li><strong>"unique paths in grid"</strong></li><li><strong>"minimum path sum"</strong></li>
<li><strong>"maximal square"</strong></li></ul>`,
    code: {
      cpp: `int uniquePaths(int m, int n) {
    vector<int> dp(n, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j-1];
    return dp[n-1];
}

int maximalSquare(vector<vector<char>>& matrix) {
    int m = matrix.size(), n = matrix[0].size(), maxSide = 0;
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (matrix[i-1][j-1] == '1') {
                dp[i][j] = min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]}) + 1;
                maxSide = max(maxSide, dp[i][j]);
            }
    return maxSide * maxSide;
}`,
      python: `def uniquePaths(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[-1]`,
      java: `int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j-1];
    return dp[n-1];
}`
    },
    problems: [
      { name: 'Unique Paths', diff: 'Medium', url: 'https://leetcode.com/problems/unique-paths/' },
      { name: 'Minimum Path Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-path-sum/' },
      { name: 'Maximal Square', diff: 'Medium', url: 'https://leetcode.com/problems/maximal-square/' },
      { name: 'Dungeon Game', diff: 'Hard', url: 'https://leetcode.com/problems/dungeon-game/' },
    ]
  },
  {
    title: 'Interval / Partition DP',
    tc: 'O(n³)', sc: 'O(n²)',
    concept: `<p><strong>Interval DP:</strong> dp[i][j] = optimal answer for subarray/substring [i..j]. Try all split points k in [i..j-1].</p>
<p>Examples: Matrix Chain Multiplication, Burst Balloons, Palindrome Partitioning.</p>`,
    recognition: `<ul><li><strong>"burst balloons"</strong></li><li><strong>"matrix chain multiplication"</strong></li>
<li><strong>"minimum cost to merge stones"</strong></li><li><strong>"palindrome partitioning"</strong></li></ul>`,
    code: {
      cpp: `// Burst Balloons
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    vector<vector<int>> dp(n+2, vector<int>(n+2, 0));
    for (int len = 1; len <= n; len++)
        for (int l = 1; l <= n-len+1; l++) {
            int r = l + len - 1;
            for (int k = l; k <= r; k++)
                dp[l][r] = max(dp[l][r],
                    dp[l][k-1] + nums[l-1]*nums[k]*nums[r+1] + dp[k+1][r]);
        }
    return dp[1][n];
}`,
      python: `def maxCoins(nums):
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0]*n for _ in range(n)]
    for length in range(1, n-1):
        for l in range(1, n-length):
            r = l + length - 1
            for k in range(l, r+1):
                dp[l][r] = max(dp[l][r],
                    dp[l][k-1] + nums[l-1]*nums[k]*nums[r+1] + dp[k+1][r])
    return dp[1][n-2]`,
      java: `int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n+2];
    arr[0] = arr[n+1] = 1;
    System.arraycopy(nums, 0, arr, 1, n);
    int[][] dp = new int[n+2][n+2];
    for (int len = 1; len <= n; len++)
        for (int l = 1; l <= n-len+1; l++) {
            int r = l+len-1;
            for (int k = l; k <= r; k++)
                dp[l][r] = Math.max(dp[l][r],
                    dp[l][k-1] + arr[l-1]*arr[k]*arr[r+1] + dp[k+1][r]);
        }
    return dp[1][n];
}`
    },
    problems: [
      { name: 'Burst Balloons', diff: 'Hard', url: 'https://leetcode.com/problems/burst-balloons/' },
      { name: 'Palindrome Partitioning II', diff: 'Hard', url: 'https://leetcode.com/problems/palindrome-partitioning-ii/' },
      { name: 'Minimum Cost to Merge Stones', diff: 'Hard', url: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/' },
    ]
  },
  {
    title: 'Bitmask DP',
    tc: 'O(2^n · n)', sc: 'O(2^n)',
    concept: `<p>Use a <strong>bitmask</strong> to represent subsets of n items. dp[mask] = optimal answer using the items indicated by set bits in mask.</p>
<p>Useful when n ≤ 20 and we need to track which items are used.</p>`,
    recognition: `<ul><li><strong>"assign n tasks to n workers"</strong></li>
<li><strong>"TSP (Travelling Salesman)"</strong></li>
<li><strong>"partition into K equal subsets"</strong></li></ul>`,
    code: {
      cpp: `// TSP — minimum cost to visit all cities
int tsp(vector<vector<int>>& dist) {
    int n = dist.size(), full = (1 << n) - 1;
    vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX/2));
    dp[1][0] = 0; // start at city 0
    for (int mask = 1; mask <= full; mask++)
        for (int u = 0; u < n; u++) {
            if (!(mask & (1<<u)) || dp[mask][u] >= INT_MAX/2) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1<<v)) continue;
                int nmask = mask | (1<<v);
                dp[nmask][v] = min(dp[nmask][v], dp[mask][u] + dist[u][v]);
            }
        }
    int ans = INT_MAX;
    for (int u = 0; u < n; u++)
        ans = min(ans, dp[full][u] + dist[u][0]);
    return ans;
}`,
      python: `def tsp(dist):
    n = len(dist)
    full = (1 << n) - 1
    dp = [[float('inf')]*n for _ in range(1<<n)]
    dp[1][0] = 0
    for mask in range(1, full+1):
        for u in range(n):
            if not (mask & (1<<u)) or dp[mask][u] == float('inf'): continue
            for v in range(n):
                if mask & (1<<v): continue
                nmask = mask | (1<<v)
                dp[nmask][v] = min(dp[nmask][v], dp[mask][u] + dist[u][v])
    return min(dp[full][u] + dist[u][0] for u in range(n))`,
      java: `int tsp(int[][] dist) {
    int n = dist.length, full = (1<<n)-1;
    int[][] dp = new int[1<<n][n];
    for (int[] r : dp) Arrays.fill(r, Integer.MAX_VALUE/2);
    dp[1][0] = 0;
    for (int mask = 1; mask <= full; mask++)
        for (int u = 0; u < n; u++) {
            if ((mask&(1<<u))==0 || dp[mask][u]>=Integer.MAX_VALUE/2) continue;
            for (int v = 0; v < n; v++) {
                if ((mask&(1<<v))!=0) continue;
                dp[mask|(1<<v)][v] = Math.min(dp[mask|(1<<v)][v], dp[mask][u]+dist[u][v]);
            }
        }
    int ans = Integer.MAX_VALUE;
    for (int u = 0; u < n; u++) ans = Math.min(ans, dp[full][u]+dist[u][0]);
    return ans;
}`
    },
    problems: [
      { name: 'Partition to K Equal Sum Subsets', diff: 'Medium', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/' },
      { name: 'Shortest Path Visiting All Nodes', diff: 'Hard', url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/' },
    ]
  },
  {
    title: 'State Machine DP',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p>Model the problem as states with transitions. Classic: stock problems where states are (day, holding/not holding, cooldown).</p>`,
    recognition: `<ul><li><strong>"best time to buy and sell stock"</strong> (with cooldown/fee/K transactions)</li></ul>`,
    code: {
      cpp: `// Stock with cooldown
int maxProfit(vector<int>& prices) {
    int held = INT_MIN, sold = 0, rest = 0;
    for (int p : prices) {
        int prevSold = sold;
        sold = held + p;
        held = max(held, rest - p);
        rest = max(rest, prevSold);
    }
    return max(sold, rest);
}`,
      python: `def maxProfit(prices):
    held, sold, rest = float('-inf'), 0, 0
    for p in prices:
        prev_sold = sold
        sold = held + p
        held = max(held, rest - p)
        rest = max(rest, prev_sold)
    return max(sold, rest)`,
      java: `int maxProfit(int[] prices) {
    int held = Integer.MIN_VALUE, sold = 0, rest = 0;
    for (int p : prices) {
        int prevSold = sold;
        sold = held + p;
        held = Math.max(held, rest - p);
        rest = Math.max(rest, prevSold);
    }
    return Math.max(sold, rest);
}`
    },
    problems: [
      { name: 'Best Time Buy Sell Stock', diff: 'Easy', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
      { name: 'Best Time with Cooldown', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/' },
      { name: 'Best Time with Transaction Fee', diff: 'Medium', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/' },
      { name: 'Best Time Stock IV', diff: 'Hard', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/' },
    ]
  },
];
