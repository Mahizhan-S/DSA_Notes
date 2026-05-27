export const heapPatterns = [
  {
    title: 'Top K / Kth Element',
    tc: 'O(n log k)', sc: 'O(k)',
    concept: `<p>Use a <strong>min-heap of size K</strong> to track top K largest elements. The heap root is the Kth largest. For Kth smallest, use a max-heap.</p>`,
    recognition: `<ul><li><strong>"Kth largest/smallest"</strong></li><li><strong>"top K frequent"</strong></li><li><strong>"K closest points"</strong></li></ul>`,
    code: {
      cpp: `// Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minH;
    for (int x : nums) {
        minH.push(x);
        if (minH.size() > k) minH.pop();
    }
    return minH.top();
}`,
      python: `import heapq
def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]
# Or manually:
# heap = []
# for x in nums:
#     heapq.heappush(heap, x)
#     if len(heap) > k: heapq.heappop(heap)
# return heap[0]`,
      java: `int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minH = new PriorityQueue<>();
    for (int x : nums) {
        minH.offer(x);
        if (minH.size() > k) minH.poll();
    }
    return minH.peek();
}`
    },
    problems: [
      { name: 'Kth Largest Element', diff: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
      { name: 'Top K Frequent Elements', diff: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      { name: 'K Closest Points to Origin', diff: 'Medium', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
    ]
  },
  {
    title: 'K-Way Merge',
    tc: 'O(N log k)', sc: 'O(k)',
    concept: `<p>Merge K sorted lists/arrays using a <strong>min-heap</strong> of size K. Always extract the smallest, push its successor.</p>`,
    recognition: `<ul><li><strong>"merge K sorted lists/arrays"</strong></li><li><strong>"smallest range covering elements from K lists"</strong></li></ul>`,
    code: {
      cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
    for (auto l : lists) if (l) pq.push(l);
    ListNode dummy(0), *tail = &dummy;
    while (!pq.empty()) {
        auto node = pq.top(); pq.pop();
        tail->next = node; tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}`,
      python: `import heapq
def mergeKLists(lists):
    heap = []
    for i, l in enumerate(lists):
        if l: heapq.heappush(heap, (l.val, i, l))
    dummy = tail = ListNode(0)
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node; tail = tail.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
      java: `ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b) -> a.val - b.val);
    for (ListNode l : lists) if (l != null) pq.offer(l);
    ListNode dummy = new ListNode(0), tail = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        tail.next = node; tail = tail.next;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`
    },
    problems: [
      { name: 'Merge k Sorted Lists', diff: 'Hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
      { name: 'Find Median from Data Stream', diff: 'Hard', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    ]
  },
];
