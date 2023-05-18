import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteresesService } from 'src/app/services/Intereses.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-catalogo-intereses',
  templateUrl: './catalogo-intereses.component.html',
  styleUrls: ['./catalogo-intereses.component.css']
})
export class CatalogoInteresesComponent implements OnInit {

  constructor(private authService: AuthService, private interesesService: InteresesService, private router: Router ) { }

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

  ngOnInit(): void {

  }
  public RemoverIntereses(a: string) {
    
     for (let i = 0; i < this.listaIntereses.length; i++) {
      if (this.listaIntereses[i].interes === a) {
        let rzapato=this.listaIntereses.splice(i,1);
        console.warn("mostrar lo eliminado...",rzapato)
        if(rzapato[0].interes=="Zapato"){
          this.zapato = true;
          this.rzapato=false;
        }
        else if(rzapato[0].interes=="playera"){
          this.playera = true;
          this.rplayera=false;
        }
        else if(rzapato[0].interes=="sudadera"){
          this.sudadera = true;
          this.rsudadera=false;
        }
        else if(rzapato[0].interes=="gorra"){
          this.gorra = true;
          this.rgorra=false;
        }
        else if(rzapato[0].interes=="banda"){
          this.banda = true;
          this.rbanda=false;
        }
        else if(rzapato[0].interes=="balon"){
          this.balon = true;
          this.rbalon=false;
        }
        else if(rzapato[0].interes=="audifonos"){
          this.audifonos = true;
          this.raudifonos=false;
        }
        else if(rzapato[0].interes=="pachon"){
          this.pachon = true;
          this.rpachon=false;
        }
      }
    } 
    console.log("Mostrando lista de intereses: ", this.listaIntereses);
  }


  public listarIntereses(a: string, b: string) {
    let interesesTemp = {
     // "usuario": a,
      "interes": b
    }
    this.listaIntereses.push(interesesTemp);
    for (let i = 0; i < this.listaIntereses.length; i++) {
      if (this.listaIntereses[i].interes == 'Zapato') {
        this.zapato = false;
        this.rzapato=true;
      }
      if (this.listaIntereses[i].interes == 'playera') {
        this.playera = false;
        this.rplayera=true;
      }
      if (this.listaIntereses[i].interes == 'sudadera') {
        this.sudadera = false;
        this.rsudadera=true;
      }
      if (this.listaIntereses[i].interes == 'gorra') {
        this.gorra = false;
        this.rgorra=true;
      }
      if (this.listaIntereses[i].interes == 'banda') {
        this.banda = false;
        this.rbanda=true;
      }
      if (this.listaIntereses[i].interes == 'balon') {
        this.balon = false;
        this.rbalon=true;
      }
      if (this.listaIntereses[i].interes == 'audifonos') {
        this.audifonos = false;
        this.raudifonos=true;
      }
      if (this.listaIntereses[i].interes == 'pachon') {
        this.pachon = false;
        this.rpachon=true;
      }

    }

    console.log("Mostrando lista de intereses: ", this.listaIntereses);
  }

  guardarPreferencias() {
    this.authService.getUserLogged().subscribe((usuario: any) => {
      const userPreferencias = [
        {
          usuario: usuario.uid,
          preferencias: JSON.stringify(this.listaIntereses)
        }
      ]
      this.interesesService.insertPreferencias(userPreferencias[0]).subscribe(res => {
        this.router.navigate(['/panelDeControl']);
      })
    })
  }
}
