export const slidingWindowPatterns = [
  {
    title: 'Fixed Size Window',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Fixed Size Sliding Window</strong> — the window always has exactly <em>K</em> elements. Slide by adding the new right element and removing the left element that falls out.</p>
<p>No expansion/contraction logic needed — just maintain a running state (sum, max, count) as the window slides by exactly one position each step.</p>
<h4>Template:</h4>
<ol><li>Process first K elements to initialize window</li>
<li>Slide from index K to n-1: add arr[i], remove arr[i-K]</li>
<li>Update answer at each step</li></ol>`,
    recognition: `<ul>
<li><strong>"maximum sum of subarray of size K"</strong></li>
<li><strong>"average of subarrays of size K"</strong></li>
<li><strong>"max/min in every window of size K"</strong> (+ monotonic deque)</li>
<li><strong>"contains duplicate within K distance"</strong></li>
<li><strong>"find all anagrams"</strong> (fixed size = pattern length)</li></ul>`,
    approaches: `<h4>Brute Force — O(n·K)</h4><p>For every position i, sum/process K elements from scratch.</p>
<h4>Optimal — O(n)</h4><p>Maintain running state. When window slides, add new element and subtract outgoing element — O(1) per slide.</p>`,
    code: {
      cpp: `// Max sum of subarray of size K
int maxSumSubarray(vector<int>& arr, int k) {
    int windowSum = 0, maxSum = INT_MIN;
    for (int i = 0; i < arr.size(); i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}

// Find All Anagrams (fixed window = pattern length)
vector<int> findAnagrams(string s, string p) {
    int n = s.size(), m = p.size();
    if (n < m) return {};
    vector<int> res;
    vector<int> pf(26, 0), wf(26, 0);
    for (char c : p) pf[c - 'a']++;
    for (int i = 0; i < n; i++) {
        wf[s[i] - 'a']++;
        if (i >= m) wf[s[i - m] - 'a']--;
        if (i >= m - 1 && wf == pf) res.push_back(i - m + 1);
    }
    return res;
}

// Max of every window of size K (using deque)
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
      python: `# Max sum of subarray of size K
def maxSumSubarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Find All Anagrams
from collections import Counter
def findAnagrams(s, p):
    m = len(p)
    if len(s) < m: return []
    pf = Counter(p)
    wf = Counter(s[:m])
    res = [0] if wf == pf else []
    for i in range(m, len(s)):
        wf[s[i]] += 1
        wf[s[i - m]] -= 1
        if wf[s[i - m]] == 0: del wf[s[i - m]]
        if wf == pf: res.append(i - m + 1)
    return res

# Max Sliding Window (deque)
from collections import deque
def maxSlidingWindow(nums, k):
    dq, res = deque(), []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k: dq.popleft()
        while dq and nums[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    return res`,
      java: `// Max sum subarray of size K
int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0, maxSum = Integer.MIN_VALUE;
    for (int i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// Find All Anagrams
List<Integer> findAnagrams(String s, String p) {
    int n = s.length(), m = p.length();
    List<Integer> res = new ArrayList<>();
    if (n < m) return res;
    int[] pf = new int[26], wf = new int[26];
    for (char c : p.toCharArray()) pf[c - 'a']++;
    for (int i = 0; i < n; i++) {
        wf[s.charAt(i) - 'a']++;
        if (i >= m) wf[s.charAt(i - m) - 'a']--;
        if (i >= m - 1 && Arrays.equals(wf, pf)) res.add(i - m + 1);
    }
    return res;
}`
    },
    dryRun: `<p><strong>arr = [2, 1, 5, 1, 3, 2], K = 3</strong></p>
<table class="dry-run-table"><tr><th>i</th><th>Add</th><th>Remove</th><th>windowSum</th><th>maxSum</th></tr>
<tr><td>0</td><td>2</td><td>—</td><td>2</td><td>—</td></tr>
<tr><td>1</td><td>1</td><td>—</td><td>3</td><td>—</td></tr>
<tr><td>2</td><td>5</td><td>—</td><td>8</td><td>8</td></tr>
<tr><td>3</td><td>1</td><td>2</td><td>7</td><td>8</td></tr>
<tr><td>4</td><td>3</td><td>1</td><td>9</td><td>9</td></tr>
<tr><td>5</td><td>2</td><td>5</td><td>6</td><td>9</td></tr></table>
<p>Answer: <strong>9</strong> (subarray [1,3,2] wait — [5,1,3] gives 9) ✓</p>`,
    mistakes: `<ul>
<li>Off-by-one: checking <em>i >= k</em> vs <em>i >= k-1</em> for first valid window</li>
<li>Not initializing the first window before sliding</li>
<li>For anagram problems: forgetting to delete keys with count 0 from map</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>"Fixed K → no while loop for shrinking, just subtract outgoing"</strong></li>
<li>💡 Anagram = fixed window of pattern length + frequency matching</li>
<li>🎯 For max/min in window: combine with monotonic deque</li></ul>`,
    problems: [
      { name: 'Contains Duplicate II', diff: 'Easy', url: 'https://leetcode.com/problems/contains-duplicate-ii/' },
      { name: 'Find All Anagrams in String', diff: 'Medium', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
      { name: 'Permutation in String', diff: 'Medium', url: 'https://leetcode.com/problems/permutation-in-string/' },
      { name: 'Maximum Average Subarray I', diff: 'Easy', url: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
      { name: 'Sliding Window Maximum', diff: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
    ]
  },
  {
    title: 'Variable Size Window',
    tc: 'O(n)', sc: 'O(k) or O(1)',
    concept: `<p><strong>Variable Size Sliding Window</strong> — the window grows and shrinks dynamically. <em>Right pointer expands</em> to explore, <em>left pointer shrinks</em> when a constraint is violated.</p>
<h4>Template (Longest/Maximum):</h4>
<ol><li>Expand window by moving <em>right</em></li>
<li>While window is <strong>invalid</strong>, shrink from <em>left</em></li>
<li>Update answer with current valid window size</li></ol>
<h4>Template (Shortest/Minimum):</h4>
<ol><li>Expand window by moving <em>right</em></li>
<li>While window is <strong>valid</strong>, update answer and shrink from <em>left</em></li></ol>`,
    recognition: `<ul>
<li><strong>"longest substring with at most K distinct characters"</strong></li>
<li><strong>"longest substring without repeating characters"</strong></li>
<li><strong>"minimum window substring"</strong></li>
<li><strong>"longest repeating character replacement"</strong></li>
<li><strong>"max consecutive ones"</strong> (with at most K flips)</li>
<li><strong>"minimum size subarray sum"</strong></li></ul>`,
    approaches: `<h4>Brute Force — O(n²)</h4><p>Try all (l, r) pairs, check condition for each window.</p>
<h4>Optimal — O(n)</h4><p>Each element enters and leaves the window at most once → amortized O(n). Use a hashmap/counter to track window state.</p>`,
    code: {
      cpp: `// Longest substring without repeating characters
int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        if (lastSeen.count(s[r]) && lastSeen[s[r]] >= l)
            l = lastSeen[s[r]] + 1;
        lastSeen[s[r]] = r;
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}

// Longest with at most K distinct characters
int longestKDistinct(string s, int k) {
    unordered_map<char, int> freq;
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.size(); r++) {
        freq[s[r]]++;
        while (freq.size() > k) {
            if (--freq[s[l]] == 0) freq.erase(s[l]);
            l++;
        }
        maxLen = max(maxLen, r - l + 1);
    }
    return maxLen;
}

// Minimum Window Substring
string minWindow(string s, string t) {
    unordered_map<char,int> need, have;
    for (char c : t) need[c]++;
    int required = need.size(), formed = 0;
    int l = 0, minLen = INT_MAX, start = 0;
    for (int r = 0; r < s.size(); r++) {
        have[s[r]]++;
        if (need.count(s[r]) && have[s[r]] == need[s[r]])
            formed++;
        while (formed == required) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                start = l;
            }
            have[s[l]]--;
            if (need.count(s[l]) && have[s[l]] < need[s[l]])
                formed--;
            l++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(start, minLen);
}`,
      python: `# Longest substring without repeating characters
def lengthOfLongestSubstring(s):
    last_seen = {}
    l = max_len = 0
    for r, c in enumerate(s):
        if c in last_seen and last_seen[c] >= l:
            l = last_seen[c] + 1
        last_seen[c] = r
        max_len = max(max_len, r - l + 1)
    return max_len

# Longest with at most K distinct
def longestKDistinct(s, k):
    from collections import defaultdict
    freq = defaultdict(int)
    l = max_len = 0
    for r in range(len(s)):
        freq[s[r]] += 1
        while len(freq) > k:
            freq[s[l]] -= 1
            if freq[s[l]] == 0: del freq[s[l]]
            l += 1
        max_len = max(max_len, r - l + 1)
    return max_len

# Minimum Window Substring
from collections import Counter
def minWindow(s, t):
    need = Counter(t)
    required = len(need)
    formed = 0
    have = {}
    l = 0
    ans = (float('inf'), 0, 0)  # (length, left, right)
    for r, c in enumerate(s):
        have[c] = have.get(c, 0) + 1
        if c in need and have[c] == need[c]:
            formed += 1
        while formed == required:
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            have[s[l]] -= 1
            if s[l] in need and have[s[l]] < need[s[l]]:
                formed -= 1
            l += 1
    return "" if ans[0] == float('inf') else s[ans[1]:ans[2]+1]`,
      java: `// Longest without repeating
int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int l = 0, maxLen = 0;
    for (int r = 0; r < s.length(); r++) {
        char c = s.charAt(r);
        if (lastSeen.containsKey(c) && lastSeen.get(c) >= l)
            l = lastSeen.get(c) + 1;
        lastSeen.put(c, r);
        maxLen = Math.max(maxLen, r - l + 1);
    }
    return maxLen;
}`
    },
    dryRun: `<p><strong>Longest Without Repeating: s = "abcabcbb"</strong></p>
<table class="dry-run-table"><tr><th>r</th><th>char</th><th>l</th><th>window</th><th>maxLen</th></tr>
<tr><td>0</td><td>a</td><td>0</td><td>"a"</td><td>1</td></tr>
<tr><td>1</td><td>b</td><td>0</td><td>"ab"</td><td>2</td></tr>
<tr><td>2</td><td>c</td><td>0</td><td>"abc"</td><td>3</td></tr>
<tr><td>3</td><td>a</td><td>1</td><td>"bca"</td><td>3</td></tr>
<tr><td>4</td><td>b</td><td>2</td><td>"cab"</td><td>3</td></tr>
<tr><td>5</td><td>c</td><td>3</td><td>"abc"</td><td>3</td></tr>
<tr><td>6</td><td>b</td><td>5</td><td>"cb"</td><td>3</td></tr>
<tr><td>7</td><td>b</td><td>7</td><td>"b"</td><td>3</td></tr></table>
<p>Answer: <strong>3</strong> ("abc") ✓</p>`,
    mistakes: `<ul>
<li>Using <em>if</em> instead of <em>while</em> to shrink — might need to shrink multiple times!</li>
<li>Not cleaning up frequency map (deleting keys when count = 0)</li>
<li>For "minimum window": updating answer <strong>inside</strong> the while loop, not outside</li>
<li>For "longest": updating answer <strong>after</strong> the while loop, not inside</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>Longest → shrink while invalid, answer after while</strong></li>
<li>🧠 <strong>Shortest → shrink while valid, answer inside while</strong></li>
<li>💡 Each element enters/exits window at most once → O(2n) = O(n)</li></ul>`,
    variations: `<ul>
<li><strong>Longest Repeating Char Replacement:</strong> window valid when (windowLen - maxFreq) ≤ K</li>
<li><strong>Max Consecutive Ones III:</strong> variable window, allow K zero-flips</li>
<li><strong>Minimum Size Subarray Sum:</strong> shrink while sum ≥ target</li></ul>`,
    problems: [
      { name: 'Longest Substring Without Repeating', diff: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
      { name: 'Longest Repeating Character Replacement', diff: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
      { name: 'Max Consecutive Ones III', diff: 'Medium', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
      { name: 'Minimum Size Subarray Sum', diff: 'Medium', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
      { name: 'Fruit Into Baskets', diff: 'Medium', url: 'https://leetcode.com/problems/fruit-into-baskets/' },
      { name: 'Minimum Window Substring', diff: 'Hard', url: 'https://leetcode.com/problems/minimum-window-substring/' },
    ]
  },
  {
    title: 'Exactly K (AtMost Trick)',
    tc: 'O(n)', sc: 'O(k)',
    concept: `<p><strong>Exactly K problems</strong> are solved using the identity:</p>
<p style="text-align:center; font-size:1.1em"><strong><em>exactly(K) = atMost(K) − atMost(K−1)</em></strong></p>
<p>This is the most powerful sliding window trick. Write one <em>atMost(K)</em> function that counts subarrays/substrings with <strong>at most K</strong> distinct elements, then subtract.</p>
<h4>Why this works:</h4>
<p>atMost(K) counts windows with 0, 1, 2, ..., K distinct elements. atMost(K-1) counts 0, 1, ..., K-1. The difference gives exactly K.</p>`,
    recognition: `<ul>
<li><strong>"subarrays with exactly K distinct integers"</strong></li>
<li><strong>"count binary substrings with exactly K ones"</strong></li>
<li><strong>"number of subarrays with sum exactly K"</strong> (non-negative elements)</li>
<li>Any "exactly K" constraint on a sliding window metric</li></ul>`,
    approaches: `<h4>Brute Force — O(n²)</h4><p>Check all subarrays, count distinct elements for each.</p>
<h4>Optimal — O(n)</h4><p>Implement atMost(K) using variable-size sliding window. Call it twice: atMost(K) - atMost(K-1).</p>`,
    code: {
      cpp: `// Count subarrays with exactly K distinct integers
int subarraysWithKDistinct(vector<int>& nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

int atMost(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    int l = 0, count = 0;
    for (int r = 0; r < nums.size(); r++) {
        freq[nums[r]]++;
        while (freq.size() > k) {
            if (--freq[nums[l]] == 0) freq.erase(nums[l]);
            l++;
        }
        count += r - l + 1;  // all subarrays ending at r
    }
    return count;
}

// Count subarrays with sum exactly K (non-negative)
int numSubarraysWithSum(vector<int>& nums, int goal) {
    return atMostSum(nums, goal) - atMostSum(nums, goal - 1);
}

int atMostSum(vector<int>& nums, int goal) {
    if (goal < 0) return 0;
    int l = 0, count = 0, sum = 0;
    for (int r = 0; r < nums.size(); r++) {
        sum += nums[r];
        while (sum > goal) sum -= nums[l++];
        count += r - l + 1;
    }
    return count;
}`,
      python: `# Subarrays with exactly K distinct
def subarraysWithKDistinct(nums, k):
    return atMost(nums, k) - atMost(nums, k - 1)

def atMost(nums, k):
    from collections import defaultdict
    freq = defaultdict(int)
    l = count = 0
    for r in range(len(nums)):
        freq[nums[r]] += 1
        while len(freq) > k:
            freq[nums[l]] -= 1
            if freq[nums[l]] == 0: del freq[nums[l]]
            l += 1
        count += r - l + 1  # all subarrays ending at r
    return count

# Count subarrays with sum exactly K
def numSubarraysWithSum(nums, goal):
    def atMostSum(g):
        if g < 0: return 0
        l = s = count = 0
        for r in range(len(nums)):
            s += nums[r]
            while s > g:
                s -= nums[l]; l += 1
            count += r - l + 1
        return count
    return atMostSum(goal) - atMostSum(goal - 1)`,
      java: `int subarraysWithKDistinct(int[] nums, int k) {
    return atMost(nums, k) - atMost(nums, k - 1);
}

int atMost(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    int l = 0, count = 0;
    for (int r = 0; r < nums.length; r++) {
        freq.merge(nums[r], 1, Integer::sum);
        while (freq.size() > k) {
            freq.merge(nums[l], -1, Integer::sum);
            if (freq.get(nums[l]) == 0) freq.remove(nums[l]);
            l++;
        }
        count += r - l + 1;
    }
    return count;
}`
    },
    dryRun: `<p><strong>nums = [1, 2, 1, 2, 3], K = 2</strong></p>
<p><em>atMost(2):</em></p>
<table class="dry-run-table"><tr><th>r</th><th>window</th><th>distinct</th><th>count += r-l+1</th><th>total</th></tr>
<tr><td>0</td><td>[1]</td><td>1</td><td>+1</td><td>1</td></tr>
<tr><td>1</td><td>[1,2]</td><td>2</td><td>+2</td><td>3</td></tr>
<tr><td>2</td><td>[1,2,1]</td><td>2</td><td>+3</td><td>6</td></tr>
<tr><td>3</td><td>[1,2,1,2]</td><td>2</td><td>+4</td><td>10</td></tr>
<tr><td>4</td><td>[2,3]→shrink</td><td>2</td><td>+2</td><td>12</td></tr></table>
<p><em>atMost(1) = 5</em> → <strong>exactly(2) = 12 - 5 = 7</strong> ✓</p>`,
    mistakes: `<ul>
<li>Forgetting the <em>count += r - l + 1</em> formula — this counts ALL valid subarrays ending at r</li>
<li>Not handling the edge case where K = 0 or goal < 0</li>
<li>Trying to solve "exactly K" directly instead of using the atMost trick</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>THE formula: exactly(K) = atMost(K) - atMost(K-1)</strong></li>
<li>💡 <em>count += r - l + 1</em> counts subarrays ending at index r: [l..r], [l+1..r], ..., [r..r]</li>
<li>🎯 This trick converts hard "exactly K" problems into easy "at most K" problems</li></ul>`,
    problems: [
      { name: 'Binary Subarrays With Sum', diff: 'Medium', url: 'https://leetcode.com/problems/binary-subarrays-with-sum/' },
      { name: 'Count Number of Nice Subarrays', diff: 'Medium', url: 'https://leetcode.com/problems/count-number-of-nice-subarrays/' },
      { name: 'Subarrays with K Different Integers', diff: 'Hard', url: 'https://leetcode.com/problems/subarrays-with-k-different-integers/' },
    ]
  },
];
