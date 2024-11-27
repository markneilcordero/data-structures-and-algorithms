class Stack
{
    constructor()
    {
        this.stack = []; // Array to hold stack elements
    }

    // Push: Add an element to the top of the stack
    push(element)
    {
        this.stack.push(element); // Use array's push method
    }

    // Pop: Remove the top element from the stack
    pop()
    {
        if (this.isEmpty())
        {
            console.log("Stack is empty");
            return null;
        }
        return this.stack.pop(); // Use array's pop method
    }

    // Peek: Return the top element without removing it
    peek()
    {
        if (this.isEmpty())
        {
            console.log("Stack is empty");
            return null;
        }
        return this.stack[this.stack.length - 1]; // Return the last element
    }

    // isEmpty: Check if the stack is empty
    isEmpty()
    {
        return this.stack.length === 0; // Returns true if no elements in the stack
    }

    // Size: Return the number of elements in the stack
    size()
    {
        return this.stack.length;
    }

    // Display Stack: Display all elements in the stack
    displayStack()
    {
        console.log("Stack elements:", this.stack.join(" -> ")); // Display elements with arrows
    }

    // Clear: Remove all elements from the stack
    clear()
    {
        this.stack = []; // Reset the stack to an empty array
    }

    // Search: Check if an element exists in the stack
    search(element)
    {
        return this.stack.includes(element); // Use array's includes method
    }

    // Reverse: Reverse the order of elements in the stack
    reverse()
    {
        this.stack.reverse(); // Use array's reverse method
    }
}

const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log("After pushing:", myStack.stack); // Output [10, 20, 30]
console.log("Popped element:", myStack.pop()); // Output: 30
console.log("After popping:", myStack.stack); // Output [10, 20]
console.log("Top element:", myStack.peek()); // Output: 20
console.log("Is stack empty?", myStack.isEmpty()); // Output: false
console.log("Stack size:", myStack.size()); // Output: 2
myStack.displayStack(); // Output: Stack elements: 10 -> 20
myStack.clear();
console.log("After clearing:", myStack.stack); // Output: []
myStack.push(10);
myStack.push(20);
console.log("Is 20 in the stack?", myStack.search(20)); // Ouput: true
console.log("Is 30 in the stack?", myStack.search(30)); // Output: false
myStack.push(30);
console.log("Before reversing:", myStack.stack); // Output: [10, 20, 30]
myStack.reverse();
console.log("After reversing:", myStack.stack); // Output: [30, 20, 10]