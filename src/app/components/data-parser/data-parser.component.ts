import { Component } from '@angular/core';

@Component({
  selector: 'app-data-parser',
  templateUrl: './data-parser.component.html',
  styleUrls: ['./data-parser.component.scss']
})
export class DataParserComponent {
  constructor() { }
  dataOperations: DataOperations[] = [
    {value: 'json-blob', viewValue: 'JSON blob'},
    {value: 'json-stringify', viewValue: 'Json Stringify'},
    {value: 'parse-string', viewValue:'Stingified to Object'}
  ];

  editor1:any;
  editor2:any;

  currentOperation:string = this.dataOperations[0].value;
  editorOptions1 = {theme: 'vs', language: 'json', lineNumber:'on', autoIndent:true};
  code1: any= '';

  editorOptions2 = {theme: 'vs', language: 'javascript'};
  code2: any= '';
  
  ngOnInit(): void {
    this.code1 = `{
      "array": [
        1,
        2,
        3
      ],
      "boolean": true,
      "null": null,
      "number": 123,
      "object": {
        "a": "b",
        "c": "d",
        "e": "f"
      },
      "string": "Hello World"
    }`
  }

  editor1Init(editor:any){
    this.editor1 = editor;
  }

  editor2Init(editor:any){
    this.editor2 = editor;
  }

  changeOperation(text:string){
    console.log(text)
    this.currentOperation = text;
  }

  convert(operation:string){
    try{
      let text = this.code1;
      console.log(operation)
      if(operation == 'json-stringify'){
        this.code2 = JSON.stringify(text)
        this.editor2.updateOptions({ wordWrap: "bounded" })
      }
      if(operation == 'json-blob'){
      this.code2 = JSON.parse(this.code1)
      }
      if(operation == 'parse-string'){
        try{
          let code = JSON.parse(this.code1);
          console.log(typeof code)
          if((typeof code == 'object')){
            alert("Sorry! Object cannot be converted to object.")
            return;
          }{
            this.code2 = `${code}`;
            this.editor2.updateOptions({ wordWrap: "bounded" })
          }
        }catch(err){
          alert("something")
        }

      }
    }catch(err){
      alert(err)
    }
  }

  prettify(){
    this.editor1.getAction('editor.action.formatDocument').run()

  }

  uglify(){
    this.code1 = this.code1.replaceAll(/\s+|\s+$|\n+|\t/g, '');
  }
}

interface DataOperations{
  value: string;
  viewValue: string;
}