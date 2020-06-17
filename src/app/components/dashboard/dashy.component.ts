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
  displayedColumns = ['id', 'name', 'email', 'phone', 'website'];
  dataSource: MatTableDataSource<DataTypes>;
  dataIn: any;
  selectedValue2: string;
  values = '';
  chooseValues = ['pdf', 'excel'];
  isAuthenticated: boolean;
  sortedData: any[];


  @ViewChild('contentPdf') contentPdf: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    this.dataServ.getData().subscribe(
      (res) => {
        this.dataIn = res;
      });
    return this.dataIn;
  }

  constructor(
    private dataServ: DataInputService,
    private route: Router
  ) {
    this.dataSource = new MatTableDataSource();
    // this.sortedData = this.dataIn.slice();
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



  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  //Sorting the data

  // sortData(sort: Sort) {
  //   const data = this.dataIn.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'id': return compare(a.id, b.id, isAsc);
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'fat': return compare(a.fat, b.fat, isAsc);
  //       case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // this.dataSource = this.dataIn.filter;
    console.log(this.dataSource.filter)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logOut() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

}

