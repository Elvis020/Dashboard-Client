import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTypes } from './models/data-types';
import {Sort} from '@angular/material/sort';
import { DataInputService } from './services/data-input.service';
import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-dashy',
  templateUrl: './dashy.component.html',
  styleUrls: ['./dashy.component.css']
})
export class DashyComponent implements OnInit {
  ELEMENT_DATA: DataTypes[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'website'];
  dataSource = new MatTableDataSource<DataTypes>(this.ELEMENT_DATA);


  selectedValue2: string;
  values = '';
  chooseValues = ['pdf', 'excel'];
  isAuthenticated: boolean;



  @ViewChild('contentPdf') contentPdf: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;


  ngOnInit() {
    this.getAllData();
  }

  constructor(
    private dataServ: DataInputService,
    private route: Router
  ) {}

    getAllData() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const response = this.dataServ.dataReport();
    response.subscribe(
      (report => this.dataSource.data = report as DataTypes[])
    );
  }


  // Export to Pdf
  public onServicegeneratePdf(): void {
    const DATA = this.contentPdf.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');

    const handleElement = {
      '#editor'(element, renderer) {
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML, 15, 15, {
      width: 700,
      elementHandlers: handleElement
    });

    doc.save('Angular Table.pdf');
  }


  // Export to Excel
  onServicegenerateExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.contentPdf.nativeElement);
    // converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Angular_Table.xlsx');

  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  logOut() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

}

