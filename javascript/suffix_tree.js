class SuffixTreeNode
{
    constructor()
    {
        this.children = {}; // Dictionary to store child nodes
        this.startIndex = -1; // Start index of substring in the original string
    }
}

class SuffixTree
{
    constructor(text)
    {
        this.root = new SuffixTreeNode(); // Root node
        this.text = text; // Original text for suffix tree
        this.buildSuffixTree(); // Build the tree when object is created
    }

    buildSuffixTree()
    {
        for (let i = 0; i < this.text.length; i++)
        {
            this.insertSuffix(this.text.substring(i), i);
        }
    }

    insertSuffix(suffix, startIndex)
    {
        let currentNode = this.root;
        for (let char of suffix)
        {
            if (!currentNode.children[char])
            {
                currentNode.children[char] = new SuffixTreeNode();
            }
            currentNode = currentNode.children[char];
        }
        currentNode.startIndex = startIndex; // Mark the start index of this suffix
    }

    searchSubstring(substring)
    {
        let currentNode = this.root;
        for (let char of substring)
        {
            if (!currentNode.children[char])
            {
                return false; // Substring not found
            }
            currentNode = currentNode.children[char];
        }
        return true; // Substring found
    }

    getSubstringPositions(substring)
    {
        let currentNode = this.root;
        for (let char of substring)
        {
            if (!currentNode.children[char])
            {
                return []; // Substring not found
            }
            currentNode = currentNode.children[char];
        }
        return this.collectAllIndices(currentNode);
    }

    collectAllIndices(node)
    {
        let indices = [];
        if (node.startIndex !== -1)
        {
            indices.push(node.startIndex);
        }
        for (let child in node.children)
        {
            indices = indices.concat(this.collectAllIndices(node.children[child]));
        }
        return indices;
    }
}

const text = "mississippi";
const suffixTree = new SuffixTree(text);

console.log("Searching for substrings:");
console.log("Is 'iss' present?", suffixTree.searchSubstring("iss")); // Output: True
console.log("Is 'sip' present?", suffixTree.searchSubstring("sip")); // Output: True
console.log("Is 'ppi' present?", suffixTree.searchSubstring("ppi")); // Output: True
console.log("Is 'xyz' present?", suffixTree.searchSubstring("xyz")); // Output: False

console.log("\nGetting starting positions of 'iss':");
const positionsIss = suffixTree.getSubstringPositions("iss");
console.log("Positions of 'iss':", positionsIss); // [1, 4]

console.log("\nGetting starting positions of 'i':");
const positionsI = suffixTree.getSubstringPositions("i");
console.log("Positions of 'i':", positionsI); // [0, 4, 7, 10]

console.log("\nGetting starting positions of 's':");
const positionsS = suffixTree.getSubstringPositions("s");
console.log("Positions of 's':", positionsS); // [2, 3, 5, 6]