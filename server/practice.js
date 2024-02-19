// var lengthOfLastWord = function (s) {
//     const newArr = s.split(" ");

//     console.log(newArr);
//     for (let i = newArr.length - 1; i >= 0; i--) {
//         if (newArr[i] === " " || newArr[i] === "") {
//             newArr.splice(i, 1);
//         }
//     }
//     console.log(newArr);
//     console.log(" ".length);
//     console.log(newArr[newArr.length - 1].length);
// };
// lengthOfLastWord("   fly me   to   the moon  ");

//-------------------------------------------------------------------//

// var removeDuplicates = function (nums) {
//     let i = 0;
//     for (let j = 0; j < nums.length; j++) {
//         if (nums[j] != nums[i]) nums[++i] = nums[j];
//     }
//     console.log(nums);
//     return ++i;
// };

// const result = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);

// console.log(result);

//--------------------------------------------------------------------//
// var symbols = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
// };

// var romanToInt = function (s) {
//     let value = 0;
//     for (let i = 0; i < s.length; i += 1) {
//         console.log("s[i]", symbols[s[i]]);
//         console.log("value", value);

//         symbols[s[i]] < symbols[s[i + 1]]
//             ? (value -= symbols[s[i]])
//             : (value += symbols[s[i]]);
//     }
//     return value;
// };

// const result = romanToInt("LVIII");
// console.log(result);

//--------------------------------------------------------------------//
const digits = [6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3];
var plusOne = function (digits) {
    for (var i = digits.length - 1; i >= 0; i--) {
        digits[i]++;
        if (digits[i] > 9) {
            digits[i] = 0;
        } else {
            return digits;
        }
    }
    console.log(digits);
    digits.unshift(1);
    console.log(digits);

    return digits;
};

const result = plusOne(digits);
console.log(result);
