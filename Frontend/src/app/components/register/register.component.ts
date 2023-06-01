import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/Users.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;
  ngOnInit() {}

  constructor(
    private authService: AuthService,
    private database: DataBaseService,
    private router: Router,
    private userServices: UsersServiceService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
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
          validators: [
            Validators.required,
            Validators.minLength(6),
          ],
        },
      ],
    });
  }
  registrarse() {
    if(this.formGroup.invalid) return;
    //const { email, password } = this.usuario;
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;
    const name = this.formGroup.get('name')?.value;
    const userData = {
      email,
      password,
      name
    }
    this.authService
      .register(email, password)
      .then((user) => {
        //console.log("se registro---------->>> : ", user);
        //console.log('a ver si imprime algo -----------------', user?.additionalUserInfo?.isNewUser)
        if (user?.additionalUserInfo?.isNewUser) {
          console.log('USUARIO NUEVO CREADO');
          this.database.crear('users', userData);
          this.router.navigate(['/intereses']);
          this.authService
            .getUserLogged()
            .subscribe((usuario: any) => {
              const newUser: any = [
                {
                  userId: usuario.uid,
                  username: email,
                  password: password,
                  nombre: name,
                },
              ];
              this.userServices.insertUser(newUser[0]).subscribe((res) => {
                Swal.fire({
                  title: 'Excelente!',
                  text: 'El usuario ha sido registrado con éxito',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
              });
            })
        } else if (password.length < 6) {
          Swal.fire({
            title: 'Error!',
            text: 'La contraseña debe tener al menos 6 caracteres',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          console.log('USUARIO NUEVO NO CREADO..!!!!!!!!!!!');
          Swal.fire({
            title: 'Error!',
            text: 'El usuario ingresado ya esta registrado',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((err) => {
        console.log('SI NO ENTRO ES------------>', err);
        if (password.length < 6) {
          Swal.fire({
            title: 'Error!',
            text: 'La contraseña debe tener al menos 6 caracteres',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
  }
}
