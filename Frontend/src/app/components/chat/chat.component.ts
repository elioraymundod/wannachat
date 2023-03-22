import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatGptServiceService } from 'src/app/services/ChatGptService.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  nuevoMensaje: string = "";
  mostrarChat:boolean = true;
  mensajes: any =[
  ];
  usuarioLogueado: any;

  constructor(private authService: AuthService, private chatgptservice: ChatGptServiceService) { }

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
    const mensajeEnviado = {
      question: this.nuevoMensaje
    }
    this.chatgptservice.getRespuestaChatGpt(mensajeEnviado).subscribe(res => {
      let respuesta = {
        emisor: 'wannachat',
        texto: res[0].text
      }
      this.mensajes.push(respuesta)
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
      }, 10);
    }, err => {
      console.log(err)
    })
    this.nuevoMensaje = "";
    
    setTimeout(() => {
      this.scrollToTheLastElementByClassName()
    }, 10);
    
    
  }

  scrollToTheLastElementByClassName(){
    let elements=document.getElementsByClassName('msj');
    let ultimo: any = elements[(elements.length-1)];
    let toppos=ultimo.offSetTop;
    //@ts-ignore
    document.getElementById('contenedorMensajes')?.scrollTop=1000000;
  }

}
