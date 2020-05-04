import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: any;
  columnsToDisplay = [
    'userId',
    'emailId',
    'createdAT',
    'action'
  ];
  expandedElement: any;

  constructor(private router: Router,
    private service: ApiService) { }

  ngOnInit() {
    this.service.findUsers().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data['data'] ? data['data'] : []);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 500) {
            alert('Sorry!! You are not authorized for this Action');
            this.router.navigate(['/401'])
          } else {
            alert('internal error occured')
          }
        } else {
          alert('internal error occured without any http error');
        }
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter)
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(id) {
    alert('This Functionality has not been implemented yet')
  }

  onEdit(id){
    alert('This Functionality has not been implemented yet')
  }
}

