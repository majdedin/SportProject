import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  user: any = {};
  errorMsg!: string;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    console.log("here obj ", this.user);
    this.userService.login(this.user).subscribe(
      //success login
      (data) => {
        if (data.user) {
          let decoded: any = jwtDecode(data.user);
          sessionStorage.setItem("token", data.user);
          

          if (decoded.role == 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['/'])
          }

        } else {
          this.errorMsg = "Please check your Email or Password";
        }
      }
    )
  }

}
