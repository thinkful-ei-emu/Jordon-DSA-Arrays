const memoryInstance = require('./Memory');
const memory = new memoryInstance();

class Array {
    constructor() {
        this.length = 0;
        this._capacity = 0;
        this.ptr = memory.allocate(this.length);
    }

    //Insert
    //Resize
    //Get
    //Push
    //Pop
    //Remove

    insert(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }
        memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
        memory.set(this.ptr + index, value);
        this.length++;
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = memory.allocate(size);
        if (this.ptr === null) {
            throw new Error('Out of memory');
        }
        memory.copy(this.ptr, oldPtr, this.length);
        memory.free(oldPtr);
        this._capacity = size;
    }

    push(value) {
        if (this.length >= this._capacity) {
            this._resize((this.length + 1) * Array.SIZE_RATIO);
        }

        memory.set(this.ptr + this.length, value);
        this.length++;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return memory.get(this.ptr + index);
    }

    pop() {
        if (this.length == 0) {
            throw new Error('Index error');
        }
        const value = memory.get(this.ptr + this.length - 1);
        this.length--;
        return value;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
        this.length--;
    }

    URLify(str) {
        // return str.replace(/ /g, '%20');
        let newString = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i] !== ' ') {
                newString += str[i];
            } else {
                newString += '%20';
            }
        }
        return newString;
    }

    Filter(arr) {
        let newArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > 5) {
                newArray.push(arr[i])
            }
        }
        return newArray;
    }

    MergeArray(a, b) {
        let result = [];
        let i = 0;
        while ((i < a.length) || (i < b.length)) {
            if (i < a.length) result.push(a[i]);
            if (i < b.length) result.push(b[i]);
            i++;
        }
        result.sort((a, b) => a - b);
        return result;
    }

    RemoveChar(str, char) {
        for (let x = 0; x < str.length; x++) {
            if (char.includes(str[x])) {
                str = str.slice(0, x) + '' + str.slice(x + 1);
            }
        }
        return str;

    }

    Products(arr) {
        let newProduct = [];
        for (let i = 0; i < arr.length; i++) {
            let mathProd = 1;
            for (let x = 0; x < arr.length; x++) {
                if (x !== i) mathProd *= arr[x];
            }
            newProduct.push(mathProd);
        }
        return newProduct;
    }

    FindIndex = (row) => {
        let index = [];
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 0) {
                index.push(i);
            }
        }
        return index;
    }

    TwoD(arr) {
        let newArray = [];
        let column = [];

        arr.forEach(row => {
            let zero = this.FindIndex(row);
            if (!zero.length) {
                newArray.push(row)
            } else {
                column = [...column, ...zero];
                newArray.push(row.map(() => 0));
            }
        });

        newArray.forEach(row => {
            column.forEach(col => {
                row[col] = 0;
            });
        });

        return newArray;
    }

    StringRotation(str1, str2) {

    }


}

function main() {

    Array.SIZE_RATIO = 3;

    let arr = new Array();

    // arr.push(3);
    //Array { length: 1, _capacity: 3, ptr: 0 }

    // arr.push(5);
    // arr.push(15);
    // arr.push(19);
    // arr.push(45);
    // arr.push(10);
    //Array { length: 6, _capacity: 12, ptr: 3 }
    //Length 6 - Six values pushed
    //Pointer  3 - size before resize

    // arr.pop();
    // arr.pop();
    // arr.pop();
    //Array { length: 3, _capacity: 12, ptr: 3 }
    //Removes from the length, our address and capacity remains the same

    // arr.push('tauhida');
    //NaN - Float64Array

    //What is the purpose of the _resize() function in your Array class?
    //Increases capacity
    //Sets address

    // console.log(arr.get(1));
    // console.log(arr.URLify("tauhida parveen"));
    // console.log(arr.Filter([1, 3, 5, 7, 9, 8]));
    // console.log(arr.MergeArray([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));
    // console.log(arr.RemoveChar('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));
    // console.log(arr.FindIndex([1, 0, 1, 1, 0]));
    // console.log(arr.FindIndex([0, 1, 1, 1, 0]));
    // console.log(arr.TwoD([[1, 0, 1, 1, 0],
    // [0, 1, 1, 1, 0],
    // [1, 1, 1, 1, 1],
    // [1, 0, 1, 1, 1],
    // [1, 1, 1, 1, 1]]));





    // console.log(arr);

    // console.log(arr[0]);
}

main();