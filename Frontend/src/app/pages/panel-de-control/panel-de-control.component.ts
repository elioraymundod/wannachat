import { Component, Input, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/Users.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.css']
})
export class PanelDeControlComponent implements OnInit {
  mostrarConfirmacion = false;
  codigoIngresado = "";
  codigoDeVerificacion = "multitask4013"
  usuarios: any;
  listaDesordenada: any;
  sorteo: any;
  userLogged: any;

  constructor(private database: DataBaseService, private usersService: UsersServiceService,
    private authService: AuthService) {
    this.authService.getUserLogged().subscribe(res => {
      this.usersService.getUserById(res?.uid).subscribe(user => {
        this.userLogged = user[0].user_id;

        //Obtener lista de preferencias
        this.usersService.getPreferenciasByUsuario(this.userLogged).subscribe(preferencias => {
          console.log('las preferencias son ', JSON.parse(preferencias[0].preferencias))
        })
      })
    })

    
  }

  ngOnInit(): void {
    //Obtener el usuario logueado
    
    //Obtener lista de preferencias
  }

}
