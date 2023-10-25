def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        print("Pass:", arr)
        quick_sort(arr, low, pivot_index)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[low]
    left = low + 1
    right = high

    done = False
    while not done:
        while left <= right and arr[left] <= pivot:
            left = left + 1
        while arr[right] >= pivot and right >= left:
            right = right - 1
        if right < left:
            done = True
        else:
            arr[left], arr[right] = arr[right], arr[left]

    arr[low], arr[right] = arr[right], arr[low]
    return right

# Input from the user
user_input = input("Enter a list of numbers separated by spaces: ")
input_list = [int(x) for x in user_input.split()]

# Sort the input list using Quick Sort and display each pass
quick_sort(input_list, 0, len(input_list) - 1)

# Display the sorted list
print("Sorted list:",input_list)
