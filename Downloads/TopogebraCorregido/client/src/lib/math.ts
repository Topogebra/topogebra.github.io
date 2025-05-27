/**
 * Checks if a number is even
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * Checks if a number is odd
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * Checks if a number is prime
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (isEven(num) || num % 3 === 0) return false;
  
  const sqrtNum = Math.sqrt(num);
  for (let i = 5; i <= sqrtNum; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}

/**
 * Checks if a number is divisible by another number
 */
export function isDivisibleBy(num: number, divisor: number): boolean {
  return num % divisor === 0;
}

/**
 * Checks if a number is a multiple of another number
 */
export function isMultipleOf(num: number, multiplier: number): boolean {
  return num % multiplier === 0;
}

/**
 * Checks if a number is a square number
 */
export function isSquare(num: number): boolean {
  const sqrt = Math.sqrt(num);
  return Math.floor(sqrt) === sqrt;
}

/**
 * Checks if a number is a fibonacci number
 * A number is Fibonacci if either (5*n^2 + 4) or (5*n^2 - 4) is a perfect square
 */
export function isFibonacci(num: number): boolean {
  const check1 = 5 * num * num + 4;
  const check2 = 5 * num * num - 4;
  
  return isSquare(check1) || isSquare(check2);
}

/**
 * Returns the sum of digits in a number
 */
export function sumOfDigits(num: number): number {
  return Math.abs(num)
    .toString()
    .split('')
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}
