class Node
{
    constructor(data)
    {
        this.data = data; // Value of the node
        this.next = null; // Pointer to the next node
    }
}

class Stack
{
    constructor()
    {
        this.top = null; // Top of the stack
        this.size = 0; // Total number of elements in the stack
    }

    // Push: Add an element to the top of the stack
    push(data)
    {
        const newNode = new Node(data); // Create a new node
        newNode.next = this.top; // Link the new node to the current top
        this.top = newNode; // Update the top to the new node
        this.size++; // Increment the size
    }

    // Pop: Remove the top element from the stack
    pop()
    {
        if (this.isEmpty())
        {
            console.log("Stack is empty");
            return null;
        }
        const removedData = this.top.data; // Store the top element's data
        this.top = this.top.next; // Update the top to the next node
        this.size--; // Decrement the size
        return removedData;
    }

    // Peek: Return the top element without removing it
    peek()
    {
        if (this.isEmpty())
        {
            console.log("Stack is empty");
            return null;
        }
        return this.top.data; // Return the top element's data
    }

    // isEmpty: Check if the stack is empty
    isEmpty()
    {
        return this.size === 0; // Returns true if the size is 0
    }

    // Size: Return the number of elements in the stack
    getSize()
    {
        return this.size;
    }

    // Display Stack: Display all elements in the stack
    displayStack()
    {
        let current = this.top; // Start at the top
        let result = [];
        while (current)
        {
            result.push(current.data); // Add current node's data to the result
            current = current.next; // Move to the next node
        }
        console.log("Stack elements:", result.join(" -> "));
    }

    // Clear: Remove all elements from the stack
    clear()
    {
        this.top = null; // Reset the top to null
        this.size = 0; // Reset the size to 0
    }

    // Search: Check if an element exists in the stack
    search(data)
    {
        let current = this.top; // Start at the top
        while (current)
        {
            if (current.data === data)
            {
                return true; // Element found
            }
            current = current.next; // Move to the next node
        }
        return false; // Element not found
    }
}

const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log("After pushing:", myStack);
console.log("Popped element:", myStack.pop()); // Output: 30
console.log("After popping:", myStack);
console.log("Top element:", myStack.peek()); // Output: 20
console.log("Is stack empty?", myStack.isEmpty()); // Output: false
console.log("Stack size:", myStack.getSize()); // Output: 2
myStack.displayStack(); // Output: Stack elements: 20 -> 10
myStack.clear();
console.log("After clearing:", myStack);
myStack.push(10);
myStack.push(20);
console.log("Is 20 in the stack?", myStack.search(20)); // Output: true
console.log("Is 30 in the stack?", myStack.search(30)); // Output: false