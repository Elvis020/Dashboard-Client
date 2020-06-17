import { EventEmitter, Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class UserService {
  activated = new EventEmitter<boolean>();
  generatePdf = new EventEmitter<boolean>();

  // onServicegeneratePdf() {
  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   pdfMake.createPdf(documentDefinition).open();
  // }
  onServicegeneratePdf() {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    pdfMake.createPdf(documentDefinition).open();
  }

  onServicegenerateExcel() {
    const documentDefinition = { content: 'This is an sample Excel file' };
    pdfMake.createPdf(documentDefinition).open();
  }

  constructor() { }

}
