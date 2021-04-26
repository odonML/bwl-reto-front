import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  userList:User[];
  userObj: User;
  constructor(
    private users: UserService) { }

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
   const res= this.users.getUsers();
   res.subscribe((u:any) => {
      this.userList =[]; 
      for(let i=0; i<u.length; i++){
        this.userObj=u[i];
        this.userObj.createdAt= u[i].createdAt;
        this.userObj.login = u[i].login;
        this.userList.push(this.userObj as User);
      }
    })
  }
}
