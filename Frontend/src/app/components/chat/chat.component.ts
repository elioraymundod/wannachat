import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  nuevoMensaje: string = "";
  mostrarChat:boolean = true;
  mensajes: any =[
    {
      emisor: "1uYd5joHIxWIjubXJWieta2CbNg2",
      texto: "Hola"
    },
    {
      emisor: "chatbot",
      texto: "Hola perro"
    },
    {
      emisor: "1uYd5joHIxWIjubXJWieta2CbNg2",
      texto: "que ases"
    },
    {
      emisor: "chatbot",
      texto: "ni miershde"
    }
  ];
  usuarioLogueado: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(usuario=> {
      this.usuarioLogueado = usuario;
      console.log(this.usuarioLogueado)
    })
  }

  enviarMensaje(){

    if(this.nuevoMensaje == "") return;

    let mensaje = {
      emisor: this.usuarioLogueado.uid,
      texto: this.nuevoMensaje
    }

    this.mensajes.push(mensaje)
    this.nuevoMensaje = "";

    setTimeout(() => {
      this.scrollToTheLastElementByClassName()
    }, 30);
    
  }

  scrollToTheLastElementByClassName(){
    let elements=document.getElementsByClassName('msj');
    let ultimo: any = elements[(elements.length-1)];
    let toppos=ultimo.offSetTop;

    //@ts-ignore
    document.getElementById('contenedorMensajes')?.scrollTop=toppos;
  }

}
