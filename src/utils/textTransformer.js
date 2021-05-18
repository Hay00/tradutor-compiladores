export default class TextTransformer {
  static textToMap(text) {
    text = text.split('\n');

    for (let index = 0; index < text.length; index++) {
      const result = text[index].match(/[^ ]+/g);
      if (result) {
        text[index] = result;
      } else {
        text[index] = [];
      }
    }
    return text;
  }
}
