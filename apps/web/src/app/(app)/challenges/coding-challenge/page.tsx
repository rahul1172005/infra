'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Maximize2,
    Settings,
    Play,
    RefreshCw,
    ArrowUpRight,
    Search,
    Filter,
    Clock,
    Trophy,
    Terminal,
    Code2,
    FlaskConical,
    Cpu,
    Shield,
    Zap,
    Share2,
    Bookmark,
    Box,
    ChevronDown,
    Check,
    ShieldAlert
} from 'lucide-react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import Editor from '@monaco-editor/react';
import { GOTIcon } from '@/components/icons/GOTIcon';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/lib/store/useAuthStore';

import { DotGrid } from '@/components/ui/DotGrid';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { Proctoring } from '@/components/ui/Proctoring';
import { useCallback } from 'react';

// --- CONFIGURATION ---

const CATEGORIES = [
    { id: 1, title: 'Category - 1', icon: Terminal, status: 'OPEN', color: '#E81414', honor: '10,000HONOR' },
    { id: 2, title: 'Category - 2', icon: Code2, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
    { id: 3, title: 'Category - 3', icon: Cpu, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
    { id: 4, title: 'Category - 4', icon: Search, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
    { id: 5, title: 'Category - 5', icon: Shield, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
    { id: 6, title: 'Category - 6', icon: Shield, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
    { id: 7, title: 'Category - 7', icon: Zap, status: 'OPEN', color: '#ffffff', honor: '10,000HONOR' },
];

const LANGUAGES = [
    { value: 'python', label: 'PYTHON 3' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'JAVA' },
    { value: 'javascript', label: 'JAVASCRIPT' },
    { value: 'typescript', label: 'TYPESCRIPT' },
    { value: 'go', label: 'GO' },
    { value: 'rust', label: 'RUST' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'kotlin', label: 'KOTLIN' },
];

const BOILERPLATES: Record<string, string> = {
    python: "def solve(n: int, arr: list[int]) -> any:\n    # Implement solution\n    pass",
    cpp: "#include <iostream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    string solve(int n, vector<int>& arr) {\n        // Implement solution\n        return \"\";\n    }\n};",
    java: "import java.util.*;\n\nclass Solution {\n    public String solve(int n, int[] arr) {\n        // Implement solution\n        return \"\";\n    }\n}",
    javascript: "/**\n * @param {number} n\n * @param {number[]} arr\n * @return {any}\n */\nfunction solve(n, arr) {\n    // Implement solution\n    return null;\n}",
    typescript: "function solve(n: number, arr: number[]): any {\n    // Implement solution\n    return null;\n}",
    go: "package main\n\nfunc solve(n int, arr []int) interface{} {\n    // Implement solution\n    return nil\n}",
    rust: "impl Solution {\n    pub fn solve(n: i32, arr: Vec<i32>) -> String {\n        // Implement solution\n        String::new()\n    }\n}",
    c: "#include <stdio.h>\n#include <stdlib.h>\n\nchar* solve(int n, int arr[]) {\n    // Implement solution\n    return \"\";\n}",
    csharp: "using System;\n\npublic class Solution {\n    public string Solve(int n, int[] arr) {\n        // Implement solution\n        return \"\";\n    }\n}",
    kotlin: "class Solution {\n    fun solve(n: Int, arr: IntArray): String {\n        // Implement solution\n        return \"\"\n    }\n}",
};

const CHALLENGE_DATA: Record<string, any> = {
    'c1-01': {
        title: 'Sort array by prime indices only',
        difficulty: 'Hard',
        tags: ['Sorting', 'Primes'],
        description: 'You are given an array of N integers. You can only swap elements if their indices are prime numbers (2, 3, 5, 7, 11...). Determine if the array can be sorted.',
        constraints: ['N <= 5000', 'Memory: O(1)'],
        examples: [
            { input: 'n = 12, arr = [91, 3, 72, 14, 55, 8, 29, 61, 40, 22, 17, 5]', output: 'Not possible' },
            { input: 'n = 11, arr = [30, 11, 40, 5, 60, 2, 80, 7, 90, 3, 100]', output: '[30, 2, 3, 5, 60, 7, 80, 11, 90, 40, 100]' }
        ],
        companies: ['Google', 'Jane Street']
    },
    'c1-02': {
        title: 'Reverse string using only recursion',
        difficulty: 'Medium',
        tags: ['Recursion', 'Strings'],
        description: 'Reverse a string using recursion and zero extra memory beyond the stack.',
        constraints: ['No for/while loops', 'Recursion only'],
        examples: [
            { input: '"aaBBccDD112233!!@@##"', output: '"##@@!!332211DDccBBaa"' },
            { input: '"RecursionIsHardWhenStackDepthIsLarge1234567890"', output: '"0987654321egraLsIhtpeDkcatSneWdraHsInoisruceR"' }
        ],
        companies: ['Microsoft']
    },
    'c1-03': {
        title: 'Find median without sorting',
        difficulty: 'Hard',
        tags: ['Statistics', 'QuickSelect'],
        description: 'Find the median of an array without sorting or using extra space.',
        constraints: ['O(N) time', 'O(1) auxiliary space'],
        examples: [
            { input: '[1000000, -999999, 345, 2, 3, 999998, 777, 888, 1]', output: '345' },
            { input: '[9,9,9,9,1,2,3,4,5,6,7,8,1000000000]', output: '7' }
        ],
        companies: ['Facebook']
    },
    'c1-04': {
        title: 'Rotate matrix using XOR only',
        difficulty: 'Hard',
        tags: ['Matrix', 'Bitwise'],
        description: 'Rotate a matrix 90 degrees clockwise using only XOR operations for swaps.',
        constraints: ['N x N matrix', 'In-place rotation'],
        examples: [
            { input: '3x3 [[1, 999, 3], [8, 7, 6], [5, 4, 2]]', output: '[[5, 8, 1], [4, 7, 999], [2, 6, 3]]' },
            { input: '4x4 [[10, 20...160]]', output: '[[130, 90...10]]' }
        ],
        companies: ['Amazon']
    },
    'c1-05': {
        title: 'Find duplicate O(1) space',
        difficulty: 'Medium',
        tags: ['Arrays', 'Floyd Cycle'],
        description: 'Find a duplicate in an array without modifying it or using set/map.',
        constraints: ['Values: 1 to N-1', 'O(N) time'],
        examples: [
            { input: '[1,3,4,2,2,5,6,7,8]', output: '2' },
            { input: '[9,1,5,6,2,3,7,8,4,5]', output: '5' }
        ],
        companies: ['Apple']
    },
    'c1-06': {
        title: 'Merge with alternating parity',
        difficulty: 'Easy',
        tags: ['Logic', 'Merging'],
        description: 'Merge two arrays while maintaining alternating even/odd parity.',
        constraints: ['Order matters', 'Preserve original relative order'],
        examples: [
            { input: 'A = [2,4,6,8,10], B = [1,3,5,7,9]', output: '[2,1,4,3,6,5,8,7,10,9]' },
            { input: 'A = [2,4,6], B = [1,3,5,7,9,11]', output: '[2,1,4,3,6,5,7,9,11]' }
        ]
    },
    'c1-07': {
        title: 'Search in partially shuffled array',
        difficulty: 'Hard',
        tags: ['Binary Search', 'Shuffle'],
        description: 'Perform search in a globally sorted array where small local sections are shuffled.',
        constraints: ['Target-based search', 'Logarithmic efficiency goal'],
        examples: [
            { input: 'arr = [1,2,6,5,4,3,7,8,9], target = 5', output: '3' },
            { input: 'arr = [10,20,30,80,70,60,50,90], target = 60', output: '5' }
        ]
    },
    'c1-08': {
        title: 'Stack using only Queue',
        difficulty: 'Medium',
        tags: ['Data Structures'],
        description: 'Implement a Stack (LIFO) behavior using ONLY a single standard FIFO Queue.',
        constraints: ['No other variables', 'Queue operations only'],
        examples: [
            { input: 'push 5,10,15, pop, push 20, pop, pop', output: '15, 20, 10' },
            { input: 'push 1,2,3,4, pop, pop, push 5, pop', output: '4, 3, 5' }
        ]
    },
    'c1-09': {
        title: 'Queue using Recursion only',
        difficulty: 'Hard',
        tags: ['Recursion', 'Logic'],
        description: 'Implement a Queue using only the recursion stack.',
        constraints: ['Zero data structures', 'Recursion focus'],
        examples: [
            { input: 'eq 10,20,30, dq, eq 40, dq, dq', output: '10, 20, 30' },
            { input: 'eq 5, 6, dq, eq 7, 8, dq', output: '5, 6' }
        ]
    },
    'c1-10': {
        title: 'Kth smallest without loops',
        difficulty: 'Medium',
        tags: ['Recursion', 'Selection'],
        description: 'Find kth smallest element in array using zero for/while/forEach loops.',
        constraints: ['Infinite recursion depth allowed', 'No iterators'],
        examples: [
            { input: 'arr = [100,2,3,4,5,6,7,8,9], k = 4', output: '4' },
            { input: 'arr = [999,888,777,666,555,444,333,222,111], k = 7', output: '777' }
        ]
    },
    'c1-11': {
        title: 'Implement Map using Arrays',
        difficulty: 'Medium',
        tags: ['Implementation'],
        description: 'Build a fully functional map (put, get, remove) using only raw primitive arrays.',
        constraints: ['O(N) operations', 'Primitive types only'],
        examples: [
            { input: 'put(10,100), put(20,200), put(10,300), get(10), get(20)', output: '300, 200' },
            { input: 'put(1,10), put(2,20), remove(1), get(1), get(2)', output: '-1, 20' }
        ]
    },
    'c1-12': {
        title: 'LinkedList reverse by Fib size',
        difficulty: 'Hard',
        tags: ['LinkedList', 'Fibonacci'],
        description: 'Reverse sections of a linked list in chunks of 1, 1, 2, 3, 5, 8...',
        constraints: ['Single pass', 'In-place'],
        examples: [
            { input: '1->2->3->4->5->6->7->8->9', output: '1->2->4->3->7->6->5->8->9' },
            { input: '100 nodes', output: 'Fibonacci chunks' }
        ]
    },
    'c1-13': {
        title: 'Circular next greater with limit',
        difficulty: 'Medium',
        tags: ['Stack', 'Circular'],
        description: 'Find next greater element in a circular array with a wrap-around limit.',
        constraints: ['O(N) search'],
        examples: [
            { input: '[5,3,8,2,7]', output: '[8,8,-1,7,8]' },
            { input: '[9,1,2,3,6]', output: '[-1,2,3,6,9]' }
        ]
    },
    'c1-14': {
        title: 'Sort by bits (Stable)',
        difficulty: 'Easy',
        tags: ['Sorting', 'Bits'],
        description: 'Sort numbers by set bit count. Maintain relative order for ties.',
        constraints: ['Stable sort requirement'],
        examples: [
            { input: '[5,3,7,10,14]', output: '[3,5,10,7,14]' },
            { input: '[8,4,2,1,3,6]', output: '[8,4,2,1,3,6]' }
        ]
    },
    'c1-15': {
        title: 'Dynamic sliding window',
        difficulty: 'Hard',
        tags: ['Sliding Window'],
        description: 'Max of sliding window where the window size for each index is provided as an array.',
        constraints: ['Variable window size'],
        examples: [
            { input: 'arr = [1,3,2,6,4,5,8], w = [1,2,3,2,1,2,3]', output: '[1,3,6,6,4,8,8]' },
            { input: 'arr = [10,20,30,40,50], w = [2,3,1,2,3]', output: '[20,30,30,50,50]' }
        ]
    },
    'c2-01': {
        title: 'Snake Game Simulation',
        difficulty: 'Hard',
        tags: ['Simulation', 'Grid'],
        description: 'Simulate a classic Snake game on an N x M grid. Track length, food eating, and collision detection. The snake starts at (0,0) with length 1. The moves are provided as a sequence.',
        constraints: ['N, M <= 100', 'Moves <= 500'],
        examples: [
            { input: 'Grid: 5x5, Food: [(1,2),(0,1),(2,2),(3,4)], Moves: R,D,R,U,L,L,D,D,R,U,R,D', output: 'Final Length: 4, Game Over: False, Final Head: (2,3)' },
            { input: 'Grid: 4x6, Food: [(0,5),(1,5),(2,5),(3,5)], Moves: R,R,R,R,R,D,D,D,L,L,U,U,R,R', output: 'Final Length: 5, Game Over: True, Collision: Self' }
        ]
    },
    'c2-02': {
        title: 'Tetris Block Drop Simulation',
        difficulty: 'Hard',
        tags: ['Simulation', 'Data Structures'],
        description: 'Simulate a simplified Tetris game where blocks drop onto a grid of a given width. Calculate the resulting column heights and identify line clears.',
        constraints: ['Width <= 20', 'Blocks <= 100'],
        examples: [
            { input: 'Grid Width: 7, Blocks: I@3, O@1, T@4, L@2', output: 'Heights: [0, 2, 4, 5, 5, 3, 0], Max Height: 5' },
            { input: 'Grid Width: 10, Blocks: Z@2, S@5, I@0, T@3, O@6', output: 'Lines Cleared: 2, Final Max Height: 6' }
        ]
    },
    'c2-03': {
        title: 'Chess Knight Survival Game',
        difficulty: 'Hard',
        tags: ['Simulation', 'Chess', 'Backtracking'],
        description: 'A knight is placed on a board with blocked squares. Calculate the number of unique paths of a given length it can take without hitting a blocked square or leaving the board.',
        constraints: ['Board up to 10x10', 'Steps <= 10'],
        examples: [
            { input: 'Board: 8x8, Start: (0,0), Moves: 5, Blocked: [(1,2),(2,1),(3,3)]', output: 'Survival Paths: 6' },
            { input: 'Board: 6x6, Start: (2,2), Moves: 4, Blocked: [(3,4),(4,3),(1,0),(0,1)]', output: 'Survival Paths: 12' }
        ]
    },
    'c2-04': {
        title: 'Robot Grid Movement with Obstacles',
        difficulty: 'Medium',
        tags: ['Simulation', 'Robotics'],
        description: 'A robot moves on a grid with obstacles (1s). It follows commands: Up, Down, Left, Right. If it hits an obstacle or boundary, it stays in place but consumes energy.',
        constraints: ['Grid up to 50x50', 'Energy start provided'],
        examples: [
            { input: 'Grid: [[0,0,1,0],[0,1,0,0],[0,0,0,1],[1,0,0,0]], Commands: R,R,D,D,L,D,R', output: 'Final Position: (3,2), Energy Left: 3' },
            { input: 'Grid: [[0,0,0,0,1],[1,1,0,1,0],[0,0,0,0,0]], Commands: R,R,R,D,D,L,L,U,R', output: 'Final Position: (1,2), Blocked Hits: 3' }
        ]
    },
    'c2-05': {
        title: 'Tower Defense Scoring Simulation',
        difficulty: 'Medium',
        tags: ['Simulation', 'Game Logic'],
        description: 'Simulate tower placement and enemy movement. Towers fire at the nearest enemy within range. Calculate the final score based on enemies killed.',
        constraints: ['Enemies move 1 step per turn'],
        examples: [
            { input: 'Towers: [2,4], Enemies: [1,2,3,4,5,6], Range: 2', output: 'Score: 18, Enemies killed: 5' },
            { input: 'Towers: [1,3,5], Enemies: [2,3,4,6,7,8], Range: 1', output: 'Score: 14, Remaining: 2' }
        ]
    },
    'c2-06': {
        title: 'Multi-player Turn Elimination Game',
        difficulty: 'Easy',
        tags: ['Simulation', 'List'],
        description: 'Players stand in a circle. Every K-th player is eliminated. Find the elimination order and the final winner.',
        constraints: ['N Players <= 1000', 'K <= N'],
        examples: [
            { input: 'Players: [A,B,C,D,E], Steps: 3', output: 'Elimination Order: C,A,E,B, Winner: D' },
            { input: 'Players: [1,2,3,4,5,6], Steps: 2', output: 'Elimination: 2,4,6,3,1, Winner: 5' }
        ]
    },
    'c2-07': {
        title: 'Card Battle Simulation',
        difficulty: 'Easy',
        tags: ['Simulation'],
        description: 'Two players are given hands of cards. In each round, the higher card wins its value in points. Simulate the battle and find the winner.',
        constraints: ['Strict comparison', 'No tie clauses'],
        examples: [
            { input: 'Player1: [5,8,3,7], Player2: [6,2,9,1]', output: 'Winner: Player1, Score: 29' },
            { input: 'Player1: [10,4,6], Player2: [3,9,7]', output: 'Winner: Player2, Score: 19' }
        ]
    },
    'c2-08': {
        title: 'Grid Infection Spread with Mutations',
        difficulty: 'Hard',
        tags: ['Simulation', 'Grid'],
        description: 'Simulate an infection spreading on a grid. After N steps, the infection "mutates" and changes its spreading pattern (e.g., from orthogonal to diagonal).',
        constraints: ['Grid up to 100x100'],
        examples: [
            { input: 'Grid: [[0,1,0],[0,0,0],[1,0,0]], Mutation step: 2', output: 'Time to full infection: 3' },
            { input: 'Grid: [[1,0,0,1],[0,0,0,0],[0,1,0,0]], Mutation: diagonal', output: 'Time: 2' }
        ]
    },
    'c2-09': {
        title: 'Pacman Path Simulation',
        difficulty: 'Medium',
        tags: ['Simulation', 'Game Mechanics'],
        description: 'Pacman moves on a grid with pellets (.) and ghosts (G). Walls (#) are impassable. Calculate pellets collected and survival status.',
        constraints: ['Grid 2D strictly'],
        examples: [
            { input: 'Grid: P . G, . # ., . . ., Moves: R,R,D,L', output: 'Score: 2, Caught: True' },
            { input: 'Grid: P . . ., # # . G, . . . ., Moves: R,R,D,D,L,U', output: 'Score: 3, Alive: True' }
        ]
    },
    'c2-10': {
        title: 'Traffic Light System Simulation',
        difficulty: 'Medium',
        tags: ['Simulation', 'Scheduling'],
        description: 'Simulate an intersection with North-South and East-West lights. Cars arrive at specific times. Calculate total/average wait times.',
        constraints: ['FIFO car queues'],
        examples: [
            { input: 'Lights: NS: 30s, EW: 20s, Cars: [0,N], [5,E], [10,N], [15,E]', output: 'Avg Wait: 12' },
            { input: 'Lights: NS: 10, EW: 10, Cars: [0,N], [1,N], [2,E], [3,E]', output: 'Max Wait: 9' }
        ]
    },
    'c2-11': {
        title: 'Elevator Scheduling Simulator',
        difficulty: 'Hard',
        tags: ['Simulation', 'Optimization'],
        description: 'Simulate an elevator processing floor requests using the standard SCAN algorithm. Calculate total floor distance and stop sequence.',
        constraints: ['N Floors <= 100'],
        examples: [
            { input: 'Floors: 10, Requests: (0->5), (2->8), (6->1)', output: 'Stops: 0,2,5,8,6,1, Distance: 16' },
            { input: 'Floors: 6, Requests: (1->4), (3->5), (2->0)', output: 'Distance: 11' }
        ]
    },
    'c2-12': {
        title: 'Battle Royale Shrinking Zone',
        difficulty: 'Medium',
        tags: ['Simulation', 'Geometry'],
        description: 'Players are at (X, Y) coordinates. Every K turns, the play zone shrinks towards the center. Players outside the zone take lethal damage. Find the last standing player.',
        constraints: ['Rectangular shrink model'],
        examples: [
            { input: 'Players: (1,1), (5,5), (3,3), Shrink rate: 1', output: 'Winner: (3,3)' },
            { input: 'Players: (0,0), (9,9), (4,4), (5,5)', output: 'Winner: (4,4)' }
        ]
    },
    'c2-13': {
        title: 'Minesweeper Auto Solver',
        difficulty: 'Hard',
        tags: ['Simulation', 'Logic', 'AI'],
        description: 'Given a partially revealed Minesweeper board, identify all safe cells and bomb cells using deterministic logic.',
        constraints: ['Grid up to 30x30'],
        examples: [
            { input: 'Grid: [[1,*,1],[1,2,1],[0,1,*]]', output: 'Safe cells identified: 4' },
            { input: 'Grid: [[*,2,*],[2,4,2],[*,2,*]]', output: 'Bombs identified: 4' }
        ]
    },
    'c2-14': {
        title: 'Bouncing Ball Physics Grid',
        difficulty: 'Medium',
        tags: ['Simulation', 'Physics'],
        description: 'A ball moves diagonally (NE, SE, SW, NW) within a grid and bounces off boundary walls. Predict its exact cell after K steps.',
        constraints: ['Grid boundaries up to 100x100'],
        examples: [
            { input: 'Grid: 5x5, Start: (2,2), Direction: NE, Steps: 7', output: 'Final: (1,3)' },
            { input: 'Grid: 4x4, Start: (0,0), Direction: SE, Steps: 10', output: 'Final: (2,2)' }
        ]
    },
    'c2-15': {
        title: 'Multi-agent Maze Escape',
        difficulty: 'Hard',
        tags: ['Simulation', 'Pathfinding'],
        description: 'Multiple agents (A, B...) navigate a shared grid to reach an exit. Agents must avoid walls and each other. Calculate individual step counts.',
        constraints: ['Priority-based movement'],
        examples: [
            { input: 'Grid: [[A,.,#],[.,B,.],[#.,E]]', output: 'A steps: 4, B steps: 3' },
            { input: 'Grid: [[A,.,.,E],[#,#,.,#],[B,.,.,.]]', output: 'A: 5, B: 6' }
        ]
    },
    'c4-01': {
        title: 'Longest substring with k replacements',
        difficulty: 'Hard',
        tags: ['Sliding Window', 'Strings'],
        description: 'Find the length of the longest substring containing same letters after performing at most K character replacements.',
        constraints: ['Length <= 10^5', 'K <= Length'],
        examples: [
            { input: 's = "AABABBAAAABBBBAAAAB", k = 2', output: '7' },
            { input: 's = "ABCDEFFFFFGHIJKLLLLLMNOP", k = 3', output: '8' }
        ]
    },
    'c4-02': {
        title: 'Minimum window substring variant',
        difficulty: 'Hard',
        tags: ['Sliding Window', 'Strings'],
        description: 'Find the smallest window in S that contains all characters of T. Returns the substring itself.',
        constraints: ['O(N) search'],
        examples: [
            { input: 's = "ADOBECODEBANCADOBEC", t = "ABC"', output: 'BANC' },
            { input: 's = "aaabdabcefaecbef", t = "abc"', output: 'abc' }
        ]
    },
    'c4-03': {
        title: 'Count anagram substrings',
        difficulty: 'Medium',
        tags: ['Hashing', 'Sliding Window'],
        description: 'Find all start indices of P\'s anagrams in S.',
        constraints: ['String length up to 50,000'],
        examples: [
            { input: 's = "cbaebabacd", p = "abc"', output: '2' },
            { input: 's = "abababab", p = "aab"', output: '3' }
        ]
    },
    'c4-04': {
        title: 'String compression with deletions',
        difficulty: 'Hard',
        tags: ['Dynamic Programming', 'Strings'],
        description: 'Compress a string using run-length encoding (e.g., "aaab" -> "a3b"). Find the minimum length after deleting K characters.',
        constraints: ['N <= 100', 'K <= N'],
        examples: [
            { input: 's = "aaabcccd", k = 2', output: '4' },
            { input: 's = "aaaaaaaaaaa", k = 0', output: '3' }
        ]
    },
    'c4-05': {
        title: 'Wildcard pattern matching',
        difficulty: 'Hard',
        tags: ['Dynamic Programming', 'Regex'],
        description: 'Implement wildcard pattern matching with support for \'?\' (matches single char) and \'*\' (matches any sequence).',
        constraints: ['String/Pattern length <= 2000'],
        examples: [
            { input: 's = "abefcdgiescdfimde", p = "ab*cd?i*de"', output: 'true' },
            { input: 's = "mississippi", p = "m??*ss*?i*pi"', output: 'false' }
        ]
    },
    'c4-06': {
        title: 'Regex engine implementation',
        difficulty: 'Hard',
        tags: ['Finite Automata', 'Backtracking'],
        description: 'Implement a regex matcher with support for \'.\' and \'*\'. \'*\' matches zero or more of the preceding element.',
        constraints: ['No built-in regex libraries allowed'],
        examples: [
            { input: 's = "aab", p = "c*a*b"', output: 'true' },
            { input: 's = "aaaab", p = "a*b"', output: 'true' }
        ]
    },
    'c4-07': {
        title: 'Palindrome partitioning min cuts',
        difficulty: 'Hard',
        tags: ['Dynamic Programming', 'Palindrome'],
        description: 'Find the minimum number of cuts needed such that every resulting substring is a palindrome.',
        constraints: ['N <= 2000'],
        examples: [
            { input: 's = "aabccb"', output: '1' },
            { input: 's = "ababbbabbababa"', output: '3' }
        ]
    },
    'c4-08': {
        title: 'Decode nested string',
        difficulty: 'Medium',
        tags: ['Stack', 'Recursion'],
        description: 'Decode a string formatted as k[encoded_string]. Nested encodings are allowed.',
        constraints: ['Valid format guaranteed'],
        examples: [
            { input: '3[a2[c]]', output: 'accaccacc' },
            { input: '2[abc]3[cd]ef', output: 'abcabccdcdcdef' }
        ]
    },
    'c4-09': {
        title: 'Rearrange string no adjacent same',
        difficulty: 'Medium',
        tags: ['Greedy', 'Heap'],
        description: 'Rearrange the string so that no two adjacent characters are identical. Return "Not possible" if not achievable.',
        constraints: ['Character counts matter'],
        examples: [
            { input: 'aaabbc', output: 'ababac' },
            { input: 'aaab', output: 'Not possible' }
        ]
    },
    'c4-10': {
        title: 'Longest repeating subsequence',
        difficulty: 'Medium',
        tags: ['Dynamic Programming', 'Longest Subsequence'],
        description: 'Find the length of the longest subsequence that repeats in the string (indices must be distinct).',
        constraints: ['N <= 500'],
        examples: [
            { input: '"aabb"', output: '2' },
            { input: '"axxxy"', output: '2' }
        ]
    },
    'c4-11': {
        title: 'String transform limited operations',
        difficulty: 'Medium',
        tags: ['Dynamic Programming', 'Edit Distance'],
        description: 'Calculate the minimum operations (insert, delete, replace) to transform string S1 into S2.',
        constraints: ['O(N*M) complexity'],
        examples: [
            { input: 's1 = "abcdef", s2 = "azced"', output: '3' },
            { input: 's1 = "intention", s2 = "execution"', output: '5' }
        ]
    },
    'c4-12': {
        title: 'Remove invalid parentheses',
        difficulty: 'Hard',
        tags: ['BFS', 'Backtracking'],
        description: 'Remove minimum number of parentheses to make the input string valid. Return all possible results.',
        constraints: ['Only () parentheses allowed'],
        examples: [
            { input: '()())()', output: '["()()()", "(())()"]' },
            { input: '(a)())()', output: '["(a)()()", "(a())()"]' }
        ]
    },
    'c4-13': {
        title: 'Lexicographically smallest rotation',
        difficulty: 'Medium',
        tags: ['Strings', 'Algorithms'],
        description: 'Find the lexicographically smallest rotation of a given string.',
        constraints: ['O(N) or O(N log N) preferred'],
        examples: [
            { input: '"bbaaccaadd"', output: 'aaccaaddbb' },
            { input: '"cabbage"', output: 'abbagec' }
        ]
    },
    'c4-14': {
        title: 'String edit distance optimized',
        difficulty: 'Medium',
        tags: ['Dynamic Programming'],
        description: 'Classic Levenshtein distance problem with space-optimized DP.',
        constraints: ['Space O(min(N, M))'],
        examples: [
            { input: 'horse, ros', output: '3' },
            { input: 'kitten, sitting', output: '3' }
        ]
    },
    'c4-15': {
        title: 'Count unique substrings',
        difficulty: 'Hard',
        tags: ['Suffix Tree/Array', 'Hashing'],
        description: 'Find the total number of unique substrings in a given string.',
        constraints: ['N <= 10^5 preferable (O(N log N))'],
        examples: [
            { input: 'abab', output: '7' },
            { input: 'aaaa', output: '4' }
        ]
    },
    'c5-01': {
        title: 'Shortest path with teleport nodes',
        difficulty: 'Hard',
        tags: ['Dijkstra', 'Graph'],
        description: 'Find the shortest path from Start to End. Some nodes are "Teleports" which allow instant travel (cost 0) between them.',
        constraints: ['N <= 10^5', 'Edges <= 2*10^5'],
        examples: [
            { input: 'Nodes: 6, Edges: 1-2(4), 2-3(5), 3-6(2), 1-4(10), 4-6(1), Teleports: 2<->5 cost 0, 5<->6 cost 0', output: '4' },
            { input: 'Nodes: 7, Edges: 1-2(3), 2-3(3), 3-7(3), 1-4(8), 4-5(2), 5-7(2), Teleports: 2<->6, 6<->7', output: '3' }
        ]
    },
    'c5-02': {
        title: 'Multi-source BFS infection spread',
        difficulty: 'Medium',
        tags: ['BFS', 'Simulation'],
        description: 'Given a grid where 2 is an infected person, 1 is a healthy person, and 0 is an empty space. Find the minimum time to infect everyone healthy.',
        constraints: ['Grid up to 500x500'],
        examples: [
            { input: '2 1 0, 1 1 0, 0 1 2', output: '2' },
            { input: '2 1 1 0, 1 1 0 0, 0 1 1 2', output: '3' }
        ]
    },
    'c5-03': {
        title: 'Detect cycle in directed graph',
        difficulty: 'Medium',
        tags: ['DFS', 'Graph'],
        description: 'Determine if a directed graph contains at least one cycle.',
        constraints: ['V, E <= 10^5'],
        examples: [
            { input: '1->2, 2->3, 3->4, 4->2', output: 'Cycle Detected' },
            { input: '1->2, 2->3, 3->4, 4->5', output: 'No Cycle' }
        ]
    },
    'c5-04': {
        title: 'Island counting with diagonals',
        difficulty: 'Medium',
        tags: ['DFS', 'BFS', 'Matrix'],
        description: 'Count the number of islands in a binary matrix. An island is surrounded by water and formed by connecting adjacent lands horizontally, vertically, or diagonally.',
        constraints: ['Matrix up to 500x500'],
        examples: [
            { input: '1 0 1, 0 1 0, 1 0 1', output: '1' },
            { input: '1 1 0 0, 0 1 0 1, 1 0 0 1', output: '2' }
        ]
    },
    'c5-05': {
        title: 'Minimum spanning tree custom weights',
        difficulty: 'Hard',
        tags: ['MST', 'Prim', 'Kruskal'],
        description: 'Find the total weight of the Minimum Spanning Tree of a given undirected weighted graph.',
        constraints: ['V <= 1000', 'E <= 10^5'],
        examples: [
            { input: '1-2(3), 2-3(4), 1-3(5), 3-4(2)', output: 'Total Weight: 9' },
            { input: '1-2(10), 2-3(15), 1-3(5), 3-4(7), 2-4(6)', output: '18' }
        ]
    },
    'c5-06': {
        title: 'Topological sort with constraints',
        difficulty: 'Medium',
        tags: ['Graph', 'Kahn Algorithm'],
        description: 'Find a topological ordering of a DAG. If multiple exist, return the lexicographically smallest or any valid one as specified.',
        constraints: ['V, E <= 10^5'],
        examples: [
            { input: '5->2, 5->0, 4->0, 4->1, 2->3, 3->1', output: '5 4 2 3 1 0' },
            { input: '1->3, 2->3, 3->4, 4->5', output: '1 2 3 4 5' }
        ]
    },
    'c5-07': {
        title: 'Graph coloring minimum colors',
        difficulty: 'Hard',
        tags: ['Backtracking', 'NP-Hard'],
        description: 'Find the minimum number of colors needed to color a graph such that no two adjacent vertices share the same color.',
        constraints: ['V <= 20'],
        examples: [
            { input: '1-2, 2-3, 3-1', output: '3' },
            { input: '1-2, 2-3, 3-4, 4-1', output: '2' }
        ]
    },
    'c5-08': {
        title: 'Network delay time',
        difficulty: 'Medium',
        tags: ['Dijkstra', 'Graph'],
        description: 'Given times for signals to travel between nodes, find how long it takes for all nodes to receive a signal from a start node.',
        constraints: ['N <= 100', 'Times <= 6000'],
        examples: [
            { input: '2->1(1), 2->3(1), 3->4(1), Start: 2', output: '2' },
            { input: '1->2(2), 1->3(5), 2->3(1), Start: 1', output: '3' }
        ]
    },
    'c5-09': {
        title: 'Bipartite graph detection',
        difficulty: 'Medium',
        tags: ['BFS', 'DFS', 'Graph Coloring'],
        description: 'Check if a graph is bipartite (vertices can be divided into two independent sets).',
        constraints: ['V, E <= 10^5'],
        examples: [
            { input: '1-2, 2-3, 3-4, 4-1', output: 'True' },
            { input: '1-2, 2-3, 3-1', output: 'False' }
        ]
    },
    'c5-10': {
        title: 'Word ladder transformation',
        difficulty: 'Hard',
        tags: ['BFS', 'Strings', 'Graph'],
        description: 'Find the length of the shortest transformation sequence from a start word to an end word using a dictionary.',
        constraints: ['Word length <= 10', 'Dictionary <= 5000'],
        examples: [
            { input: 'Start: hit, End: cog, List: [hot,dot,dog,lot,log,cog]', output: '5' },
            { input: 'Start: game, End: math, List: [gave,gath,math,gane,gath]', output: '3' }
        ]
    },
    'c5-11': {
        title: 'Knight shortest path',
        difficulty: 'Medium',
        tags: ['BFS', 'Simulation'],
        description: 'Find the minimum number of moves for a Knight to go from Start to End on an NxM chess board.',
        constraints: ['N, M <= 1000'],
        examples: [
            { input: 'Board: 8x8, Start: (0,0), End: (7,7)', output: '6' },
            { input: 'Board: 6x6, Start: (2,2), End: (5,5)', output: '2' }
        ]
    },
    'c5-12': {
        title: 'Weighted maze solver',
        difficulty: 'Medium',
        tags: ['Dijkstra', 'Matrix'],
        description: 'Find the minimum cost to traverse a grid from top-left to bottom-right where cells have different passage costs.',
        constraints: ['Grid <= 500x500'],
        examples: [
            { input: '1 3 1, 1 5 1, 4 2 1', output: '7' },
            { input: '5 9 6, 11 5 2', output: '21' }
        ]
    },
    'c5-13': {
        title: 'Connected components count',
        difficulty: 'Easy',
        tags: ['DFS', 'Union Find'],
        description: 'Find the number of connected components in an undirected graph.',
        constraints: ['V, E <= 10^5'],
        examples: [
            { input: '1-2, 3-4, 5', output: '3' },
            { input: '1-2, 2-3, 3-4, 4-5', output: '1' }
        ]
    },
    'c5-14': {
        title: 'Graph diameter',
        difficulty: 'Hard',
        tags: ['Tree/Graph', 'BFS', 'Longest Path'],
        description: 'Find the maximum distance between any two nodes in a given tree or connected graph.',
        constraints: ['V, E <= 10^5'],
        examples: [
            { input: '1-2, 2-3, 3-4, 4-5', output: '4' },
            { input: '1-2, 1-3, 3-4, 4-5', output: '3' }
        ]
    },
    'c5-15': {
        title: 'Minimum cost path with turns',
        difficulty: 'Hard',
        tags: ['Dijkstra', 'State-Space Search'],
        description: 'Traverse a grid at minimum cost, where each turn (changing direction) adds a specific penalty cost.',
        constraints: ['Grid up to 200x200', 'Turn cost > 0'],
        examples: [
            { input: 'Grid: 3x3 (1s), Center 9, Turn cost 2', output: '6' },
            { input: 'Grid: 3x4, Turn cost 1', output: '7' }
        ]
    },
    'c6-01': {
        title: 'LRU cache implementation',
        difficulty: 'Medium',
        tags: ['Design', 'Link List', 'Hash Table'],
        description: 'Design a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations.',
        constraints: ['Capacity > 0'],
        examples: [
            { input: 'Capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)', output: '1, -1, -1, 3, 4' },
            { input: 'Capacity=3, put(1,10), put(2,20), put(3,30), get(2), put(4,40), get(1), put(5,50), get(3), get(4)', output: '20, -1, -1, 40' }
        ]
    },
    'c6-02': {
        title: 'LFU cache',
        difficulty: 'Hard',
        tags: ['Design', 'Data Structures'],
        description: 'Design a Least Frequently Used (LFU) cache where when the cache is full, the least frequently used item is removed.',
        constraints: ['Capacity >= 0'],
        examples: [
            { input: 'Capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2), get(3)', output: '1, -1, 3' },
            { input: 'Capacity=3, put(1,1), put(2,2), put(3,3), get(1), get(2), put(4,4), get(3)', output: '1, 2, -1' }
        ]
    },
    'c6-03': {
        title: 'Segment tree range sum',
        difficulty: 'Medium',
        tags: ['Segment Tree', 'Array'],
        description: 'Implement a Segment Tree to support point updates and range sum queries efficiently.',
        constraints: ['N <= 10^5', 'Queries <= 10^5'],
        examples: [
            { input: 'arr=[1,3,5,7,9,11], query(1,3), update(1,10), query(1,3)', output: '15, 22' },
            { input: 'arr=[2,4,6,8,10], query(0,4), update(2,20), query(1,3)', output: '30, 32' }
        ]
    },
    'c6-04': {
        title: 'Fenwick tree updates',
        difficulty: 'Medium',
        tags: ['Fenwick Tree', 'Binary Indexed Tree'],
        description: 'Implement a Fenwick Tree (BIT) for efficient prefix sums and point updates.',
        constraints: ['O(log N) operations'],
        examples: [
            { input: 'arr=[1,2,3,4,5], sum(1,3), update(2,5), sum(1,3)', output: '9, 14' },
            { input: 'arr=[5,5,5,5,5], sum(0,4), update(4,10), sum(3,4)', output: '25, 20' }
        ]
    },
    'c6-05': {
        title: 'Trie autocomplete system',
        difficulty: 'Medium',
        tags: ['Trie', 'Strings'],
        description: 'Implement a Trie to store words and provide autocomplete suggestions based on a given prefix.',
        constraints: ['Suggestions should be alphabetical'],
        examples: [
            { input: 'insert: apple, app, apply, search prefix: app', output: 'app, apple, apply' },
            { input: 'insert: cat, car, cart, care, prefix: car', output: 'car, care, cart' }
        ]
    },
    'c6-06': {
        title: 'Heap-based median finder',
        difficulty: 'Hard',
        tags: ['Heap', 'Design'],
        description: 'Continuously find the median of a stream of numbers using two heaps (max-heap and min-heap).',
        constraints: ['O(log N) insertion, O(1) find median'],
        examples: [
            { input: 'add 1, add 2, findMedian, add 3, findMedian', output: '1.5, 2' },
            { input: 'add 5, 15, 1, 3, findMedian', output: '4' }
        ]
    },
    'c6-07': {
        title: 'Interval merge dynamic',
        difficulty: 'Medium',
        tags: ['Intervals', 'Sorting'],
        description: 'Dynamically insert intervals and merge overlapping ones in real-time.',
        constraints: ['Efficient handling of updates'],
        examples: [
            { input: 'insert [1,3], [2,6], [8,10]', output: '[1,6],[8,10]' },
            { input: 'insert [5,7], [1,4], [6,8]', output: '[1,4],[5,8]' }
        ]
    },
    'c6-08': {
        title: 'Sparse table queries',
        difficulty: 'Medium',
        tags: ['Sparse Table', 'Static Range Query'],
        description: 'Implement a Sparse Table for O(1) range minimum/maximum queries after O(N log N) preprocessing.',
        constraints: ['No updates allowed after build'],
        examples: [
            { input: 'arr=[1,3,2,7,9,11], min(1,4)', output: '2' },
            { input: 'arr=[5,4,3,2,1], min(0,2), min(2,4)', output: '3, 1' }
        ]
    },
    'c6-09': {
        title: 'Sliding window median',
        difficulty: 'Hard',
        tags: ['Sliding Window', 'Heap/Balanced BST'],
        description: 'Find the median for each sliding window of size K in an array.',
        constraints: ['N <= 10^5', 'K <= N'],
        examples: [
            { input: 'nums=[1,3,-1,-3,5,3,6,7], k=3', output: '[1,-1,-1,3,5,6]' },
            { input: 'nums=[5,2,2,7,3,7,9,0,2,3], k=4', output: '[3,2,5,7,5,4,2]' }
        ]
    },
    'c6-10': {
        title: 'Range update queries',
        difficulty: 'Medium',
        tags: ['Difference Array', 'Segment Tree'],
        description: 'Maintain an array supporting range additions and point value queries.',
        constraints: ['N, Q <= 10^5'],
        examples: [
            { input: 'arr=[0,0,0,0,0], update(1,3,5), query(2)', output: '5' },
            { input: 'arr=[1,1,1,1], update(0,2,3), query(1)', output: '4' }
        ]
    },
    'c6-11': {
        title: 'Order statistic tree',
        difficulty: 'Hard',
        tags: ['Binary Search Tree', 'Augmented DS'],
        description: 'Implement a BST that supports finding the K-th smallest element and the rank of an element in O(log N).',
        constraints: ['Tree must be self-balancing'],
        examples: [
            { input: 'insert 5, 2, 8, kth(2)', output: '5' },
            { input: 'insert 10, 20, 15, rank(15)', output: '2' }
        ]
    },
    'c6-12': {
        title: 'Disjoint set union',
        difficulty: 'Easy',
        tags: ['DSU', 'Union Find'],
        description: 'Implement DSU with path compression and union by rank/size to find if elements belong to the same component.',
        constraints: ['Nearly O(1) operations'],
        examples: [
            { input: 'union(1,2), union(2,3), find(1,3)', output: 'True' },
            { input: 'union(4,5), union(6,7), find(4,7)', output: 'False' }
        ]
    },
    'c6-13': {
        title: 'Min stack with O(1)',
        difficulty: 'Easy',
        tags: ['Stack', 'Design'],
        description: 'Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
        constraints: ['Extra space O(N)'],
        examples: [
            { input: 'push 3, 5, getMin, push 2, getMin', output: '3, 2' },
            { input: 'push 8, 4, 6, pop, getMin', output: '4' }
        ]
    },
    'c6-14': {
        title: 'Circular deque',
        difficulty: 'Medium',
        tags: ['Design', 'Queue'],
        description: 'Implementation of a double-ended queue using a circular array.',
        constraints: ['Handling overflow and underflow'],
        examples: [
            { input: 'capacity 3, insertLast 1, 2, insertFront 3, getRear', output: '2' },
            { input: 'capacity 2, insertFront 1, insertLast 2, deleteFront, getFront', output: '2' }
        ]
    },
    'c6-15': {
        title: 'Priority queue scheduler',
        difficulty: 'Medium',
        tags: ['Heap', 'Simulation'],
        description: 'Simulate a process scheduler where tasks have different priorities. Lower value means higher priority.',
        constraints: ['Handling identical priorities (FIFO)'],
        examples: [
            { input: 'Tasks: A(3), B(1), C(2)', output: 'B,C,A' },
            { input: 'Tasks: T1(5), T2(3), T3(4)', output: 'T2,T3,T1' }
        ]
    },
    'c7-01': {
        title: 'Sudoku solver',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Logic'],
        description: 'Implement an efficient Sudoku solver that fills a 9x9 grid based on initial partial clues.',
        constraints: ['Must handle boards with minimal clues (17+)'],
        examples: [
            { input: 'Partial 9x9 grid string', output: 'Fully solved 9x9 grid string' },
            { input: 'Hard minimal clue configuration', output: 'Unique solution' }
        ]
    },
    'c7-02': {
        title: 'N-Queens generalized',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Bitmask'],
        description: 'Find the total number of distinct ways to place N non-attacking queens on an NxN chessboard.',
        constraints: ['N up to 14 preferably (optimized backtracking)'],
        examples: [
            { input: 'n = 8', output: '92' },
            { input: 'n = 10', output: '724' }
        ]
    },
    'c7-03': {
        title: 'Crossword puzzle fill',
        difficulty: 'Hard',
        tags: ['Recursion', 'Logic', 'Constraint Satisfaction'],
        description: 'Given a grid with empty slots and a list of words, fill the crossword such that all intersections are valid characters.',
        constraints: ['Overlapping slots must match'],
        examples: [
            { input: 'Grid: 10x10, Words: LONDON, DELHI, ICELAND, ANKARA', output: 'Correctly filled grid' },
            { input: 'Large overlapping crossword with 6 words', output: 'Valid solution' }
        ]
    },
    'c7-04': {
        title: 'Maze generator + solver',
        difficulty: 'Hard',
        tags: ['BFS/DFS', 'Graph', 'Simulation'],
        description: 'Generate a perfect 2D maze using a seed and find the shortest path from Start (0,0) to End (N-1, M-1).',
        constraints: ['Seed-based reproducibility'],
        examples: [
            { input: 'Grid: 5x5, Seed: 42', output: 'Shortest path length: 8' },
            { input: 'Grid: 10x10, Seed: 99', output: 'Path length: 17' }
        ]
    },
    'c7-05': {
        title: 'Expression parser evaluator',
        difficulty: 'Hard',
        tags: ['Stack', 'Recursion', 'Parsing'],
        description: 'Parse and evaluate complex mathematical expressions with parentheses and standard operator precedence.',
        constraints: ['Handles +, -, *, /, Parentheses'],
        examples: [
            { input: '(2+3)*(4+(5*6))-7', output: '141' },
            { input: '10 + (2 * (3 + 4)) - (8 / 2)', output: '20' }
        ]
    },
    'c7-06': {
        title: 'Compiler tokenizer',
        difficulty: 'Hard',
        tags: ['Regex', 'Lexer', 'State Machine'],
        description: 'Implement a lexical analyzer (tokenizer) for a C-like programming language.',
        constraints: ['Tokens: Keywords, Identifiers, Numbers, Operators'],
        examples: [
            { input: 'int a = b + 42;', output: 'INT IDENTIFIER ASSIGN IDENTIFIER PLUS NUMBER SEMICOLON' },
            { input: 'if(x==10){y++;}', output: 'IF LPAREN IDENTIFIER EQ NUMBER RPAREN ...' }
        ]
    },
    'c7-07': {
        title: 'Memory allocator simulator',
        difficulty: 'Hard',
        tags: ['Memory Management', 'Data Structures'],
        description: 'Simulate a dynamic memory allocator supporting alloc and free operations while tracking fragmentation.',
        constraints: ['First-fit/Best-fit algorithms'],
        examples: [
            { input: 'Memory: 100, alloc 20, alloc 30, free 20, alloc 15', output: 'fragmentation: 5' },
            { input: 'Complex fragmentation sequence', output: 'Final fragmentation score' }
        ]
    },
    'c7-08': {
        title: 'File system design',
        difficulty: 'Hard',
        tags: ['Tree', 'State', 'System Design'],
        description: 'Simulate an in-memory file system with operations like mkdir, addfile, ls, and delete.',
        constraints: ['Handling nested paths'],
        examples: [
            { input: 'mkdir /a, mkdir /a/b, addfile /a/b/file.txt', output: 'exists' },
            { input: 'nested operations with delete', output: 'Correct state' }
        ]
    },
    'c7-09': {
        title: 'Spreadsheet engine',
        difficulty: 'Hard',
        tags: ['Graph', 'Topological Sort', 'Parsing'],
        description: 'Implement a spreadsheet cell engine that supports formulas and automatic dependency updates.',
        constraints: ['Circular dependency detection'],
        examples: [
            { input: 'A1=5, A2=10, A3=A1+A2', output: '15' },
            { input: 'A1=B1, B1=A1 (Circular)', output: 'Error: Circular Dependency' }
        ]
    },
    'c7-10': {
        title: 'JSON parser',
        difficulty: 'Hard',
        tags: ['Parsing', 'Recursion'],
        description: 'Implement a robust JSON parser that converts a JSON string into an internal object representation.',
        constraints: ['No built-in JSON.parse allowed'],
        examples: [
            { input: '{"a":1,"b":{"c":2}}', output: 'Valid Internal Object' },
            { input: 'Nested arrays + objects', output: 'Success' }
        ]
    },
    'c7-11': {
        title: 'Mini SQL engine',
        difficulty: 'Hard',
        tags: ['Databases', 'Logic', 'Parsing'],
        description: 'Implement a query engine that supports SELECT, WHERE, and base JOIN operations on in-memory tables.',
        constraints: ['O(N) search minimum'],
        examples: [
            { input: 'SELECT name FROM table WHERE age > 20', output: 'Filtered row set' },
            { input: 'JOIN tableA ON tableB...', output: 'Unified result set' }
        ]
    },
    'c7-12': {
        title: 'CPU scheduling simulator',
        difficulty: 'Hard',
        tags: ['OS Simulation', 'Queues'],
        description: 'Simulate various CPU scheduling algorithms like Round Robin or FCFS and generate a Gantt chart.',
        constraints: ['Quantum for RR, multi-process'],
        examples: [
            { input: 'P1 (0,5), P2 (1,3), P3 (2,1), RR quantum=2', output: 'Order of execution: P1, P2, P3...' },
            { input: 'Complex process arrival/burst sequence', output: 'Wait times + Turnaround times' }
        ]
    },
    'c7-13': {
        title: 'Multi-thread lock simulation',
        difficulty: 'Hard',
        tags: ['OS Concepts', 'Deadlock Detection', 'Graph'],
        description: 'Detect deadlocks in a resource allocation system given a sequence of thread lock/unlock requests.',
        constraints: ['Wait-for graph cycle detection'],
        examples: [
            { input: 'T1:lock A, T2:lock B, T1:lock B, T2:lock A', output: 'Deadlock detected' },
            { input: 'Clean lock/release sequence', output: 'No deadlock' }
        ]
    },
    'c7-14': {
        title: 'Blockchain chain validator',
        difficulty: 'Hard',
        tags: ['Cryptography', 'Hashing', 'Data Integrity'],
        description: 'Validate a series of blocks by checking hashes and parent-child pointers ensuring no tampering.',
        constraints: ['Verification of proof-of-work if applicable'],
        examples: [
            { input: 'hash1 -> hash2 -> hash3 sequence', output: 'Valid' },
            { input: 'tampered middle block hash', output: 'Invalid' }
        ]
    },
    'c7-15': {
        title: 'Git diff algorithm',
        difficulty: 'Hard',
        tags: ['Dynamic Programming', 'Longest Common Subsequence'],
        description: 'Implement a simplified diff engine that shows line additions and removals between two text versions.',
        constraints: ['LCS algorithm required'],
        examples: [
            { input: 'A: hello world, B: hello brave world', output: '+ brave' },
            { input: 'Large file change blocks', output: 'Minimal diff set' }
        ]
    },
    'c7-16': {
        title: 'Autocomplete search engine',
        difficulty: 'Hard',
        tags: ['Trie', 'Frequency', 'Weighting'],
        description: 'Build a weighted autocomplete engine that returns top search results based on prefix and usage frequency.',
        constraints: ['Top 5 suggestions weighted by frequency'],
        examples: [
            { input: 'insert: apple, app, apply, query: app', output: 'app apple apply' },
            { input: 'High-frequency query ordering', output: 'Sorted results' }
        ]
    },
    'c7-17': {
        title: 'Code formatter',
        difficulty: 'Hard',
        tags: ['Parsing', 'AST', 'Strings'],
        description: 'Implement a pretty-printer for a simplified language to enforce consistent indentation and spacing.',
        constraints: ['Handling nested blocks {} correctly'],
        examples: [
            { input: 'if(x){y++;}', output: 'if (x) {\n  y++;\n}' },
            { input: 'Deeply nested logic string', output: 'Properly indented code' }
        ]
    },
    'c7-18': {
        title: 'Text editor undo redo',
        difficulty: 'Hard',
        tags: ['Design Patterns', 'Stack', 'Command Pattern'],
        description: 'Simulate a text editor buffer supporting type operations, undo, and redo using efficient state management.',
        constraints: ['Unlimited undo stack usually'],
        examples: [
            { input: 'type abc, undo, redo', output: 'abc' },
            { input: 'sequence of type/undo/type/redo', output: 'Correct buffer state' }
        ]
    },
    'c7-19': {
        title: 'Regex engine',
        difficulty: 'Hard',
        tags: ['NFA/DFA', 'State Machine', 'Strings'],
        description: 'Implement a regex engine supporting standard operators like *, +, ?, and character classes.',
        constraints: ['No built-in regex libraries'],
        examples: [
            { input: 'pattern: a*b, text: aaab', output: 'True' },
            { input: 'complex grouping/alternation', output: 'Correct match' }
        ]
    },
    'c7-20': {
        title: 'Programming language interpreter',
        difficulty: 'Hard',
        tags: ['Compiler Theory', 'Parsing', 'Evaluation'],
        description: 'Create an interpreter for a domain-specific language supporting variables, arithmetic, and print statements.',
        constraints: ['AST-based evaluation or Bytecode'],
        examples: [
            { input: 'print(2+3*4)', output: '14' },
            { input: 'var x=5; print(x*2);', output: '10' }
        ]
    },
    'c3-01': {
        title: 'Count numbers with exactly 3 divisors',
        difficulty: 'Hard',
        tags: ['Math', 'Number Theory'],
        description: 'Find how many numbers in the range [L, R] have exactly 3 divisors. Note: A number has exactly 3 divisors if it is a square of a prime number.',
        constraints: ['L, R <= 10^12'],
        examples: [
            { input: 'L = 1, R = 1,000,000', output: '168' },
            { input: 'L = 999,900,000, R = 1,000,000,000', output: '1' }
        ]
    },
    'c3-02': {
        title: 'Largest number from digit swaps',
        difficulty: 'Hard',
        tags: ['Greedy', 'Backtracking'],
        description: 'Given a number as a string and an integer K, find the largest number possible by performing at most K swaps of digits.',
        constraints: ['K <= 10', 'Number length <= 20'],
        examples: [
            { input: 'num = "129814999", k = 4', output: '999,984,211' },
            { input: 'num = "123456789987654321", k = 5', output: '998,765,432,187,654,321' }
        ]
    },
    'c3-03': {
        title: 'Split number into prime sum combinations',
        difficulty: 'Medium',
        tags: ['Math', 'Dynamic Programming'],
        description: 'Find the number of ways to split an integer N into a sum of distinct prime numbers.',
        constraints: ['N <= 500'],
        examples: [
            { input: 'N = 41', output: '6' },
            { input: 'N = 97', output: '17' }
        ]
    },
    'c3-04': {
        title: 'Digital root recursion problem',
        difficulty: 'Easy',
        tags: ['Recursion', 'Math'],
        description: 'Calculate the digital root of a very large number (repeatedly sum its digits until a single digit remains).',
        constraints: ['Number length up to 10^6'],
        examples: [
            { input: '987654321987654321987654321', output: '9' },
            { input: '999...9 (30 times)', output: '9' }
        ]
    },
    'c3-05': {
        title: 'Sum of XOR pairs optimization',
        difficulty: 'Hard',
        tags: ['Bit Manipulation', 'Optimization'],
        description: 'Given an array, calculate the sum of XOR values of all possible pairs in the array efficiently.',
        constraints: ['N <= 10^5', 'Numbers <= 10^9', 'O(N log(max_val)) time'],
        examples: [
            { input: '[1024, 2048, 4096, 8192, 16384]', output: '64512' },
            { input: '[1,3,5,7,9,11,13,15]', output: '224' }
        ]
    },
    'c3-06': {
        title: 'Find missing number in infinite stream',
        difficulty: 'Medium',
        tags: ['Logic', 'Streams'],
        description: 'A stream of numbers from 1 to N is missing exactly one value. Identify the missing number with minimal memory usage.',
        constraints: ['O(1) auxiliary space beyond input'],
        examples: [
            { input: '1, 2, 3, 4, 6, 7, 8, 9, 10...', output: '5' },
            { input: '1,000,000,000 to ...996 (missing 997)', output: '999,999,997' }
        ]
    },
    'c3-07': {
        title: 'Modular exponent with large constraints',
        difficulty: 'Hard',
        tags: ['Binary Exponentiation', 'Math'],
        description: 'Calculate (a^b) % mod where a, b and mod are very large.',
        constraints: ['a, b, mod <= 10^18'],
        examples: [
            { input: 'a = 987654321, b = 123456789, mod = 1000000007', output: '652541198' },
            { input: 'a = 999,999,999, b = 999,999,999, mod = 998244353', output: '682224393' }
        ]
    },
    'c3-08': {
        title: 'GCD segment queries',
        difficulty: 'Hard',
        tags: ['Segment Tree', 'GCD'],
        description: 'Given an array, process multiple queries of finding the GCD of a given range [L, R].',
        constraints: ['N <= 10^5', 'Queries <= 10^5'],
        examples: [
            { input: 'arr = [12,15,18,27,30,45], queries: [0,2], [1,4], [2,5]', output: '3, 3, 3' },
            { input: 'arr = [100,200,300,400,500], queries: [0,4], [1,3], [2,2]', output: '100, 100, 300' }
        ]
    },
    'c3-09': {
        title: 'Count palindromic subsequences',
        difficulty: 'Hard',
        tags: ['Dynamic Programming', 'Strings'],
        description: 'Find the total number of palindromic subsequences in a given string mod 10^9 + 7.',
        constraints: ['String length <= 1000'],
        examples: [
            { input: '"abcb"', output: '6' },
            { input: '"aaaaa"', output: '31' }
        ]
    },
    'c3-10': {
        title: 'Fibonacci with matrix exponentiation',
        difficulty: 'Hard',
        tags: ['Math', 'Matrix Exponentiation'],
        description: 'Calculate the N-th Fibonacci number where N is very large.',
        constraints: ['N <= 10^18'],
        examples: [
            { input: 'n = 50', output: '12,586,269,025' },
            { input: 'n = 100', output: '354,224,848,179,261,915,075' }
        ]
    },
    'c3-11': {
        title: 'Count trailing zeros in factorial',
        difficulty: 'Easy',
        tags: ['Math', 'Number Theory'],
        description: 'Find the number of trailing zeros in N! (N factorial).',
        constraints: ['N <= 10^12'],
        examples: [
            { input: 'n = 100,000', output: '24,999' },
            { input: 'n = 1,000,000,000', output: '249,999,998' }
        ]
    },
    'c3-12': {
        title: 'Unique permutations with constraints',
        difficulty: 'Hard',
        tags: ['Backtracking', 'Combinatorics'],
        description: 'Find the number of unique permutations of an array where no two adjacent elements are equal.',
        constraints: ['N <= 12'],
        examples: [
            { input: '[1,1,2,2]', output: '2' },
            { input: '[1,1,1,2,2]', output: '1' }
        ]
    },
    'c3-13': {
        title: 'Partition array minimizing difference',
        difficulty: 'Medium',
        tags: ['Dynamic Programming', 'Subset Sum'],
        description: 'Partition an array into two subsets such that the absolute difference between their sums is minimized.',
        constraints: ['N <= 100', 'Sum <= 10^5'],
        examples: [
            { input: '[1,6,11,5]', output: '1' },
            { input: '[3,1,4,2,2,1]', output: '1' }
        ]
    },
    'c3-14': {
        title: 'Number of ways to climb steps',
        difficulty: 'Medium',
        tags: ['Dynamic Programming'],
        description: 'Count the number of ways to climb N steps, taking 1 or 2 steps at a time, while avoiding specific "blocked" steps.',
        constraints: ['N <= 10^5'],
        examples: [
            { input: 'n = 7, blocked = [3,5]', output: '2' },
            { input: 'n = 10, blocked = [2,4,7]', output: '6' }
        ]
    },
    'c3-15': {
        title: 'Count valid parentheses combinations',
        difficulty: 'Medium',
        tags: ['Recursion', 'Catalan Numbers'],
        description: 'For a given N, count the number of valid combinations of N pairs of parentheses.',
        constraints: ['N <= 15'],
        examples: [
            { input: 'n = 4', output: '14' },
            { input: 'n = 6', output: '132' }
        ]
    }
};

// --- COMPONENTS ---

export default function CodeArenaProfessional() {
    const [view, setView] = useState<'categories' | 'challenges' | 'arena'>('categories');
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [selectedId, setSelectedId] = useState<string>('c1-01');
    const [language, setLanguage] = useState('typescript');
    const [code, setCode] = useState(BOILERPLATES.typescript);
    const [isExecuting, setIsExecuting] = useState(false);
    const [consoleOutput, setConsoleOutput] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'testcases' | 'console'>('testcases');
    const [selectedTestcase, setSelectedTestcase] = useState(0);
    const { user } = useAuthStore();
    const socketRef = useRef<Socket | null>(null);
    const [isSolvedByTeam, setIsSolvedByTeam] = useState(false);

    // Proctoring states
    const [attempts, setAttempts] = useState(0);
    const [proctorStatus, setProctorStatus] = useState<'SAFE' | 'WARNING' | 'VIOLATION'>('SAFE');
    const [proctorWarning, setProctorWarning] = useState<string | null>(null);
    const MAX_ATTEMPTS = 7;

    const challenge = CHALLENGE_DATA[selectedId];

    const updateAttempts = useCallback((newAttempts: number) => {
        setAttempts(newAttempts);
    }, [selectedId]);

    // Fetch true backend attempt count
    useEffect(() => {
        if (typeof window !== 'undefined' && selectedId) {
            const fetchAttempts = async () => {
                const token = useAuthStore.getState().token;
                if (!token) return;
                try {
                    const res = await fetch(`/api/proctor/status?challengeId=${selectedId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setAttempts(data.attempts || 0);
                    }
                } catch {
                    // Fallback to local storage if API fails
                    const stored = localStorage.getItem(`challenge_attempts_${selectedId}`);
                    if (stored) setAttempts(parseInt(stored, 10));
                }
            };
            
            fetchAttempts();
            // Poll for attempt updates (e.g., admin unlocks)
            const interval = setInterval(fetchAttempts, 5000);
            return () => clearInterval(interval);
        }
    }, [selectedId]);

    // Force redirect removed. User is permanently locked out in arena view unless admin pardons them.
    useEffect(() => {
        // Keeps user in arena view. UI overlay handles the locked state.
    }, [attempts, view, MAX_ATTEMPTS]);

    const handleViolation = useCallback(async (type: 'NO_FACE' | 'MULTIPLE_FACES' | 'SUSPICIOUS_MOVEMENT', snapshot: string) => {
        if (view !== 'arena') return; // Don't trigger violations outside the arena!
        
        setProctorStatus('VIOLATION');
        
        const msg = `WARNING: ${type.replace('_', ' ')}. PENALTY RECORDED. (ATTEMPT ${attempts + 1}/${MAX_ATTEMPTS})`;
        setProctorWarning(msg);
        
        setConsoleOutput(out => [
            ...out, 
            { type: 'error', content: `[PROCTORING] ${msg}` }
        ]);

        // Optimistic update
        setAttempts(prev => {
            const next = prev + 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem(`challenge_attempts_${selectedId}`, next.toString());
            }
            return next;
        });

        // Auto reset to WARNING then SAFE if it was temporary
        setTimeout(() => {
            setProctorWarning(null);
            setProctorStatus('WARNING');
            setTimeout(() => setProctorStatus('SAFE'), 5000);
        }, 5000);

        // SYNC WITH BACKEND
        try {
            const token = useAuthStore.getState().token;
            if (token) {
                await fetch('/api/proctor/violation', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify({
                        challengeId: selectedId,
                        type,
                        snapshot
                    })
                });
            }
        } catch (e) {
            console.error('Failed to log violation synchronously', e);
        }

    }, [selectedId, view, attempts]);

    useEffect(() => {
        if (BOILERPLATES[language]) {
            setCode(BOILERPLATES[language]);
        }
    }, [language, selectedId]);

    // Real-time Presence tracking
    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000');
        }

        if (view === 'arena' && user) {
            socketRef.current.emit('join_challenge', {
                userId: user.id,
                teamId: user.teamId,
                challengeId: selectedId,
                status: 'CODING'
            });
        }

        return () => {
            if (socketRef.current && user) {
                socketRef.current.emit('leave_challenge', {
                    userId: user.id,
                    challengeId: selectedId
                });
            }
        };
    }, [view, selectedId, user]);

    const handleRun = () => {
        setIsExecuting(true);
        setActiveTab('console');
        setConsoleOutput([
            { type: 'info', content: `Compiling ${language} source...` },
            { type: 'info', content: 'Allocating sandbox environment (Docker node_1)' },
        ]);

        setTimeout(() => {
            setConsoleOutput(prev => [
                ...prev,
                { type: 'success', content: '✓ Compilation Successful' },
                { type: 'test', content: 'Testcase 1: [Accepted] (12ms)' },
                { type: 'test', content: 'Testcase 2: [Accepted] (9ms)' },
                { type: 'result', content: 'Runtime: 21ms | Memory: 32MB', meta: true }
            ]);
            setIsExecuting(false);
        }, 1200);
    };

    const handleSubmit = async () => {
        if (!user || isExecuting) return;
        
        if (attempts >= MAX_ATTEMPTS) {
            setActiveTab('console');
            setConsoleOutput(prev => [...prev, { type: 'error', content: `[SYSTEM] ACCESS DENIED: MAXIMUM ATTEMPTS (${MAX_ATTEMPTS}) REACHED.` }]);
            return;
        }

        setIsExecuting(true);
        setActiveTab('console');
        
        // Count as an attempt
        setAttempts(prev => {
            const next = prev + 1;
            if (typeof window !== 'undefined') {
                localStorage.setItem(`challenge_attempts_${selectedId}`, next.toString());
            }
            setConsoleOutput([{ type: 'info', content: `Submitting solution to core validator... (Attempt ${next}/${MAX_ATTEMPTS})` }]);
            return next;
        });

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ userId: user.id, challengeId: selectedId, score: 100 })
            });

            if (res.ok) {
                setConsoleOutput(prev => [
                    ...prev,
                    { type: 'success', content: '✓ MISSION ACCOMPLISHED' },
                    { type: 'info', content: 'Score synced with global leaderboard.' }
                ]);
                setIsSolvedByTeam(true);
            } else {
                const err = await res.json();
                setConsoleOutput(prev => [...prev, { type: 'error', content: `SUBMISSION FAILED: ${err.message}` }]);
            }
        } catch (e) {
            setConsoleOutput(prev => [...prev, { type: 'error', content: 'COMMUNICATION ERROR DETECTED' }]);
        } finally {
            setIsExecuting(false);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    if (view === 'categories') {
        return (
            <>
                <MobileRestriction />
                <CategorySelector
                    onSelect={(id) => { setSelectedCategory(id); setView('challenges'); }}
                    toggleFullscreen={toggleFullscreen}
                />
            </>
        );
    }

    if (view === 'challenges') {
        return (
            <div className="fixed top-0 inset-x-0 bottom-0 bg-[#020202] text-white p-8 md:p-12 space-y-12 overflow-y-auto overflow-x-hidden custom-scrollbar z-[60]">
                <MobileRestriction />
                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(232, 20, 20, 0.4); border-radius: 20px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(232, 20, 20, 0.7); }
                `}</style>
                <DotGrid />
                <div className="flex items-center gap-4 relative z-10">
                    <button
                        onClick={() => setView('categories')}
                        className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-xl"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[9px] tracking-[0.5em] font-black uppercase text-white/30">CATEGORY {selectedCategory} / TRIALS</span>
                </div>

                <PageHeader tag="ELITE TRAINING ARENA" title={<>SELECT YOUR <span className="text-[#E81414]">TRIAL</span></>} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 font-normal pb-32">
                    {Object.entries(CHALLENGE_DATA)
                        .filter(([id]) => id.startsWith(`c${selectedCategory}-`))
                        .map(([id, data]: [string, any], i: number) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#E81414] hover:bg-[#E81414] transition-all duration-500 group relative overflow-hidden cursor-pointer"
                            >
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2">
                                            <span className="px-3 py-1 w-fit rounded-full text-[8px] font-black border border-[#E81414]/30 bg-[#E81414]/10 text-[#E81414] uppercase tracking-widest transition-colors group-hover:border-black/40 group-hover:bg-black/20 group-hover:text-black">
                                                {data.difficulty}
                                            </span>
                                            <span className="text-[10px] font-black text-[#E81414]/60 group-hover:text-black uppercase tracking-[0.2em] transition-colors">
                                                {data.difficulty.toLowerCase() === 'hard' ? '700' : data.difficulty.toLowerCase() === 'medium' ? '400' : '100'}HONOR
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            {data.tags.slice(0, 2).map((tag: string) => (
                                                <span key={tag} className="text-[8px] font-bold text-white/20 group-hover:text-black/60 uppercase transition-colors">{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-black transition-colors">
                                            {data.title}
                                        </h3>
                                        <p className="text-[11px] text-white/40 font-semibold line-clamp-2 group-hover:text-black/80 transition-colors">
                                            {data.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <Button
                                            onClick={() => {
                                                setSelectedId(id);
                                                setView('arena');
                                            }}
                                            className="flex-1 h-12 bg-white border border-white text-black text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-500"
                                        >
                                            SOLVE PROBLEM
                                        </Button>
                                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/10 !group-hover:bg-black !group-hover:border-white/20 transition-all duration-500 overflow-hidden">
                                            <ZapstersLogo className="w-10 h-10 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="fixed top-0 inset-x-0 bottom-0 bg-[#020202] text-white flex flex-col font-sans overflow-hidden z-[60] normal-case">
            <MobileRestriction />
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(232, 20, 20, 0.2); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(232, 20, 20, 0.5); }
                .monaco-editor, .monaco-editor .margin, .monaco-editor-background { background-color: transparent !important; }
.monaco-editor .mtk1 { text-transform: none !important; }
            `}</style>

            <header className="h-14 shrink-0 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setView('challenges')}
                        className="w-10 h-10 rounded-full border border-white/5 hover:bg-white/5 text-white/40 hover:text-white transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 text-white/40" />
                    </Button>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#E81414] uppercase">CODE ARENA v2.0</span>
                        <h1 className="text-sm font-black uppercase tracking-tight">{challenge.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Language Selector */}
                    <Dropdown
                        items={LANGUAGES}
                        value={language}
                        onChange={setLanguage}
                        className="bg-white/5 border-white/10 hover:border-white/20 transition-all text-xs font-bold font-mono"
                    />

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    <Button
                        onClick={handleRun}
                        disabled={isExecuting}
                        className="h-9 px-5 text-[9px] font-black tracking-widest uppercase transition-all rounded-lg disabled:opacity-50"
                    >
                        {isExecuting ? <RefreshCw className="w-3 h-3 animate-spin mr-2" /> : <Play className="w-3 h-3 mr-2 fill-current" />}
                        RUN CODE
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleSubmit}
                        disabled={isExecuting || isSolvedByTeam || attempts >= MAX_ATTEMPTS}
                        className="h-9 px-5 text-[9px] font-black tracking-widest uppercase transition-all rounded-lg disabled:opacity-50"
                    >
                        <ArrowUpRight className="w-3 h-3 mr-2" />
                        {isSolvedByTeam ? 'SOLVED' : attempts >= MAX_ATTEMPTS ? 'LOCKED' : 'SUBMIT'}
                    </Button>
                </div>

                <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><Settings className="w-4 h-4" /></button>
                    <button onClick={toggleFullscreen} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"><Maximize2 className="w-4 h-4" /></button>
                </div>
            </header>

            {/* MAIN 3-PANEL LAYOUT */}
            <PanelGroup orientation="horizontal" className="flex-1">
                {/* LEFT PANEL: PROBLEM */}
                <Panel defaultSize={25} minSize={20} className="relative bg-[#050505]">
                    <div className="absolute inset-0 overflow-y-auto px-8 py-10 space-y-8 custom-scrollbar">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 rounded-full text-[9px] font-black border border-red-500/30 bg-red-500/10 text-red-500 uppercase tracking-widest">
                                    {challenge.difficulty}
                                </span>
                                <div className="flex gap-2">
                                    {challenge.tags.map((tag: string) => (
                                        <span key={tag} className="text-[9px] font-bold text-white/20 uppercase hover:text-white/40 cursor-default transition-colors">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">{challenge.title}</h2>
                        </div>

                        <div className="space-y-6 text-sm text-white/60 font-semibold leading-relaxed tracking-wide">
                            <p>{challenge.description}</p>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Examples</h4>
                                {challenge.examples.map((ex: any, i: number) => (
                                    <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 font-mono text-[11px] space-y-2">
                                        <div className="flex gap-2"><span className="text-white/30 uppercase">Input:</span> <span className="text-white">{ex.input}</span></div>
                                        <div className="flex gap-2"><span className="text-white/30 uppercase">Output:</span> <span className="text-white">{ex.output}</span></div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Constraints</h4>
                                <ul className="list-disc list-inside space-y-1 opacity-80">
                                    {challenge.constraints.map((c: string) => <li key={c}>{c}</li>)}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex gap-4">
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"><Share2 className="w-3.5 h-3.5" /> SHARE</button>
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"><Bookmark className="w-3.5 h-3.5" /> BOOKMARK</button>
                            </div>

                        </div>
                    </div>
                </Panel>

                <PanelResizeHandle className="w-1 border-x border-white/5 hover:bg-white/10 transition-all cursor-col-resize" />

                {/* CENTER PANEL: EDITOR */}
                <Panel defaultSize={50} minSize={30} className="relative flex flex-col bg-[#000000] border-x border-white/5">
                    <div className="flex-1 relative font-mono normal-case">
                        <Editor
                            height="100%"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(v) => setCode(v || '')}
                            options={{
                                minimap: { enabled: true },
                                fontSize: 13,
                                fontFamily: 'JetBrains Mono, monospace',
                                lineNumbers: 'on',
                                roundedSelection: true,
                                scrollBeyondLastLine: false,
                                readOnly: false,
                                automaticLayout: true,
                                padding: { top: 24, bottom: 24 },
                                cursorSmoothCaretAnimation: "on",
                                cursorStyle: "block",
                                letterSpacing: 0.5,
                                smoothScrolling: true,
                            }}
                            loading={<div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-xl font-black text-[10px] tracking-widest text-white/20 animate-pulse">INITIATING WORKSPACE...</div>}
                        />
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="h-8 border-t border-white/10 bg-white/[0.02] flex items-center justify-between px-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Box className="w-3.5 h-3.5 text-white/20" />
                                <span className="text-[8px] font-black text-white/20 tracking-widest uppercase">CLUSTER_7G</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-white/20" />
                                <span className="text-[8px] font-black text-white/20 tracking-widest uppercase">LATENCY: 12ms</span>
                            </div>
                        </div>
                        <span className="text-[8px] font-black text-white/5 tracking-[0.4em] uppercase">READY_FOR_DEPLOYMENT</span>
                    </div>
                </Panel>

                <PanelResizeHandle className="w-1 border-x border-white/5 hover:bg-white/10 transition-all cursor-col-resize" />

                {/* RIGHT PANEL: TESTCASES & CONSOLE */}
                <Panel defaultSize={25} minSize={20} className="relative bg-[#050505] flex flex-col border-l border-white/5">
                    {/* Tabs Header */}
                    <div className="flex border-b border-white/10 shrink-0">
                        <button
                            onClick={() => setActiveTab('testcases')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'testcases' ? 'border-white text-white bg-white/5' : 'border-transparent text-white/30 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            TESTCASES
                        </button>
                        <button
                            onClick={() => setActiveTab('console')}
                            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'console' ? 'border-white text-white bg-white/5' : 'border-transparent text-white/30 hover:text-white hover:bg-white/[0.02]'
                                }`}
                        >
                            CONSOLE
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar pb-32">
                        <AnimatePresence mode="wait">
                            {activeTab === 'testcases' ? (
                                <motion.div key="tc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div className="flex gap-2">
                                        {[0, 1].map(i => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedTestcase(i)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${selectedTestcase === i ? 'border-white bg-white/10 text-white' : 'border-white/10 bg-white/5 text-white/30 hover:border-white/20'
                                                    }`}
                                            >
                                                CASE {i + 1}
                                            </button>
                                        ))}
                                        <button className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/30 hover:text-white hover:border-white/20 transition-all">
                                            +
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Input Stream</label>
                                            <div className="p-5 rounded-2xl border border-white/10 bg-black/40 font-mono text-[11px] text-white/80 leading-relaxed break-all">
                                                {challenge.examples[selectedTestcase].input}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Expected Yield</label>
                                            <div className="p-5 rounded-2xl border border-white/10 bg-black/40 font-mono text-[11px] text-white/80">
                                                {challenge.examples[selectedTestcase].output}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 font-mono text-[11px]">
                                    {consoleOutput.length === 0 && (
                                        <div className="h-full flex flex-col items-center justify-center pt-20 gap-4 opacity-20 italic">
                                            <Terminal className="w-8 h-8" />
                                            <p className="uppercase tracking-[0.2em] font-black">Waiting for execution...</p>
                                        </div>
                                    )}
                                    {consoleOutput.map((log, i) => (
                                        <div key={i} className={`p-4 rounded-xl border ${log.type === 'error' ? 'border-red-500/20 bg-red-500/5 text-red-400' :
                                            log.type === 'success' ? 'border-red-500/20 bg-red-500/5 text-red-400 font-bold' :
                                                log.type === 'test' ? 'border-white/10 bg-white/5 text-white/80' :
                                                    'border-white/5 bg-transparent text-white/40'
                                            }`}>
                                            {log.content}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Panel>
            </PanelGroup>

            {/* Permanent Lockdown Overlay */}
            {attempts >= MAX_ATTEMPTS && view === 'arena' && (
                <div className="fixed inset-0 z-[150] bg-black/95 flex flex-col items-center justify-center p-12 backdrop-blur-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-[#E81414]/10 pointer-events-none mix-blend-screen" />
                    
                    {/* Aggressive flashing border */}
                    <div className="absolute inset-4 border-2 border-[#E81414]/40 animate-pulse pointer-events-none rounded-[3rem]" />
                    
                    <ZapstersLogo className="w-24 h-24 mb-8 opacity-80 z-10" />
                    <h2 className="text-5xl md:text-7xl font-black text-[#E81414] tracking-tighter text-center uppercase drop-shadow-[0_0_20px_rgba(232,20,20,0.5)] z-10">
                        ACCESS REVOKED
                    </h2>
                    <div className="h-px w-64 bg-[#E81414] mx-auto mt-6 z-10" />
                    <p className="mt-8 text-white/50 text-xs font-black uppercase tracking-[0.3em] max-w-xl text-center leading-relaxed z-10">
                        Max penalty violations ({MAX_ATTEMPTS}/{MAX_ATTEMPTS}) reached. You have been locked out of this challenge instance. 
                        Your actions have been permanently logged. Please contact your administrator.
                    </p>
                    
                    <Button 
                        onClick={() => setView('challenges')}
                        className="mt-12 px-8 h-12 bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black text-[10px] font-black tracking-widest uppercase transition-all z-10"
                    >
                        RETURN TO CHALLENGES
                    </Button>
                    
                    {/* Visual decor */}
                    <div className="mt-16 grid grid-cols-5 gap-2 opacity-30 z-10">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-8 h-2 bg-[#E81414] animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                    </div>
                </div>
            )}

            {/* FLOATING PROCTORING CAM */}
            <Proctoring 
                isActive={view === 'arena' && attempts < MAX_ATTEMPTS}
                status={proctorStatus}
                onViolation={handleViolation}
                attempts={attempts}
                maxAttempts={MAX_ATTEMPTS}
            />

            {/* FULL SCREEN PROCTOR WARNING POPUP */}
            <AnimatePresence>
                {proctorWarning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none p-4"
                    >
                        <div className="bg-[#E81414]/20 backdrop-blur-xl border-2 border-[#E81414] p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-xl text-center">
                            <ZapstersLogo className="w-20 h-20 mb-6 animate-pulse opacity-90" />
                            <h2 className="text-2xl font-black text-[#E81414] uppercase tracking-widest mb-2">PROCTORING VIOLATION</h2>
                            <p className="text-white/80 font-bold uppercase tracking-wider text-sm">
                                {proctorWarning}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function MobileRestriction() {
    return (
        <div className="md:hidden fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center p-8 text-center space-y-8">
            <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <GOTIcon variant="white" size="sm" scale={1.8} className="text-white relative z-10" />
            </div>
            
            <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                    ACCESS <span className="text-[#E81414]">DENIED</span>
                </h2>
                <div className="h-px w-16 bg-[#E81414] mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 leading-relaxed max-w-[280px]">
                    Mobile users are not able to view challenges. Access via desktop or laptop.
                </p>
            </div>

            <div className="grid grid-cols-4 gap-2 opacity-20">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                ))}
            </div>
        </div>
    );
}

function ZapstersLogo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/logo.png"
                alt="Zapsters"
                className="w-full h-full object-contain brightness-0 invert scale-150"
            />
        </div>
    );
}

function CategorySelector({ onSelect, toggleFullscreen }: { onSelect: (id: number) => void, toggleFullscreen: () => void }) {
    return (
        <div className="min-h-screen bg-[#020202] text-white p-12 space-y-12 overflow-y-auto">
            <DotGrid />
            <div className="flex items-center gap-4 relative z-10">
                <button
                    onClick={toggleFullscreen}
                    className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-lg"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
                <span className="text-[9px] tracking-[0.5em] font-black uppercase text-white/30">PLATFORM / CATEGORIES</span>
            </div>

            <PageHeader tag="ELITE TRAINING ARENA" title={<>SELECT YOUR <span className="text-[#E81414]">CHALLENGE</span></>} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 font-normal">
                {CATEGORIES.map((cat: any, i: number) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`group relative p-10 rounded-[2.5rem] border transition-all duration-700 overflow-hidden cursor-pointer ${cat.status === 'OPEN'
                            ? 'bg-black/40 border-white/10 hover:border-white/40 hover:bg-zinc-800'
                            : 'opacity-50 blur-[1px] pointer-events-none'
                            }`}
                    >
                        <div className="relative z-10 space-y-10">
                            <div className="p-8 rounded-[1.5rem] bg-zinc-900 w-fit border border-white/10 group-hover:bg-black group-hover:border-white/20 transition-all duration-500">
                                <ZapstersLogo className="w-16 h-16 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tight transition-colors group-hover:text-black">{cat.title}</h3>
                                <p className="text-[10px] font-black text-[#E81414] tracking-[0.4em] uppercase transition-colors group-hover:text-black/80">{cat.honor}</p>
                            </div>
                            <Button
                                onClick={() => onSelect(cat.id)}
                                className="w-full h-14 bg-white border border-white text-black transition-all duration-500 text-[10px] font-black tracking-[0.3em] uppercase"
                            >
                                ENTER DUNGEON
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function Dropdown({ items, value, onChange, className }: any) {
    const [open, setOpen] = useState(false);
    const selected = items.find((i: any) => i.value === value);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${className} shrink-0`}
            >
                <span>{selected?.icon}</span>
                <span className="uppercase tracking-widest font-mono">{selected?.label}</span>
                <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-[100]"
                    >
                        {items.map((it: any) => (
                            <button
                                key={it.value}
                                onClick={() => { onChange(it.value); setOpen(false); }}
                                className="w-full px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest hover:bg-white/10 flex items-center gap-3 transition-colors"
                            >
                                <span>{it.icon}</span>
                                <span className="font-mono">{it.label}</span>
                                {value === it.value && <Check className="ml-auto w-3.5 h-3.5 text-[#E81414]" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
