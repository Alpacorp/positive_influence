export default function transformText(originalText) {
  let newText = originalText.split(' ');
  for (let index = 0; index < newText.length; index++) {
    newText[index] = newText[index].charAt(0).toUpperCase() + newText[index].substring(1).toLowerCase();
  }
  let textData = newText.join(' ');
  return textData;
};