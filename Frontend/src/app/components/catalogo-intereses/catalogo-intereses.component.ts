import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteresesService } from 'src/app/services/Intereses.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-catalogo-intereses',
  templateUrl: './catalogo-intereses.component.html',
  styleUrls: ['./catalogo-intereses.component.css'],
})
export class CatalogoInteresesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private interesesService: InteresesService,
    private router: Router
  ) {}

  listaIntereses: any = [];
  zapato: boolean = true;
  playera: boolean = true;
  sudadera: boolean = true;
  gorra: boolean = true;
  banda: boolean = true;
  balon: boolean = true;
  audifonos: boolean = true;
  pachon: boolean = true;
  rzapato: boolean = false;
  rplayera: boolean = false;
  rsudadera: boolean = false;
  rgorra: boolean = false;
  rbanda: boolean = false;
  rbalon: boolean = false;
  raudifonos: boolean = false;
  rpachon: boolean = false;
  //insert into wannachat.preferencias_usuario (usuario, preferencias) values ('1uYd5joHIxWIjubXJWieta2CbNg2', 'zapatos');

  ngOnInit(): void {}
  public RemoverIntereses(a: string) {
    for (let i = 0; i < this.listaIntereses.length; i++) {
      if (this.listaIntereses[i].interes === a) {
        let rzapato = this.listaIntereses.splice(i, 1);
        console.warn('mostrar lo eliminado...', rzapato);
        if (rzapato[0].interes == 'Zapato') {
          this.zapato = true;
          this.rzapato = false;
        } else if (rzapato[0].interes == 'Playeras') {
          this.playera = true;
          this.rplayera = false;
        } else if (rzapato[0].interes == 'Sudaderas') {
          this.sudadera = true;
          this.rsudadera = false;
        } else if (rzapato[0].interes == 'Gorras') {
          this.gorra = true;
          this.rgorra = false;
        } else if (rzapato[0].interes == 'Bandas') {
          this.banda = true;
          this.rbanda = false;
        } else if (rzapato[0].interes == 'Balones') {
          this.balon = true;
          this.rbalon = false;
        } else if (rzapato[0].interes == 'Audifonos') {
          this.audifonos = true;
          this.raudifonos = false;
        } else if (rzapato[0].interes == 'Pachones') {
          this.pachon = true;
          this.rpachon = false;
        }
      }
    }
    console.log('Mostrando lista de intereses: ', this.listaIntereses);
  }

  public listarIntereses(a: string, b: string) {
    let interesesTemp = {
      // "usuario": a,
      interes: b,
    };
    this.listaIntereses.push(interesesTemp);
    for (let i = 0; i < this.listaIntereses.length; i++) {
      if (this.listaIntereses[i].interes == 'Tennis') {
        this.zapato = false;
        this.rzapato = true;
      }
      if (this.listaIntereses[i].interes == 'Playeras') {
        this.playera = false;
        this.rplayera = true;
      }
      if (this.listaIntereses[i].interes == 'Sudaderas') {
        this.sudadera = false;
        this.rsudadera = true;
      }
      if (this.listaIntereses[i].interes == 'Gorras') {
        this.gorra = false;
        this.rgorra = true;
      }
      if (this.listaIntereses[i].interes == 'Bandas') {
        this.banda = false;
        this.rbanda = true;
      }
      if (this.listaIntereses[i].interes == 'Balones') {
        this.balon = false;
        this.rbalon = true;
      }
      if (this.listaIntereses[i].interes == 'Audifonos') {
        this.audifonos = false;
        this.raudifonos = true;
      }
      if (this.listaIntereses[i].interes == 'Pachones') {
        this.pachon = false;
        this.rpachon = true;
      }
    }

    console.log('Mostrando lista de intereses: ', this.listaIntereses);
  }

  guardarPreferencias() {
    if (this.listaIntereses.length == 0) {
      Swal.fire({
        title: 'Info',
        text: 'No a seleccionado una preferencia, por favor intentelo de nuevo.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
      return;
    }
    this.authService.getUserLogged().subscribe((usuario: any) => {
      //console.log('usuario', usuario);
      if (!usuario) return;
      const userPreferencias = [
        {
          usuario: usuario.uid,
          preferencias: JSON.stringify(this.listaIntereses),
        },
      ];
      this.interesesService
        .insertPreferencias(userPreferencias[0])
        .subscribe(() => {
          this.router.navigate(['/panelDeControl']);
        });
    });
  }
}
