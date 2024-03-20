const maxTimeout = 5000; // Maximum time in milliseconds
let inputArray = []; // Array to hold subsequent inputs
let timeoutId = null; // Variable to hold the timeout ID

// Function to handle input
const handleInput = (input) => {
  inputArray.push(input); // Append the input to the array
  clearTimeout(timeoutId); // Clear previous timeout
  timeoutId = setTimeout(() => {
    numToLetter(inputArray); // Call numToLetter with the inputArray
    inputArray = []; // Clear the inputArray after the timeout
  }, maxTimeout); // Set timeout for maxTimeout milliseconds
};

// Example usage:
handleInput(1); // Simulate input
handleInput(1); // Simulate input
handleInput(1); // Simulate input
// After the timeout, numToLetter function will be called with inputArray containing [1, 1, 1]
