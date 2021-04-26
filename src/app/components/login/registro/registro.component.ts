import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HoraLogin } from 'src/app/models/horaLogin';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  user = new User();
  hLogin = new HoraLogin();
  hora = Date.now();
  passV = true;
  nameV = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  addUser(userForm: NgForm) {
    this.user.name = userForm.value['name'];
    this.user.email = userForm.value['email'];
    this.user.password = userForm.value['password'];

    console.log(typeof this.user.name);
    if (
      this.user.name !== undefined &&
      this.user.name !== '' &&
      this.authService.esNombreValido(this.user.name)
    ) {
      this.nameV = true;
      if (
        this.user.email !== undefined &&
        this.user.email !== '' &&
        this.authService.esEmailValido(this.user.email)
      ) {
        if (this.authService.esPassValido(this.user.password)) {
          if (
            userForm.value['password'] === userForm.value['password_confir']
          ) {
            this.passV = true;

            const res = this.authService.createUser(this.user);
            res.subscribe((c: any) => {
              this.horaLogin(c.dataUser.id);

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cuenta Creada',
                showConfirmButton: false,
                timer: 1500,
              });
              this.router.navigate(['/dashboard']);
            });

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Contraseña no Coinside',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        } else {
          this.passV = false;
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
          title: 'Error en el Campo Correo',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
      this.nameV = false;
      Swal.fire({
        icon: 'error',
        title: 'Error en el Campo Nombre',
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
