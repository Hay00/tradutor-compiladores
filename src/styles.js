import SyntaxHighlighter from "react-syntax-highlighter";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
`;

export const Title = styled.h1`
    padding: 16px;
    text-align: center;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const CodeInput = styled.textarea`
    resize: none;
    height: 700px;
    width: 800px;
    padding: 10px;
    margin: 16px 20px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const CodeOutput = styled(SyntaxHighlighter).attrs(() => ({
    showLineNumbers: true,
    wrapLines: true,
    wrapLongLines: true,
    editable: true,
}))`
    height: 700px;
    width: 800px;
    margin: 16px 20px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`;

export const Button = styled.button`
    background-color: #3f51b5;
    font-size: 1em;
    color: white;
    padding: 12px 16px;
    border: none;
    border-radius: 4px;
`;