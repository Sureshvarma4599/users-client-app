import { Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,MatIconModule,ReactiveFormsModule,MatInputModule, MatButtonModule, MatProgressSpinnerModule,MatTableModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
  loading: boolean = false;
  userList: any[] = []; 
  displayedColumns: string[] = ['id','userName', 'phoneNumber', 'emailId'];

  userForm = new UntypedFormGroup({
    userName: new UntypedFormControl("",[Validators.required]),
    phoneNumber:new UntypedFormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),  // 10-digit phone number
    emailId: new UntypedFormControl("", [Validators.required, Validators.email])
  });

  constructor( private httpService:HttpService,private snackBar: MatSnackBar, private utilsService:UtilsService) {
   
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes",changes)
  }

  routeTo(route:string){
    this.utilsService.goToRoute(route);
  }

  getUsersList(){
    this.httpService.getUser().subscribe({
      next: (res: any) => {
        console.log("usersList", res);
        if (res) {
          this.userList = res;
        }
      },
      error: (err) => {
        console.error("Error fetching users", err);
        this.utilsService.openSnackBar("Failed to fetch user list", "Close");
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.httpService.createUser(this.userForm.value).subscribe({
        next: (res) => {
          console.log("added data", res);
          this.utilsService.openSnackBar("User added successfully", "Close");
          this.userForm.reset();
          this.getUsersList()
        },
        error: (err) => {
          console.error("Error adding user", err);
          this.utilsService.openSnackBar(err?.error?.message, "Close");
        }
      });
    } else {
      this.utilsService.openSnackBar("Please fill in all required fields correctly", "Close");
    }
  }

  onCancel() {
    this.userForm.reset(); // Reset the form fields
  }
}
