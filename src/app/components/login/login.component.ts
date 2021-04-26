import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HoraLogin } from 'src/app/models/horaLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = new User();
  hLogin = new HoraLogin();
  hora = Date.now();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signInWithEmail(userForm: NgForm) {
    this.user.email = userForm.value['email'];
    this.user.password = userForm.value['password'];

    if (
      this.user.email !== undefined &&
      this.user.email !== '' &&
      this.authService.esEmailValido(this.user.email)
    ) {
      if (this.authService.esPassValido(this.user.password)) {
        const res = this.authService.singIn(this.user);
        res.subscribe((c: any) => {
          this.horaLogin(c.dataUser.id);
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1000,
          });
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Contraseña no Valida',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Correo No Valido',
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }
  horaLogin(id: string) {
    this.hLogin.login = this.hora;
    const res = this.authService.updateHora(id, this.hLogin);
    res.subscribe((c: any) => {});
  }
}
