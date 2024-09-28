import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-role',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatInputModule, MatButtonModule, MatProgressSpinnerModule,MatTableModule],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent {
  loading: boolean = false;
  roleList: any[] = []; // List to hold user data
  displayedColumns: string[] = ['id','role'];

  roleForm = new UntypedFormGroup({
    role: new UntypedFormControl("",[Validators.required]),
  });
  constructor() {
   
  }

  onSubmit() {
    if (this.roleForm.valid) {
      this.loading = true;
      console.log("useform",this.roleForm.value);
      this.roleList = [this.roleForm.value]
      console.log("useform data",this.roleList);
      this.loading = false;
    
    }
  }

  onCancel() {
    this.roleForm.reset(); // Reset the form fields
  }
}
