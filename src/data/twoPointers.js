export const twoPointerPatterns = [
  {
    title: 'Opposite Direction',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Opposite Direction Two Pointers</strong> — one pointer starts at the beginning, the other at the end. They move toward each other based on a condition.</p>
<p>Works on <strong>sorted arrays</strong> where the relationship between elements at both ends gives directional information (too big → shrink right, too small → grow left).</p>
<h4>When to use:</h4>
<ul><li>Pair sum on sorted array</li>
<li>Container with most water (shrink the shorter side)</li>
<li>Trapping rain water</li>
<li>Valid palindrome checking</li></ul>`,
    recognition: `<ul>
<li><strong>"pair with given sum" + sorted</strong> → Opposite pointers</li>
<li><strong>"two sum sorted"</strong> → l=0, r=n-1</li>
<li><strong>"container with most water"</strong> → shrink shorter height</li>
<li><strong>"valid palindrome"</strong> → compare from both ends</li>
<li><strong>"3Sum / 4Sum"</strong> → fix element + opposite pointers</li></ul>`,
    approaches: `<h4>Brute Force — O(n²)</h4><p>Check all pairs using nested loops.</p>
<h4>Optimal — O(n)</h4><p>Use two pointers from opposite ends. Since the array is sorted, if sum < target move left pointer right (increase sum); if sum > target move right pointer left (decrease sum).</p>`,
    code: {
      cpp: `// Two Sum on sorted array
vector<int> twoSum(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return {l, r};
        else if (sum < target) l++;
        else r--;
    }
    return {};
}

// Container With Most Water
int maxArea(vector<int>& height) {
    int l = 0, r = height.size() - 1, maxA = 0;
    while (l < r) {
        int area = min(height[l], height[r]) * (r - l);
        maxA = max(maxA, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxA;
}

// 3Sum (fix one + opposite pointers)
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue; // skip dups
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.push_back({nums[i], nums[l], nums[r]});
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`,
      python: `# Two Sum on sorted array
def twoSum(arr, target):
    l, r = 0, len(arr) - 1
    while l < r:
        s = arr[l] + arr[r]
        if s == target: return [l, r]
        elif s < target: l += 1
        else: r -= 1
    return []

# Container With Most Water
def maxArea(height):
    l, r, max_a = 0, len(height) - 1, 0
    while l < r:
        area = min(height[l], height[r]) * (r - l)
        max_a = max(max_a, area)
        if height[l] < height[r]: l += 1
        else: r -= 1
    return max_a

# 3Sum
def threeSum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return res`,
      java: `// Two Sum sorted
int[] twoSum(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l < r) {
        int sum = arr[l] + arr[r];
        if (sum == target) return new int[]{l, r};
        else if (sum < target) l++;
        else r--;
    }
    return new int[]{};
}

// Container With Most Water
int maxArea(int[] height) {
    int l = 0, r = height.length - 1, maxA = 0;
    while (l < r) {
        int area = Math.min(height[l], height[r]) * (r - l);
        maxA = Math.max(maxA, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return maxA;
}`
    },
    dryRun: `<p><strong>arr = [1, 3, 5, 7, 9], target = 10</strong></p>
<table class="dry-run-table"><tr><th>Step</th><th>l</th><th>r</th><th>arr[l]</th><th>arr[r]</th><th>Sum</th><th>Action</th></tr>
<tr><td>1</td><td>0</td><td>4</td><td>1</td><td>9</td><td>10</td><td>✅ Found!</td></tr></table>
<p><strong>arr = [2, 3, 5, 8, 11], target = 13</strong></p>
<table class="dry-run-table"><tr><th>Step</th><th>l</th><th>r</th><th>Sum</th><th>Action</th></tr>
<tr><td>1</td><td>0</td><td>4</td><td>13</td><td>✅ Found! [0,4]</td></tr></table>`,
    mistakes: `<ul>
<li>Forgetting the array must be <strong>sorted</strong> for this to work</li>
<li>Using <em>while (l <= r)</em> instead of <em>while (l < r)</em> — can cause double counting</li>
<li>Not handling duplicate skipping in 3Sum/4Sum</li>
<li>Infinite loop when neither pointer moves — ensure one always advances</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>Memory trick:</strong> "Sorted + pair → Opposite pointers"</li>
<li>💡 For 3Sum: sort first, fix one, use two pointers for remaining — O(n²)</li>
<li>💡 For 4Sum: fix two, use two pointers — O(n³)</li>
<li>🎯 Container With Most Water: always move the <em>shorter</em> pointer</li></ul>`,
    variations: `<ul>
<li><strong>3Sum:</strong> Fix one element + opposite two pointers (LC 15)</li>
<li><strong>4Sum:</strong> Fix two elements + opposite two pointers (LC 18)</li>
<li><strong>3Sum Closest:</strong> Track min difference (LC 16)</li>
<li><strong>Trapping Rain Water:</strong> Two pointers with left_max, right_max tracking (LC 42)</li></ul>`,
    problems: [
      { name: 'Valid Palindrome', diff: 'Easy', url: 'https://leetcode.com/problems/valid-palindrome/' },
      { name: 'Two Sum II - Sorted', diff: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
      { name: '3Sum', diff: 'Medium', url: 'https://leetcode.com/problems/3sum/' },
      { name: '3Sum Closest', diff: 'Medium', url: 'https://leetcode.com/problems/3sum-closest/' },
      { name: 'Container With Most Water', diff: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/' },
      { name: '4Sum', diff: 'Medium', url: 'https://leetcode.com/problems/4sum/' },
      { name: 'Trapping Rain Water', diff: 'Hard', url: 'https://leetcode.com/problems/trapping-rain-water/' },
    ]
  },
  {
    title: 'Same Direction',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Same Direction Two Pointers</strong> — both pointers start from the beginning and move in the same direction. One pointer (fast) explores ahead, the other (slow) tracks the write/valid position.</p>
<p>Classic use: <strong>in-place array modifications</strong> like removing duplicates, removing elements, or compacting arrays.</p>`,
    recognition: `<ul>
<li><strong>"remove duplicates in-place"</strong></li>
<li><strong>"remove element"</strong></li>
<li><strong>"move zeroes to end"</strong></li>
<li><strong>"squeeze / compact array"</strong></li></ul>`,
    approaches: `<h4>Pattern</h4><p><em>slow</em> marks the next write position. <em>fast</em> scans every element. If fast's element is valid, write it at slow and advance slow.</p>`,
    code: {
      cpp: `// Remove Duplicates from Sorted Array
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int slow = 0;
    for (int fast = 1; fast < nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Move Zeroes to End
void moveZeroes(vector<int>& nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[fast] != 0) {
            swap(nums[slow], nums[fast]);
            slow++;
        }
    }
}

// Remove Element
int removeElement(vector<int>& nums, int val) {
    int slow = 0;
    for (int fast = 0; fast < nums.size(); fast++) {
        if (nums[fast] != val) {
            nums[slow++] = nums[fast];
        }
    }
    return slow;
}`,
      python: `# Remove Duplicates from Sorted Array
def removeDuplicates(nums):
    if not nums: return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

# Move Zeroes
def moveZeroes(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# Remove Element
def removeElement(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow`,
      java: `// Remove Duplicates
int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int slow = 0;
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            nums[++slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Move Zeroes
void moveZeroes(int[] nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.length; fast++) {
        if (nums[fast] != 0) {
            int tmp = nums[slow]; nums[slow] = nums[fast]; nums[fast] = tmp;
            slow++;
        }
    }
}`
    },
    dryRun: `<p><strong>Remove Duplicates: arr = [1, 1, 2, 2, 3]</strong></p>
<table class="dry-run-table"><tr><th>fast</th><th>slow</th><th>Action</th><th>Array</th></tr>
<tr><td>1</td><td>0</td><td>1==1, skip</td><td>[1,1,2,2,3]</td></tr>
<tr><td>2</td><td>0→1</td><td>2≠1, write</td><td>[1,2,2,2,3]</td></tr>
<tr><td>3</td><td>1</td><td>2==2, skip</td><td>[1,2,2,2,3]</td></tr>
<tr><td>4</td><td>1→2</td><td>3≠2, write</td><td>[1,2,3,2,3]</td></tr></table>
<p>Result: first 3 elements = [1,2,3], return 3 ✓</p>`,
    mistakes: `<ul>
<li>Forgetting to handle empty array</li>
<li>Off-by-one: returning <em>slow</em> vs <em>slow+1</em></li>
<li>Using assignment when swap is needed (move zeroes requires swap to preserve non-zero order)</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>slow = "write pointer"</strong>, fast = "read pointer"</li>
<li>💡 Think: "everything before slow is the answer"</li></ul>`,
    problems: [
      { name: 'Remove Duplicates from Sorted Array', diff: 'Easy', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
      { name: 'Remove Element', diff: 'Easy', url: 'https://leetcode.com/problems/remove-element/' },
      { name: 'Move Zeroes', diff: 'Easy', url: 'https://leetcode.com/problems/move-zeroes/' },
      { name: 'Remove Duplicates II', diff: 'Medium', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
    ]
  },
  {
    title: 'Fast-Slow Pointer',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Floyd's Tortoise & Hare</strong> — slow moves 1 step, fast moves 2 steps. If there's a cycle, they <em>will</em> meet. Used for cycle detection, finding middle, and linked-list-as-array problems.</p>
<h4>Key insight:</h4>
<p>When they meet, move one pointer back to start and advance both by 1 — they meet at the <strong>cycle start</strong>.</p>`,
    recognition: `<ul>
<li><strong>"detect cycle"</strong> → Fast-slow pointer</li>
<li><strong>"find start of cycle"</strong> → Meet, then restart one pointer</li>
<li><strong>"find middle of linked list"</strong> → When fast reaches end, slow is at middle</li>
<li><strong>"find duplicate number"</strong> (array treated as linked list) → LC 287</li>
<li><strong>"happy number"</strong> → Digit sum forms a cycle</li></ul>`,
    code: {
      cpp: `// Find Duplicate Number (array as linked list)
int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

// Happy Number
bool isHappy(int n) {
    auto next = [](int n) {
        int sum = 0;
        while (n) { int d = n % 10; sum += d * d; n /= 10; }
        return sum;
    };
    int slow = n, fast = next(n);
    while (fast != 1 && slow != fast) {
        slow = next(slow);
        fast = next(next(fast));
    }
    return fast == 1;
}`,
      python: `# Find Duplicate Number
def findDuplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast: break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow

# Happy Number
def isHappy(n):
    def nxt(n):
        return sum(int(d)**2 for d in str(n))
    slow, fast = n, nxt(n)
    while fast != 1 and slow != fast:
        slow = nxt(slow)
        fast = nxt(nxt(fast))
    return fast == 1`,
      java: `int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}`
    },
    mistakes: `<ul>
<li>Not using <em>do-while</em> for cycle detection — slow and fast start at same place</li>
<li>Confusing "find middle" (for linked lists) with "cycle detection" templates</li></ul>`,
    tips: `<ul>
<li>🧠 <strong>Phase 1:</strong> Detect meeting point. <strong>Phase 2:</strong> Find cycle start.</li>
<li>💡 "Find Duplicate" (LC 287) is cycle detection on array treated as next-pointer graph</li></ul>`,
    problems: [
      { name: 'Happy Number', diff: 'Easy', url: 'https://leetcode.com/problems/happy-number/' },
      { name: 'Linked List Cycle', diff: 'Easy', url: 'https://leetcode.com/problems/linked-list-cycle/' },
      { name: 'Middle of Linked List', diff: 'Easy', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
      { name: 'Linked List Cycle II', diff: 'Medium', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
      { name: 'Find the Duplicate Number', diff: 'Medium', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
    ]
  },
  {
    title: 'Partitioning (DNF)',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Dutch National Flag / 3-Way Partition</strong> — uses three pointers (lo, mid, hi) to partition array into three regions in a single pass.</p>
<p>Invariant: <em>[0..lo-1] = region A, [lo..mid-1] = region B, [hi+1..n-1] = region C</em>. Mid pointer scans and swaps elements to correct regions.</p>`,
    recognition: `<ul>
<li><strong>"sort colors" / "sort 0s, 1s, 2s"</strong></li>
<li><strong>"partition array around pivot"</strong></li>
<li><strong>"three-way partition"</strong></li></ul>`,
    code: {
      cpp: `// Sort Colors (Dutch National Flag)
void sortColors(vector<int>& nums) {
    int lo = 0, mid = 0, hi = nums.size() - 1;
    while (mid <= hi) {
        if (nums[mid] == 0) {
            swap(nums[lo], nums[mid]);
            lo++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[hi]);
            hi--;
            // Don't advance mid — swapped element needs checking
        }
    }
}`,
      python: `def sortColors(nums):
    lo, mid, hi = 0, 0, len(nums) - 1
    while mid <= hi:
        if nums[mid] == 0:
            nums[lo], nums[mid] = nums[mid], nums[lo]
            lo += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[hi] = nums[hi], nums[mid]
            hi -= 1`,
      java: `void sortColors(int[] nums) {
    int lo = 0, mid = 0, hi = nums.length - 1;
    while (mid <= hi) {
        if (nums[mid] == 0) {
            int t = nums[lo]; nums[lo] = nums[mid]; nums[mid] = t;
            lo++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int t = nums[mid]; nums[mid] = nums[hi]; nums[hi] = t;
            hi--;
        }
    }
}`
    },
    dryRun: `<p><strong>arr = [2, 0, 1, 2, 0, 1]</strong></p>
<table class="dry-run-table"><tr><th>Step</th><th>lo</th><th>mid</th><th>hi</th><th>arr[mid]</th><th>Action</th><th>Array</th></tr>
<tr><td>1</td><td>0</td><td>0</td><td>5</td><td>2</td><td>swap mid↔hi, hi--</td><td>[1,0,1,2,0,2]</td></tr>
<tr><td>2</td><td>0</td><td>0</td><td>4</td><td>1</td><td>mid++</td><td>[1,0,1,2,0,2]</td></tr>
<tr><td>3</td><td>0</td><td>1</td><td>4</td><td>0</td><td>swap lo↔mid, lo++, mid++</td><td>[0,1,1,2,0,2]</td></tr>
<tr><td>4</td><td>1</td><td>2</td><td>4</td><td>1</td><td>mid++</td><td>[0,1,1,2,0,2]</td></tr>
<tr><td>5</td><td>1</td><td>3</td><td>4</td><td>2</td><td>swap mid↔hi, hi--</td><td>[0,1,1,0,2,2]</td></tr>
<tr><td>6</td><td>1</td><td>3</td><td>3</td><td>0</td><td>swap lo↔mid, lo++, mid++</td><td>[0,0,1,1,2,2]</td></tr></table>
<p>Result: <strong>[0,0,1,1,2,2]</strong> ✓</p>`,
    mistakes: `<ul>
<li>Advancing <em>mid</em> after swapping with <em>hi</em> — the swapped element hasn't been checked yet!</li>
<li>Using <em>mid < hi</em> instead of <em>mid <= hi</em></li></ul>`,
    tips: `<ul>
<li>🧠 <strong>Key insight:</strong> Don't advance mid after swapping with hi (unknown element came from right)</li>
<li>💡 This is essentially quicksort's partition step generalized to 3 values</li></ul>`,
    problems: [
      { name: 'Sort Colors', diff: 'Medium', url: 'https://leetcode.com/problems/sort-colors/' },
      { name: 'Move Zeroes', diff: 'Easy', url: 'https://leetcode.com/problems/move-zeroes/' },
    ]
  },
];
