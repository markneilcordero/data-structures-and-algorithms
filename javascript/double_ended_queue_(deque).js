class Deque
{
    constructor()
    {
        this.items = []; // Internal array to store elements
    }

    addFront(element)
    {
        this.items.unshift(element); // Add element to the front using unshift
        console.log(`Added to front: ${element}`);
    }

    addRear(element)
    {
        this.items.push(element); // Add element to the end using push
        console.log(`Added to rear: ${element}`);
    }

    removeFront()
    {
        if (this.isEmpty())
        {
            console.log("Deque is empty. Cannot remove from front.");
            return null;
        }
        const removed = this.items.shift(); // Remove the first element using shift
        console.log(`Removed from front: ${removed}`);
        return removed;
    }

    removeRear()
    {
        if (this.isEmpty())
        {
            console.log("Deque is empty. Cannot remove from rear.");
            return null;
        }
        const removed = this.items.pop(); // Remove the last element using pop
        console.log(`Removed from rear: ${removed}`);
        return removed;
    }

    peekFront()
    {
        if (this.isEmpty())
        {
            console.log("Dequeue is empty. Nothing at the front.");
            return null;
        }
        return this.items[0]; // Return the first element
    }

    peekRear()
    {
        if (this.isEmpty())
        {
            console.log("Deque is empty. Nothing at the rear.");
            return null;
        }
        return this.items[this.items.length - 1]; // Return the last element
    }

    isEmpty()
    {
        return this.items.length === 0; // Returns true if the deque is empty
    }

    size()
    {
        return this.items.length; // Returns the length of the deque
    }

    display()
    {
        if (this.isEmpty())
        {
            console.log("Deque is empty.");
            return;
        }
        console.log("Deque elements:", this.items.join(" <-> "));
    }
}

const deque = new Deque();

deque.addRear(10);
deque.addRear(20);
deque.addFront(5);
deque.display(); // Output: 5 <-> 10 <-> 20

deque.removeFront(); // Removes 5
deque.display(); // Output: 10 <-> 20

deque.removeRear(); // Removes 20
deque.display(); // Output: 10

console.log("Peek front:", deque.peekFront()); // Output: 10
console.log("Peek rear:", deque.peekRear()); // Output: 10

console.log("Deque size: ", deque.size()); // Output: 1
console.log("Is deque empty?", deque.isEmpty()); // Output false

deque.removeFront(); // Removes 10
deque.display(); // Output: Deque is empty.
console.log("Is deque empty?", deque.isEmpty()); // Output: true