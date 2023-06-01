import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  usuario = {
    email: '',
    password: '',
  };

  ngOnInit() {}

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ],
        },
      ],
      password: [
        null,
        {
          validators: [Validators.required, Validators.minLength(6)],
        },
      ],
    });
  }

  async ingresar() {
    if (this.formGroup.invalid) return;
    //const { email, password } = this.usuario;
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    this.authService
      .login(email, password)
      .then((user) => {
        if (!user) {
          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
        //console.log(user);
        //localStorage.setItem('user','Flavio')
        this.router.navigate(['/panelDeControl']);
      })
      .catch((err) => {});
  }

  logout() {
    this.authService.logout();
  }
}
