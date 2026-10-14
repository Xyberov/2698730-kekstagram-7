function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

/*
console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false
*/

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
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
  const inputString = input.toString(); // ввод делаем в стркоу
  let result = '';

  for (let i = 0; i < inputString.length; i++) {
    const digit = parseInt(inputString[i], 10); // каждый сивол в цифру
    if (!Number.isNaN(digit)) { // если цифра то добавляем в резулт через строку, если не цифра то nan и ничего не делаем
      result += inputString[i];
    }
  }
  return parseInt(result, 10);
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

const convertTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
};

const isMeetingWithinWorkday = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = convertTimeToMinutes(workStart);
  const workEndMinutes = convertTimeToMinutes(workEnd);
  const meetingStartMinutes = convertTimeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
};

/*
console.log(isMeetingWithinWorkday('08:00', '17:30', '14:00', 90)); // true
console.log(isMeetingWithinWorkday('8:0', '10:0', '8:0', 120));     // true
console.log(isMeetingWithinWorkday('08:00', '14:30', '14:00', 90)); // false
console.log(isMeetingWithinWorkday('14:00', '17:30', '08:0', 90));  // false
console.log(isMeetingWithinWorkday('8:00', '17:30', '08:00', 900)); // false
*/
