import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuarios: any;
  usuario = {
    email: '',
    password: '',
    name: ''
  }

  ngOnInit() {
    
  }

  constructor(private authService: AuthService, private database: DataBaseService, private router: Router) { }

  registrarse() {
    const { email, password } = this.usuario;
    this.authService.register(email, password).then(user => {
      console.log("se registro: ", user);
      let lista = [...this.usuarios];
      let existe = lista.find(user => user.email == email);

      if (!existe) {
        console.log("USUARIO NUEVO CREADO")
        this.database.crear('users', this.usuario);
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'El usuario ingresado ya esta registrado',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      };

      this.router.navigate(['/panelDeControl']);
    }).catch(err => {
      console.log(err)
      if(password.length <6 ){
        Swal.fire({
          title: 'Error!',
          text: 'La contraseña debe tener al menos 6 caracteres',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
  }



}