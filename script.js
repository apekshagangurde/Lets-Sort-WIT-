let initialArray = [];
let finalArray = [];
let passes = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeQuickSort() {
    const inputArray = document.getElementById("inputArray").value;
    initialArray = inputArray.split(',').map(Number);
    finalArray = [...initialArray];
    document.getElementById("visualization").innerHTML = "";
    passes = 0;

    visualizeArray(initialArray, "Initial Array", "green");
    await quickSort(finalArray, 0, finalArray.length - 1);

    // Show the sorted array with a different label and gap
    visualizeGap();
    visualizeArray(finalArray, "Sorted Array", "green");
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[low];
    let left = low + 1;
    let right = high;

    let done = false;
    while (!done) {
        while (left <= right && arr[left] <= pivot) {
            left++;
        }
        while (arr[right] >= pivot && right >= left) {
            right--;
        }
        if (right < left) {
            done = true;
        } else {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            visualizeArray(arr, "Sorting Pass " + (++passes), "red");
            await sleep(500); // Delay to show animation
        }
    }

    [arr[low], arr[right]] = [arr[right], arr[low]];
    visualizeArray(arr, "Sorting Pass " + (++passes), "yellow");
    return right;
}

function visualizeArray(arr, label, color) {
    const visualizationDiv = document.getElementById("visualization");
    const arrayDiv = document.createElement("div");
    arrayDiv.className = "array";
    const labelDiv = document.createElement("div");
    labelDiv.className = "pass " + color;
    labelDiv.textContent = label;
    arrayDiv.appendChild(labelDiv);

    for (let num of arr) {
        const bar = document.createElement("div");
        bar.className = "bar " + color;
        bar.style.height = num * 20 + "px";
        arrayDiv.appendChild(bar);
    }
    visualizationDiv.appendChild(arrayDiv);
}

function visualizeGap() {
    const visualizationDiv = document.getElementById("visualization");
    const gapDiv = document.createElement("div");
    gapDiv.className = "gap";
    visualizationDiv.appendChild(gapDiv);
}
