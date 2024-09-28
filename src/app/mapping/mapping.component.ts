import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
@Component({
  selector: 'app-mapping',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatCardModule,MatExpansionModule,MatCheckboxModule],
  templateUrl: './mapping.component.html',
  styleUrl: './mapping.component.css'
})
export class MappingComponent implements OnInit {
  userList:any[]=[];
  roleList:any[]=[];
  mappedRoles:any[]=[];
  selectedrolesToMap:any[]=[];

  constructor(private httpService:HttpService,private utilsService:UtilsService){
  }

  ngOnInit(): void {
    this.getRoleList();
    this.getUsersList();
  }

  routeTo(route:string){
    this.utilsService.goToRoute(route)
  }

  getRoleList(){
    this.httpService.getRole().subscribe({
      next: (res: any) => {
        console.log("roleList", res);
        if (res) {
          this.roleList = res;
          this.checkAndMapRoles()
        }
      },
      error: (err) => {
        console.error("Error fetching users", err);
      }
    });
  }

  getUsersList(){
    this.httpService.getUser().subscribe({
      next: (res: any) => {
        console.log("usersList", res);
        if (res) {
          this.userList = res;
          this.checkAndMapRoles()
        }
      },
      error: (err) => {
        console.error("Error fetching users", err);
      }
    });
  }

  checkAndMapRoles() {
    if (this.userList.length > 0 && this.roleList.length > 0) {
      this.doMappingForRoleUsers();
    }
  }

  doMappingForRoleUsers(){
    const emptyArr:any[] = []
    for(const role of this.roleList){
       const obj:any ={}
       const roledUsers = this.userList.filter((user)=>user?.roles && user?.roles?.includes(role?.roleId));
       const unroledUsers = this.userList.filter((user)=>user?.roles && !user?.roles?.includes(role?.roleId))
       obj['roleId'] = role.roleId;
       obj['roleName'] = role.roleName;
       obj['access'] = roledUsers;
       obj['restricted'] = unroledUsers;
       emptyArr.push(obj)
       console.log("emptyArr",emptyArr)
    }
    this.mappedRoles = emptyArr;
    console.log("mappedRoles",this.mappedRoles)
  }

  getNames(users:any){
    return users?.map((user:any)=>user?.userName).join(",")
  }

  updateStatus(status:boolean,roleId:any,userId:any){
   console.log("checkstatus",status,roleId,userId)
   const existingSelected = this.selectedrolesToMap;
   if(status){
     const obj={
      roleId:roleId,
      userId:userId,
     }
     this.selectedrolesToMap.push(obj);
   }
   else{
    const existingSelected = this.selectedrolesToMap.filter((e)=>e?.userId!==userId);
    this.selectedrolesToMap = existingSelected
   }
   console.log("this.selectedrolesToMap",this.selectedrolesToMap)
  }

  updateRoletoUsers(roleId:string){
    const usersNeedToUpdate = this.selectedrolesToMap.filter((e)=>e?.roleId===roleId).map((x)=>x.userId);
    if(usersNeedToUpdate.length===0){
      return this.utilsService.openSnackBar("No User selected","close")
    }
    console.log("usersNeedToUpdate",usersNeedToUpdate)
    const payload ={
      roleId:roleId,
      users:usersNeedToUpdate
    }
    this.httpService.assignRolesToUsers(payload).subscribe({
      next: (res) => {
        console.log("added data", res);
        this.utilsService.openSnackBar("User mapped successfully", "Close");
        this.getRoleList();
        this.getUsersList();
      },
      error: (err) => {
        console.error("Error mapping user", err);
        this.utilsService.openSnackBar(err?.error?.message, "Close");
      }
    });
  }

}
