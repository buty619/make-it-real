const linkedList = require("./LinkedList")

//arr = new LinkedList();

test("should add one node at the linked list",()=>{
    expect(arr.add("a")).toBeDefined();
})
test("checking the method",()=>{
    expect(arr.add("a")).toContain("value");
    expect(arr.add("a")).toContain("next");
})