// const codeBlocks = document.querySelectorAll(".highlight");
const codeBlocks = document.getElementsByClassName('highlight');
console.log(document.getElementsByClassName('highlight'));
console.log(codeBlocks);
// const copyCodeButtons = document.querySelectorAll('.copy-code-button');
const copyCodeButtons = document.getElementsByClassName('copy-code-button');
console.log('copyCodeButtons', copyCodeButtons);
console.log('1', codeBlocks, document.getElementsByClassName('highlight')[0] );
copyCodeButtons.forEach((copyCodeButton, index) => {
  const code = codeBlocks[index].innerText;
  console.log('sssss');
  copyCodeButton.addEventListener('click', () => {
    window.navigator.clipboard.writeText(code);
    copyCodeButton.classList.add('copied');

    setTimeout(() => {
      copyCodeButton.classList.remove('copied');
    }, 2000);
  });
});