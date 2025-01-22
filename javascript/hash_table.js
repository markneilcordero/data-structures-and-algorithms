class HashTable
{
    constructor(size = 16)
    {
        this.size = size;
        this.buckets = Array(size).fill(null).map(() => []);
    }

    _hash(key)
    {
        let hash = 0;
        for (let char of key)
        {
            hash = (hash + char.charCodeAt(0) * 31) % this.size;
        }
        return hash;
    }

    set(key, value)
    {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let [i, [k]] of bucket.entries())
        {
            if (k === key)
            {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key)
    {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let [k, v] of bucket)
        {
            if (k === key)
            {
                return v;
            }
        }

        return undefined;
    }

    delete(key)
    {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++)
        {
            if (bucket[i][0] === key)
            {
                bucket.splice(i, 1);
                return true;
            }
        }

        return false;
    }

    has(key)
    {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let [k] of bucket)
        {
            if (k === key)
            {
                return true;
            }
        }
        
        return false;
    }

    keys()
    {
        const keys = [];
        for (let bucket of this.buckets)
        {
            for (let [key] of bucket)
            {
                keys.push(key);
            }
        }
        return keys;
    }

    values()
    {
        const values = [];
        for (let bucket of this.buckets)
        {
            for (let [, value] of bucket)
            {
                values.push(value);
            }
        }
        return values;
    }
}


const hashTable = new HashTable();

hashTable.set("name", "Alice");
hashTable.set("age", 25);
hashTable.set("city", "New York");

console.log("Name:", hashTable.get("name"));
console.log("Age:", hashTable.get("age"));

console.log("Has key 'city':", hashTable.has("city"));
console.log("Has key 'country':", hashTable.has("country"));

console.log("Deleting 'city':", hashTable.delete("city"));
console.log("Has key 'city':", hashTable.has("city"));

console.log("Keys:", hashTable.keys());
console.log("Values:", hashTable.values());