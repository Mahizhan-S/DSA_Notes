export const triePatterns = [
  {
    title: 'Trie (Prefix Tree)',
    tc: 'O(L) per operation', sc: 'O(N·L)',
    concept: `<p>A <strong>Trie</strong> stores strings character-by-character in a tree. Enables O(L) insert, search, and prefix queries. Each node has up to 26 children (for lowercase).</p>`,
    recognition: `<ul><li><strong>"autocomplete / prefix search"</strong></li><li><strong>"word search in board"</strong></li>
<li><strong>"longest common prefix"</strong></li><li><strong>"maximum XOR"</strong> → Binary Trie</li></ul>`,
    code: {
      cpp: `struct TrieNode {
    TrieNode* children[26] = {};
    bool isEnd = false;
};
class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string& word) {
        auto node = root;
        for (char c : word) {
            if (!node->children[c-'a'])
                node->children[c-'a'] = new TrieNode();
            node = node->children[c-'a'];
        }
        node->isEnd = true;
    }
    bool search(string& word) {
        auto node = root;
        for (char c : word) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return node->isEnd;
    }
    bool startsWith(string& prefix) {
        auto node = root;
        for (char c : prefix) {
            if (!node->children[c-'a']) return false;
            node = node->children[c-'a'];
        }
        return true;
    }
};`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True

    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end

    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
      java: `class Trie {
    private int[][] children = new int[100005][26];
    private boolean[] isEnd = new boolean[100005];
    private int cnt = 0;

    public void insert(String word) {
        int node = 0;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (children[node][idx] == 0)
                children[node][idx] = ++cnt;
            node = children[node][idx];
        }
        isEnd[node] = true;
    }
    public boolean search(String word) {
        int node = 0;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (children[node][idx] == 0) return false;
            node = children[node][idx];
        }
        return isEnd[node];
    }
}`
    },
    problems: [
      { name: 'Implement Trie', diff: 'Medium', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
      { name: 'Word Search II', diff: 'Hard', url: 'https://leetcode.com/problems/word-search-ii/' },
      { name: 'Maximum XOR of Two Numbers', diff: 'Medium', url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
    ]
  },
];
