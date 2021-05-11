import React, { useState } from "react";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
    Button,
    CodeInput,
    CodeArea,
    Container,
    Content,
    Title,
} from "./styles";
import TextTransformer from "./utils/textTransformer";

const initialInput = `algoritmo "Exemplo"

Var
    a, b : inteiro

inicio
    para a de 1 ate 10 faca
        escreva "Digite um valor:"
        leia(b)
    fimpara
fimalgoritmo

`;

const output = ` var a,b;

  for(a = 1; a < 10; a++){
    console.log("Digite um valor:");
    b = readline();
  }
`;

console.log(TextTransformer.textToMap(initialInput));

export default function App() {
    const [input, setInput] = useState(initialInput);

    return (
        <Container>
            <Title>Tradutor de VisualALG para JavaScript</Title>
            <Content>
                <CodeInput
                    value={input}
                    onChange={({ target }) => setInput(target.value)}
                />
                <Button>Traduzir</Button>
                <CodeArea language='javascript' style={vs2015}>
                    {output}
                </CodeArea>
            </Content>
        </Container>
    );
}
