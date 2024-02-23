//// TODO
//Kind.load
//: ∀(name: String)
  //Kind.Book
//= λname
  //(Kind.load.name #5 name (String.Map.new Kind.Term))

//// Gets the source file of a definition
//Kind.load.file_of
//: ∀(name: String)
  //String
//= λname
  //(String.concat name ".kind2")

//// Loads a file into a new book
//Kind.load.file
//: ∀(file: String)
  //Kind.Book
//= λfile
  //(HVM.load Kind.Book file λdata
  //(Kind.Book.parse data))

//// Loads a name into a book
//Kind.load.name
//: ∀(lims: #U60)
  //∀(name: String)
  //∀(book: Kind.Book)
  //Kind.Book
//= λlims
  //(HVM.log #U60 ∀(name:String)∀(book:Kind.Book)Kind.Book lims
  //#match lims = lims {
    //#0: λname λbook book
    //#+: λname λbook
      //(HVM.print Kind.Book (String.concat "LOAD:" name)
      //// Checks if name is already on book
      //let P   = λx (Kind.Book)
      //let new = λhas λbook
        //// If it is, do nothing; otherwise, define it
        //let P     = λx ∀(book: Kind.Book) (Kind.Book)
        //let true  = λbook
          //(HVM.print Kind.Book (String.concat (String.concat "OLD!:" name) (String.concat " -- " (Kind.keys book))) book)
        //let false = λbook
          //(HVM.print Kind.Book (String.concat (String.concat "NEW!:" name) (String.concat " -- " (Kind.keys book)))
          //let file = (Kind.load.file (Kind.load.file_of name))
          //let defs = (String.Map.to_list Kind.Term file)
          //let bok1 = (Kind.load.define defs book)
          //let file = (Kind.load.file (Kind.load.file_of name))
          //let refs = (Kind.Book.get_refs file)
          //let bok2 = (HVM.print ?a (String.concat "REC!:" (Kind.keys bok1)) (Kind.load.name.many lims-1 refs bok1))
          //bok2)
          ////(HVM.print.many Kind.Book refs book)

        //((~has P true false) book)
      //(~(String.Map.has.linear Kind.Term name book) P new))
  //}: ∀(name: String) ∀(book: Kind.Book) Kind.Book)

//// Loads many names into a book
//Kind.load.name.many
//: ∀(lims: #U60)
  //∀(list: (List String))
  //∀(book: Kind.Book)
  //Kind.Book
//= λlims λlist λbook
  //let P    = λx ∀(book: Kind.Book) (Kind.Book)
  //let cons = λhead λtail λbook 
    ////(HVM.print Kind.Book
      ////(String.concat "DEP:"
      ////(String.concat head
      ////(String.concat " BOOK:"
      ////(Kind.Book.show book))))
    //let bok2 = (Kind.load.name lims head book)
    //(Kind.load.name.many lims tail bok2)
  //let nil  = λbook book
  //((~list P cons nil) book)

//// Defines a term and loads its dependencies
////Kind.load.define
////: ∀(name: String)
  ////∀(term: Kind.Term)
  ////∀(book: Kind.Book)
  ////Kind.Book
////= λname λterm λbook
  ////let book = (String.Map.set Kind.Term name term book)
  ////let refs = (Kind.Term.get_refs term)
  ////let book = (Kind.load.name.many refs book)
  ////book

//// Defines many terms
//Kind.load.define
//: ∀(defs: (List (Pair String Kind.Term)))
  //∀(book: Kind.Book)
  //Kind.Book
//= λdefs λbook
  //// If defs list isn't empty...
  //let P    = λx ∀(book: Kind.Book) (Kind.Book)
  //let cons = λdefs.head λdefs.tail λbook
    //// Gets the def name/term
    //let P   = λx (Kind.Book)
    //let new = λname λterm 
      //// Writes it to the book
      //let bok2 = (String.Map.set Kind.Term name term book)
      //(HVM.print Kind.Book (String.concat "DEF!:" name)
      //// Recurses
      //(Kind.load.define defs.tail bok2))
    //(~defs.head P new)
  //// If defs list is empty, return the book
  //let nil  = λbook book
  //((~defs P cons nil) book)


//Kind.keys
//: ∀(book: Kind.Book)
  //String
//= λbook
  //let defs = (String.Map.to_list Kind.Term book)
  //let defs = (List.app (Pair String Kind.Term) String (Pair.fst String Kind.Term) defs)
  //(String.join defs)



import { execSync } from 'child_process';
import * as fs from 'fs';

export function run(expr: string): string {
  var command = `hvm1 run -t 1 -c -f bootstrap.hvm1 '${expr}'`;
  try {
    const output = execSync(command).toString();
    return output;
  } catch (error) {
    throw error;
  }
}

export function str(result: string): string {
  return result.slice(1,-1).trim();
}

export function get_refs(code: string): string {
  return run(`(Strs.view ((Book.Kind.Book.get_refs) ((Book.Kind.Book.parse) (Str \`${code}\`))))`).trim();
}

export function to_hvm(code: string): string {
  return str(run(`(Str.view ((Book.Kind.Book.to_hvm) ((Book.Kind.Book.parse) (Str \`${code}\`))))`).trim());
}

//// Loads a name into a book
//Kind.load.name
//: ∀(lims: #U60)
  //∀(name: String)
  //∀(book: Kind.Book)
  //Kind.Book
//= λlims
  //(HVM.log #U60 ∀(name:String)∀(book:Kind.Book)Kind.Book lims
  //#match lims = lims {
    //#0: λname λbook book
    //#+: λname λbook
      //(HVM.print Kind.Book (String.concat "LOAD:" name)
      //// Checks if name is already on book
      //let P   = λx (Kind.Book)
      //let new = λhas λbook
        //// If it is, do nothing; otherwise, define it
        //let P     = λx ∀(book: Kind.Book) (Kind.Book)
        //let true  = λbook
          //(HVM.print Kind.Book (String.concat (String.concat "OLD!:" name) (String.concat " -- " (Kind.keys book))) book)
        //let false = λbook
          //(HVM.print Kind.Book (String.concat (String.concat "NEW!:" name) (String.concat " -- " (Kind.keys book)))
          //let file = (Kind.load.file (Kind.load.file_of name))
          //let defs = (String.Map.to_list Kind.Term file)
          //let bok1 = (Kind.load.define defs book)
          //let file = (Kind.load.file (Kind.load.file_of name))
          //let refs = (Kind.Book.get_refs file)
          //let bok2 = (HVM.print ?a (String.concat "REC!:" (Kind.keys bok1)) (Kind.load.name.many lims-1 refs bok1))
          //bok2)
          ////(HVM.print.many Kind.Book refs book)
        //((~has P true false) book)
      //(~(String.Map.has.linear Kind.Term name book) P new))
  //}: ∀(name: String) ∀(book: Kind.Book) Kind.Book)

export function load_file(file: string): string {
  return fs.readFileSync("./book/"+file, "utf8");
}

export function load_name(

console.log(get_refs(load("Bool")));