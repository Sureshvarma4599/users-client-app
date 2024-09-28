import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule, MatButtonModule, MatProgressSpinnerModule,MatTableModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnChanges {
  loading: boolean = false;
  userList: any[] = []; // List to hold user data
  displayedColumns: string[] = ['id','userName', 'phoneNumber', 'emailId'];

  userForm = new UntypedFormGroup({
    userName: new UntypedFormControl("",[Validators.required]),
    phoneNumber:new UntypedFormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),  // 10-digit phone number
    emailId: new UntypedFormControl("", [Validators.required, Validators.email])
  });
  constructor() {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes",changes)
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      console.log("useform",this.userForm.value);
      this.userList = [this.userForm.value]
      console.log("useform data",this.userList);
      this.loading = false;
    
    }
  }

  onCancel() {
    this.userForm.reset(); // Reset the form fields
  }
}
