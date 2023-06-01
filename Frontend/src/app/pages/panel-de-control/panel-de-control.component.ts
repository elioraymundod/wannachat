import { Component, OnInit } from '@angular/core';
import { PreferenciasInterface } from 'src/app/interfaces/preferenciasInterface.interface';
import { UsersServiceService } from 'src/app/services/Users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-panel-de-control',
  templateUrl: './panel-de-control.component.html',
  styleUrls: ['./panel-de-control.component.css'],
})
export class PanelDeControlComponent implements OnInit {
  mostrarConfirmacion = false;
  codigoIngresado = '';
  codigoDeVerificacion = 'multitask4013';
  usuarios: any;
  listaDesordenada: any;
  sorteo: any;
  userLogged: any;
  totalPreferencias: any = [];
  preferenciasPersonalizadas: PreferenciasInterface[] = [];

  constructor(
    private usersService: UsersServiceService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.authService
      .getUserLogged()
      .subscribe((res) => {
        if (!res) return;
        //console.log('creacion PanelDeControlComponent');
        this.usersService.getUserById(res?.uid).subscribe((user) => {
          this.userLogged = user.userId;
          if (!this.userLogged) return;
          //Obtener lista de preferencias
          this.usersService
            .getPreferenciasByUsuario(this.userLogged)
            .subscribe((preferencias) => {
              this.totalPreferencias = JSON.parse(preferencias.preferencias);
              switch (this.totalPreferencias.length) {
                case 1:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-one-' + i,
                      selector: 'selector-one-' + i,
                    });
                  }
                  break;

                case 2:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-two-' + i,
                      selector: 'selector-two-' + i,
                    });
                  }
                  break;

                case 3:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-three-' + i,
                      selector: 'selector-three-' + i,
                    });
                  }
                  break;

                case 4:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-four-' + i,
                      selector: 'selector-four-' + i,
                    });
                  }
                  break;

                case 5:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-five-' + i,
                      selector: 'selector-five-' + i,
                    });
                  }
                  break;

                case 6:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-six-' + i,
                      selector: 'selector-six-' + i,
                    });
                  }
                  break;

                case 7:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-seven-' + i,
                      selector: 'selector-seven-' + i,
                    });
                  }
                  break;

                case 8:
                  for (let i = 1; i <= this.totalPreferencias.length; i++) {
                    this.preferenciasPersonalizadas.push({
                      nombrePreferencia: this.totalPreferencias[i - 1].interes,
                      item: 'item-' + i,
                      selector: 'selector-' + i,
                    });
                  }
                  break;
              }
              console.log(this.preferenciasPersonalizadas);
            });
        });
      })
  }
}
