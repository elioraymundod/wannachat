import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private database: DataBaseService,
    private authService: AuthService) {
    this.authService.getUserLogged().subscribe(res => {
      this.userLogged = res;
    })
  }

  ngOnInit(): void {
  }

}
