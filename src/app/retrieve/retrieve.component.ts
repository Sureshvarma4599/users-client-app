import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UtilsService } from '../services/utils.service';
import { HttpService } from '../services/http.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // If you want pagination
import { MatSortModule } from '@angular/material/sort'; // If you want sorting


@Component({
  selector: 'app-retrieve',
  standalone: true,
  imports: [MatIconModule,CommonModule,MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.css']
})
export class RetrieveComponent implements OnInit {
  mappingData:any;
  isRoleToUser = true;

  constructor(private utilsService: UtilsService, private httpService: HttpService) {}

  ngOnInit(): void {
    this.getData();
  }

  routeTo(route:string){
    this.utilsService.goToRoute(route)
  }

  getData() {
    this.httpService.getMappingData().subscribe({
      next: (res: any) => {
        console.log("usersList", res?.data);
        if (res) {
          this.mappingData = res?.data;
        }
      },
      error: (err) => {
        console.error("Error fetching users", err);
      }
    });
  }

  toggleMapping() {
    this.isRoleToUser = !this.isRoleToUser;
  }
}
