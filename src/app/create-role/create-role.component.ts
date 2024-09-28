import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule, MatButtonModule, MatProgressSpinnerModule,MatTableModule,MatIconModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent implements OnInit {
  loading: boolean = false;
  roleList: any[] = []; // List to hold user data
  displayedColumns: string[] = ['id','role'];

  roleForm = new UntypedFormGroup({
    role: new UntypedFormControl("",[Validators.required]),
  });
  constructor(private httpService:HttpService,private utilsService:UtilsService) {
   
  }

  ngOnInit(): void {
    this.getRoleList()
  }

  routeTo(route:string){
    this.utilsService.goToRoute(route);
  }


  getRoleList(){
    this.httpService.getRole().subscribe({
      next: (res: any) => {
        console.log("usersList", res);
        if (res) {
          this.roleList = res;
        }
      },
      error: (err) => {
        console.error("Error fetching users", err);
        this.utilsService.openSnackBar("Failed to fetch user list", "Close");
      }
    });
  }

  onSubmit() {
    if (this.roleForm.valid) {
      this.httpService.createRole(this.roleForm.value).subscribe({
        next: (res) => {
          console.log("added data", res);
          this.utilsService.openSnackBar("Role added successfully", "Close");
          this.roleForm.reset();
          this.getRoleList()
        },
        error: (err) => {
          console.error("Error adding role", err);
          this.utilsService.openSnackBar(err?.error?.message, "Close");
        }
      });
    } else {
      this.utilsService.openSnackBar("Please fill in all required fields correctly", "Close");
    }
  }

  onCancel() {
    this.roleForm.reset(); // Reset the form fields
  }
}
