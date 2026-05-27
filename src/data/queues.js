export const queuePatterns = [
  {
    title: 'Monotonic Deque',
    tc: 'O(n)', sc: 'O(k)',
    concept: `<p>A <strong>Monotonic Deque</strong> maintains elements in sorted order to answer sliding window min/max queries in O(1) per element.</p>
<p>For max: maintain decreasing deque. Pop from back when new element is larger. Pop from front when element leaves window.</p>`,
    recognition: `<ul><li><strong>"sliding window maximum/minimum"</strong></li>
<li><strong>"max/min in every subarray of size K"</strong></li></ul>`,
    code: {
      cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices, decreasing order of values
    vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
      python: `from collections import deque
def maxSlidingWindow(nums, k):
    dq = deque()  # indices, decreasing values
    res = []
    for i, x in enumerate(nums):
        while dq and dq[0] <= i - k: dq.popleft()
        while dq and nums[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    return res`,
      java: `int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> dq = new ArrayDeque<>();
    int[] res = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
        while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
        dq.offerLast(i);
        if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()];
    }
    return res;
}`
    },
    problems: [
      { name: 'Sliding Window Maximum', diff: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
    ]
  },
  {
    title: 'BFS Queue',
    tc: 'O(V+E)', sc: 'O(V)',
    concept: `<p>BFS uses a <strong>queue</strong> to explore nodes level by level. Essential for shortest path in unweighted graphs and level-order tree traversal.</p>`,
    recognition: `<ul><li><strong>"shortest path in unweighted graph"</strong></li>
<li><strong>"level order traversal"</strong></li>
<li><strong>"minimum steps"</strong></li></ul>`,
    code: {
      cpp: `queue<int> q;
vector<bool> visited(n, false);
q.push(start); visited[start] = true;
while (!q.empty()) {
    int node = q.front(); q.pop();
    for (int next : adj[node]) {
        if (!visited[next]) {
            visited[next] = true;
            q.push(next);
        }
    }
}`,
      python: `from collections import deque
q = deque([start])
visited = {start}
while q:
    node = q.popleft()
    for nxt in adj[node]:
        if nxt not in visited:
            visited.add(nxt)
            q.append(nxt)`,
      java: `Queue<Integer> q = new LinkedList<>();
boolean[] visited = new boolean[n];
q.offer(start); visited[start] = true;
while (!q.isEmpty()) {
    int node = q.poll();
    for (int next : adj[node]) {
        if (!visited[next]) {
            visited[next] = true;
            q.offer(next);
        }
    }
}`
    },
    problems: [
      { name: 'Binary Tree Level Order', diff: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { name: 'Rotting Oranges', diff: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/' },
      { name: 'Word Ladder', diff: 'Hard', url: 'https://leetcode.com/problems/word-ladder/' },
    ]
  },
];
