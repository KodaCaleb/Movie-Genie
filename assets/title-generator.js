const inputText = document.getElementById('input-text');
const generateBtn = document.getElementById('generate-btn');
const result = document.getElementById('result');

generateBtn.addEventListener('click', () => {
  const options = inputText.value.split(',').map(option => option.trim());

  if (options.length === 0) {
    result.textContent = 'Please enter at least one option.';
  } else {
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];
    result.textContent = `Your random option is: ${randomOption}`;
  }
});