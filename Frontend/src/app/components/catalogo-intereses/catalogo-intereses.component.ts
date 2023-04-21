import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-catalogo-intereses',
  templateUrl: './catalogo-intereses.component.html',
  styleUrls: ['./catalogo-intereses.component.css']
})
export class CatalogoInteresesComponent implements OnInit {

  constructor() { }

   listaIntereses :any = [];
   zapato: boolean=true;
   playera:boolean=true;
   sudadera:boolean=true;
   gorra:boolean=true;
   banda:boolean=true;
   balon:boolean=true;
   audifonos:boolean=true;
   pachon:boolean=true;
//insert into wannachat.preferencias_usuario (usuario, preferencias) values ('1uYd5joHIxWIjubXJWieta2CbNg2', 'zapatos');

  ngOnInit(): void {
    
  }

public listarIntereses(a:string, b:string){
  let interesesTemp ={
    "usuario":a,
    "interes":b
  }
  this.listaIntereses.push(interesesTemp);
  for(let i=0 ;i<this.listaIntereses.length;i++ ){
    if(this.listaIntereses[i].interes=='Zapato'){
      this.zapato=false;
    }
    if(this.listaIntereses[i].interes=='playera'){
      this.playera=false;
    }
    if(this.listaIntereses[i].interes=='sudadera'){
      this.sudadera=false;
    }
    if(this.listaIntereses[i].interes=='gorra'){
      this.gorra=false;
    }
    if(this.listaIntereses[i].interes=='banda'){
      this.banda=false;
    }
    if(this.listaIntereses[i].interes=='balon'){
      this.balon=false;
    }
    if(this.listaIntereses[i].interes=='audifonos'){
      this.audifonos=false;
    }
    if(this.listaIntereses[i].interes=='pachon'){
      this.pachon=false;
    }
    
  }
  console.log("Mostrando lista de intereses: ",this.listaIntereses);
}


}
