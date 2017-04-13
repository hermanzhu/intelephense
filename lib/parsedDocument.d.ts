import { Phrase, Token, MemberName, TokenType, PhraseType, SimpleVariable, ScopedMemberName } from 'php7parser';
import * as lsp from 'vscode-languageserver-types';
import { TreeVisitor, Event } from './types';
export interface ParsedDocumentChangeEventArgs {
    parsedDocument: ParsedDocument;
}
export declare class ParsedDocument {
    private static _wordRegex;
    private _textDocument;
    private _parseTree;
    private _changeEvent;
    private _debounce;
    private _reparse;
    constructor(uri: string, text: string);
    readonly tree: Phrase;
    readonly uri: string;
    readonly changeEvent: Event<ParsedDocumentChangeEventArgs>;
    textBeforeOffset(offset: number, length: number): string;
    wordAtOffset(offset: number): string;
    flush(): void;
    traverse(visitor: TreeVisitor<Phrase | Token>): void;
    applyChanges(contentChanges: lsp.TextDocumentContentChangeEvent[]): void;
    tokenRange(t: Token): lsp.Range;
    phraseRange(p: Phrase): lsp.Range;
    firstToken(node: Phrase | Token): Token;
    lastToken(node: Phrase | Token): Token;
    tokenText(t: Token): string;
    nodeText(node: Phrase | Token, ignore?: TokenType[]): string;
    createAnonymousName(node: Phrase): string;
    positionAtOffset(offset: number): lsp.Position;
    offsetAtPosition(position: lsp.Position): number;
    private _textDocumentChangeCompareFn(a, b);
}
export declare namespace ParsedDocument {
    function isToken(node: Phrase | Token, types?: TokenType[]): boolean;
    function isPhrase(node: Phrase | Token, types?: PhraseType[]): boolean;
    function isOffsetInToken(offset: number, t: Token): boolean;
    function isFixedMemberName(phrase: MemberName): boolean;
    function isFixedSimpleVariable(phrase: SimpleVariable): boolean;
    function isFixedScopedMemberName(phrase: ScopedMemberName): boolean;
    function stringyfyReplacer(k: any, v: any): any;
}
export declare class ParsedDocumentStore {
    private _parsedDocumentChangeEvent;
    private _parsedDocumentmap;
    private _unsubscribeMap;
    private _bubbleEvent;
    constructor();
    readonly parsedDocumentChangeEvent: Event<ParsedDocumentChangeEventArgs>;
    readonly count: number;
    has(uri: string): boolean;
    add(parsedDocument: ParsedDocument): void;
    remove(uri: string): void;
    find(uri: string): ParsedDocument;
}
