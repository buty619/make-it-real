const LinkedList = require("./LinkedList.js")


let arr = new LinkedList; // before after each
arr.add("a");
arr.add("b");
arr.add("c");

describe("testing correct adding",()=>{
    test("valueAt return correct value at position 0",()=>{
        expect(arr.valueAt(0)).toBe("a");
    })
    test("valueAt return correct value at position 1",()=>{ 
        expect(arr.valueAt(1)).toBe("b");
    })
    
    test("valueAt return correct value at position 2",()=>{
        expect(arr.valueAt(2)).toBe("c");
    })
})

test("testing addAt function",()=>{
    arr.addAt(2,"newAdd");
    expect(arr.valueAt(2)).toBe("newAdd");
})

test("testing pop function",()=>{
    expect(arr.pop()).toBe("c");
})

test("testing sizeList function",()=>{
    expect(arr.sizeList()).toEqual(3);
})

test("testing removeAt function",()=>{
    arr.removeAt(0);
    expect(arr.valueAt(0)).toBe("b");
})

test("testing valueAt function",()=>{
    expect(arr.valueAt(0)).toBe("b");
})