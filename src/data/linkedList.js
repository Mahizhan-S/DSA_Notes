export const linkedListPatterns = [
  {
    title: 'Reverse Linked List',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p>Iteratively reverse by maintaining <strong>prev, curr, next</strong> pointers. Recursion also works but uses O(n) stack space.</p>`,
    recognition: `<ul><li><strong>"reverse linked list"</strong></li><li><strong>"palindrome linked list"</strong> (reverse second half)</li><li><strong>"reverse nodes in k-group"</strong></li></ul>`,
    code: {
      cpp: `ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr, *curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
      python: `def reverse(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
      java: `ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
    },
    problems: [
      { name: 'Reverse Linked List', diff: 'Easy', url: 'https://leetcode.com/problems/reverse-linked-list/' },
      { name: 'Reverse Linked List II', diff: 'Medium', url: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
      { name: 'Palindrome Linked List', diff: 'Easy', url: 'https://leetcode.com/problems/palindrome-linked-list/' },
      { name: 'Reverse Nodes in k-Group', diff: 'Hard', url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
    ]
  },
  {
    title: 'Fast & Slow Pointer (Floyd)',
    tc: 'O(n)', sc: 'O(1)',
    concept: `<p><strong>Floyd's Tortoise and Hare:</strong> slow moves 1 step, fast moves 2 steps. They meet inside a cycle. Used for cycle detection and finding middle.</p>`,
    recognition: `<ul><li><strong>"detect cycle"</strong></li><li><strong>"find middle node"</strong></li><li><strong>"find duplicate number"</strong> (array as linked list)</li></ul>`,
    code: {
      cpp: `// Detect cycle
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}
// Find middle
ListNode* middle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
      python: `def hasCycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast: return True
    return False

def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
      java: `boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`
    },
    problems: [
      { name: 'Middle of Linked List', diff: 'Easy', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
      { name: 'Linked List Cycle', diff: 'Easy', url: 'https://leetcode.com/problems/linked-list-cycle/' },
      { name: 'Linked List Cycle II', diff: 'Medium', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
      { name: 'Find the Duplicate Number', diff: 'Medium', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
    ]
  },
  {
    title: 'Merge Linked Lists',
    tc: 'O(n+m)', sc: 'O(1)',
    concept: `<p>Merge two sorted lists by comparing heads and linking smaller node first. Use a dummy head to simplify edge cases.</p>`,
    code: {
      cpp: `ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}`,
      python: `def mergeTwoLists(l1, l2):
    dummy = tail = ListNode(0)
    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1; l1 = l1.next
        else:
            tail.next = l2; l2 = l2.next
        tail = tail.next
    tail.next = l1 or l2
    return dummy.next`,
      java: `ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), tail = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
        else { tail.next = l2; l2 = l2.next; }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`
    },
    problems: [
      { name: 'Merge Two Sorted Lists', diff: 'Easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
      { name: 'Merge k Sorted Lists', diff: 'Hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    ]
  },
];
