import { arrayPatterns } from './arrays.js';
import { twoPointerPatterns } from './twoPointers.js';
import { slidingWindowPatterns } from './slidingWindow.js';
import { hashingPatterns } from './hashing.js';
import { binarySearchPatterns } from './binarySearch.js';
import { stackPatterns } from './stacks.js';
import { queuePatterns } from './queues.js';
import { linkedListPatterns } from './linkedList.js';
import { treePatterns } from './trees.js';
import { graphPatterns } from './graphs.js';
import { heapPatterns } from './heaps.js';
import { greedyPatterns } from './greedy.js';
import { backtrackingPatterns } from './backtracking.js';
import { dpPatterns } from './dp.js';
import { bitPatterns } from './bits.js';
import { triePatterns } from './trie.js';
import { segTreePatterns } from './segTree.js';
import { stringPatterns } from './strings.js';
import { advancedPatterns } from './advanced.js';

export const categories = [
  { name: 'Arrays', icon: 'data_array', patterns: arrayPatterns },
  { name: 'Two Pointers', icon: 'swap_horiz', patterns: twoPointerPatterns },
  { name: 'Sliding Window', icon: 'view_carousel', patterns: slidingWindowPatterns },
  { name: 'Hashing', icon: 'tag', patterns: hashingPatterns },
  { name: 'Binary Search', icon: 'search', patterns: binarySearchPatterns },
  { name: 'Stacks', icon: 'layers', patterns: stackPatterns },
  { name: 'Queues & Deque', icon: 'queue', patterns: queuePatterns },
  { name: 'Linked Lists', icon: 'link', patterns: linkedListPatterns },
  { name: 'Trees', icon: 'account_tree', patterns: treePatterns },
  { name: 'Graphs', icon: 'hub', patterns: graphPatterns },
  { name: 'Heaps / PQ', icon: 'filter_list', patterns: heapPatterns },
  { name: 'Greedy', icon: 'bolt', patterns: greedyPatterns },
  { name: 'Backtracking', icon: 'undo', patterns: backtrackingPatterns },
  { name: 'Dynamic Programming', icon: 'grid_on', patterns: dpPatterns },
  { name: 'Bit Manipulation', icon: 'memory', patterns: bitPatterns },
  { name: 'Trie', icon: 'segment', patterns: triePatterns },
  { name: 'Segment & Fenwick Tree', icon: 'equalizer', patterns: segTreePatterns },
  { name: 'String Algorithms', icon: 'text_fields', patterns: stringPatterns },
  { name: 'Advanced Patterns', icon: 'rocket_launch', patterns: advancedPatterns },
];
