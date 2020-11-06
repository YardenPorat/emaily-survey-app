function sortArrayOfObjects(array, byProperty, upOrDown) {
    if (upOrDown === 'up') {
        array.sort(compareAscending);
    }

    if (upOrDown === 'down') {
        array.sort(compareDescending);
    }

    function compareAscending(a, b) {
        if (a[byProperty] > b[byProperty]) {
            return -1;
        }
        if (a[byProperty] < b[byProperty]) {
            return 1;
        }
        return 0;
    }

    function compareDescending(a, b) {
        if (a[byProperty] < b[byProperty]) {
            return -1;
        }
        if (a[byProperty] < b[byProperty]) {
            return 1;
        }
        return 0;
    }
    return array;
}

export default sortArrayOfObjects;
