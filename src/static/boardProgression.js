export const getPrivilegium = ['white', 'orange', 'pink', 'black'];

export const getKeys = [1, 2, 2, 3, 4];

export const getActiones = [2, 3, 3, 4, 4, 5];

export const getLiber = [2, 3, 4, 5];

export const getIncome = [3, 5, 7, 100];

export default function  getNext(L, i) {
    // If at last index, don't move
    if (i === L.length - 1) return i;
    else {
        return i+1;
    }
}
