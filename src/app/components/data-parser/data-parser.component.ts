import { Component } from "@angular/core";
import { js } from "js-beautify";

const commonEditorOptions = {
    theme: "vs",
    lineNumber: "on",
    autoIndent: true,
    minimap: {
        enabled: false,
    },
};

function prettify(str: string): string {
    return js(str, { indent_size: 4 });
}

function uglify(str: string): string {
    return js(str, {
        indent_empty_lines: false,
        preserve_newlines: false,
        eol: "",
        indent_size: 0,
        keep_array_indentation: false,
        indent_char: "",
    }).replaceAll('": ', '":');
}

const initialSourceEditorText = '{"array": [1,2,3],"boolean": true,"null": null,"number": 123,"object": {"a": "b","c": "d","e": "f"},"string": "Hello World"}';

@Component({
    selector: "app-data-parser",
    templateUrl: "./data-parser.component.html",
    styleUrls: ["./data-parser.component.scss"],
})
export class DataParserComponent {
    constructor() {}
    availableOperations: IOperation[] = [
        {
            value: "json-blob",
            text: "JSON blob",
            sourceLanguage: "json",
            outputLanguage: "json",
        },
        {
            value: "json-stringify",
            text: "JSON Stringify",
            sourceLanguage: "json",
            outputLanguage: "",
        },
        {
            value: "json-parse",
            text: "JSON Parse",
            sourceLanguage: "",
            outputLanguage: "json",
        },
    ];

    currentOperation: IOperation = this.availableOperations[0];

    sourceEditor: any;
    sourceEditorText: string = "";
    sourceEditorOptions = {
        ...commonEditorOptions,
        language: this.currentOperation.sourceLanguage,
    };

    outputEditor: any;
    outputEditorText: string = "";
    outputEditorOptions = { ...commonEditorOptions, language: this.currentOperation.outputLanguage };

    ngOnInit(): void {
        this.sourceEditorText = initialSourceEditorText;
        this.prettifySource();
    }

    onSourceEditorInit(editor: any) {
        this.sourceEditor = editor;
        this.prettifySource();
    }

    onOutputEditorInit(editor: any) {
        this.outputEditor = editor;
    }

    onOperationChange(operation: IOperation) {
        this.currentOperation = operation;
        this.sourceEditorOptions = { ...this.sourceEditorOptions, language: operation.sourceLanguage };
        this.outputEditorOptions = { ...this.outputEditorOptions, language: operation.outputLanguage };
        this.convert(operation);
    }

    convert(operation: IOperation) {
        try {
            let srcText = this.sourceEditorText;
            switch (operation.value) {
                case "json-blob":
                    this.outputEditorText = JSON.parse(this.sourceEditorText);
                    break;
                case "json-parse":
                    try {
                        let code = JSON.parse(this.sourceEditorText);
                        console.log(typeof code);
                        if (typeof code == "object") {
                            alert("Sorry! Object cannot be converted to object.");
                            return;
                        }
                        {
                            this.outputEditorText = `${code}`;
                            this.outputEditor.updateOptions({ wordWrap: "bounded" });
                        }
                    } catch (err) {
                        // alert(err);
                    }
                    break;
                case "json-stringify":
                    this.outputEditorText = JSON.stringify(uglify(srcText));
                    this.outputEditor.updateOptions({ wordWrap: "bounded" });
                    break;

                default:
                    break;
            }
        } catch (err) {
            // alert(err);
        }
    }

    prettifySource() {
        this.sourceEditorText = prettify(this.sourceEditorText);
    }

    uglifySource() {
        this.sourceEditorText = uglify(this.sourceEditorText);
    }

    prettifyOutput() {
        this.outputEditorText = prettify(this.outputEditorText);
    }

    uglifyOutput() {
        this.outputEditorText = uglify(this.outputEditorText);
    }
}

interface IOperation {
    value: "json-blob" | "json-stringify" | "json-parse";
    text: string;
    sourceLanguage: string;
    outputLanguage: string;
}
