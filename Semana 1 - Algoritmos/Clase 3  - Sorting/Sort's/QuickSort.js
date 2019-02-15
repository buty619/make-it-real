//not me
//https://github.com/makeitrealcamp/top/blob/master/algorithms/3-sorting.md

function QuickSort(arr) {
    quickSortRecursive(arr, 0, arr.length - 1);
    return arr;
  }
  
  // helper function to keep track of the ranges inside the array
  function quickSortRecursive(arr, start, end) {
    if (start >= end) return;
  
    const index = partition(arr, start, end);
    quickSortRecursive(arr, start, index-1);
    quickSortRecursive(arr, index, end);
  }
  
  function partition(arr, start, end) {
    const pivot = arr[Math.floor((start + end)/2)];
    while (start <= end) {
      // move the left pointer until we find a value greater than pivot
      while (arr[start] < pivot) start++;
  
      // move the right pointer until we find a value less than pivot
      while (arr[end] > pivot) end--;
  
      if (start <= end) {
        swap(arr, start, end);
        start++;
        end--;
      }
    }
  
    return start; // the partition point
  }
  
  function swap(arr, i, j) {
    const aux = arr[i];
    arr[i] = arr[j];
    arr[j] = aux;
  }
  
console.log(QuickSort([37, 2, 6, 4, 89, 8, 10, 12, 68, 45]));
console.log(QuickSort([1, 1, 1, 1, 1]));
console.log(QuickSort([75,56,85,90,49,26,12,48,40,47]));