class NaryTreeNode
{
    constructor(value)
    {
        this.value = value;
        this.children = []; // Array to store child nodes
    }
}

class NaryTree
{
    constructor(value)
    {
        this.root = new NaryTreeNode(value); // Initialize the tree with a root node
    }

    addChild(parentValue, childValue)
    {
        const parentNode = this.searchDFS(this.root, parentValue);
        if (!parentNode)
        {
            console.log(`Parent node with value ${parentValue} not found.`);
            return;
        }
        const childNode = new NaryTreeNode(childValue);
        parentNode.children.push(childNode);
        console.log(`Added child ${childValue} to parent ${parentValue}.`);
    }

    traverseDFS(node)
    {
        if (!node) return;

        console.log(node.value);
        for (const child of node.children)
        {
            this.traverseDFS(child);
        }
    }

    traverseBFS()
    {
        const queue = [this.root];

        while (queue.length > 0)
        {
            const current = queue.shift();
            console.log(current.value);

            for (const child of current.children)
            {
                queue.push(child);
            }
        }
    }

    searchDFS(node, value)
    {
        if (!node) return null;

        if (node.value === value) return node;

        for (const child of node.children)
        {
            const result = this.searchDFS(child, value);
            if (result) return result;
        }
        return null;
    }

    countNodes(node)
    {
        if (!node) return 0;

        let count = 1;
        for (const child of node.children)
        {
            count += this.countNodes(child);
        }
        return count;
    }

    getHeight(node)
    {
        if (!node || node.children.length === 0) return 0;

        let heights = node.children.map(child => this.getHeight(child));
        return 1 + Math.max(...heights);
    }
}

const orgTree = new NaryTree("CEO");

orgTree.addChild("CEO", "VP of Engineering");
orgTree.addChild("CEO", "VP of Marketing");

orgTree.addChild("VP of Engineering", "Engineering Manager 1");
orgTree.addChild("VP of Engineering", "Engineering Manager 2");

orgTree.addChild("VP of Marketing", "Marketing Manager 1");

orgTree.addChild("Engineering Manager 1", "Software Engineer 1");
orgTree.addChild("Engineering Manager 1", "Software Engineer 2");

orgTree.addChild("Engineering Manager 2", "Software Engineer 3");

console.log("\nOrganization chart (DFS Traversal):");
orgTree.traverseDFS(orgTree.root);

console.log("\nOrganization Chart (BFS Traversal):");
orgTree.traverseBFS();

console.log("\nTotal Employees:", orgTree.countNodes(orgTree.root));

console.log("Height of Organization Tree:", orgTree.getHeight(orgTree.root));

const fileSystem = new NaryTree("Root");

fileSystem.addChild("Root", "Documents");
fileSystem.addChild("Root", "Pictures");
fileSystem.addChild("Root", "Videos");

fileSystem.addChild("Documents", "Resume.pdf");
fileSystem.addChild("Documents", "Project.docx");

fileSystem.addChild("Pictures", "Vacation.jpg");
fileSystem.addChild("Pictures", "Family.png");

fileSystem.addChild("Videos", "Movie.mp4");
fileSystem.addChild("Videos", "Tutorial.mp4");

console.log("\nFile System (DFS Traversal):");
fileSystem.traverseDFS(fileSystem.root);

console.log("\nFile System (BFS Traversal):");
fileSystem.traverseBFS();

console.log("\nTotal Nodes (Directories + Files):", fileSystem.countNodes(fileSystem.root));

console.log("Height of File System Tree:", fileSystem.getHeight(fileSystem.root));