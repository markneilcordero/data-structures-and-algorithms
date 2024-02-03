class Sequential_Search {
    myArray = [];
    constructor() {

    }

    generate_number(number) {
        for (let x = 0; x <= number; x++) {
            this.myArray.push(x);
        }
    }

    shuffle_number() {
        for (let x = this.myArray.length -1; x > 0; x--) {
            let j = Math.floor(Math.random() * (x+1));
            let k = this.myArray[x];
            this.myArray[x] = this.myArray[j];
            this.myArray[j] = k;
        }
    }

    generate_random_number(min, max) {
        let x = Math.floor(Math.random() * (max - min + 1)) + min;
        return x;
    }

    search_number(arr, value) {
        let x = 0;
        while (x < arr.length) {
            console.log(arr[x]);
            if (arr[x] == value) {
                break;
            }
            x++;
        }
    }
}

const ss = new Sequential_Search();
ss.generate_number(100000);
ss.shuffle_number();
let random_number = ss.generate_random_number(0, 100000);
console.log("Searching for number: " + random_number);
ss.search_number(ss.myArray, random_number);
console.log("Searching for number: " + random_number);

