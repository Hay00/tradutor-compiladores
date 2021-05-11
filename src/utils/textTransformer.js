export default class TextTransformer {
    static textToMap(text) {
        text = text.split("\n");

        for (let index = 0; index < text.length; index++) {
            text[index] = text[index].match(/[^ ]+/g);
        }
        return text;
    }
}
