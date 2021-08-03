import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  columnDefs = [
    { field: 'RowSelect', headerName: '', checkboxSelection: true, suppressMenu: true, suppressSorting: true, headerCheckboxSelection:true, width: 100 },
    { field: 'Number1',sortable: true, filter: true },
    { field: 'Number2',sortable: true, filter: true },
    { field: 'Number3',sortable: true, filter: true },
    { field: 'Number4',sortable: true, filter: true },
    { field: 'Number5',sortable: true, filter: true }
  ];

  //row data which will be fetched asynchronously
  rowData: any[];
  sum = 0;

  private subscriptions: Subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // getting the row data through api (currently from rowData.json file inside assests folder)
    this.subscriptions.add(
      this.http.get<any[]>('/assets/rowData.json').subscribe(res => this.rowData = res
    ));
  }

  // getting the selected rows (rows checked by user)
  getSelectedRows(): void {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.getRowSum(selectedData)
  }
  // getting the sum of selected rows (currently for "Number1" column --> can be extended for other columns)
  getRowSum(selectedData: any[]): void {
    let newObj = {
      Number1: 0
    }
    selectedData.forEach(row => {
      newObj['Number1'] = row['Number1'] + newObj['Number1']
      })
      this.sum = newObj['Number1']
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
