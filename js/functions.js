function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

/*
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false
*/

function isPalindrome(string) {
  let normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) { // c конца идем
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
}

/*
// Строка является палиндромом
console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс')); // false
// Палиндром с пробелами
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
*/

// дополнительное задание
function extractNumber (input) {
  let inputString = input.toString(); // ввод делаем в стркоу
  let result = '';

  for (let i = 0; i < inputString.length; i++) {
    let digit = parseInt(inputString[i]); // каждый сивол в цифру
    if (!Number.isNaN(digit)) { // если цифра то добавляем в резулт через строку, если не цифра то nan и ничего не делаем
      result += inputString[i];
    }
  }
  return parseInt(result);
}

/*
console.log(extractNumber('2023 год')); // 2023
console.log(extractNumber('ECMAScript 2022')); // 2022
console.log(extractNumber('1 кефир, 0.5 батона')); // 105
console.log(extractNumber('агент 007')); // 7
console.log(extractNumber('а я томат')); // NaN

console.log(extractNumber(2023)); // 2023
console.log(extractNumber(-1)); // 1
console.log(extractNumber(1.5)); // 15
*/
