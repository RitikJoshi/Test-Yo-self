import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService, 
    private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username==''||this.user.username==null){
      //alert('User is required!!');
      this.snack.open('Username is required!','',{
        duration:2000,
      })
      return;
    }
    //validate

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        //alert('success');
        Swal.fire('Registered','User id is '+data.id,'success');
      },
      (error)=>{
        //error
        console.log(error);
        //alert('something went wrong');
        this.snack.open('Something went wrong','',{
          duration:2000
        })
      }
    )
    //adduser: userservice
  }
}
