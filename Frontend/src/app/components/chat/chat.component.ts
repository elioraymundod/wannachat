import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChatGptServiceService } from 'src/app/services/ChatGptService.service';
import { UsersServiceService } from 'src/app/services/Users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  nuevoMensaje: string = "";
  mostrarChat:boolean = false;
  mensajes: any =[];
  listSaludos: any = [];
  listProductos: any = [];
  listBusqueda: any = [];
  usuarioLogueado: any;
  usuariodb: any;
  showProgressBar: boolean = false;

  constructor(private authService: AuthService, private chatgptservice: ChatGptServiceService, private usersService: UsersServiceService) { }

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(usuario=> {
      this.usuarioLogueado = usuario;
      this.usersService.getUserById(usuario?.uid).subscribe(user => {
        this.usuariodb = user[0];
        let menasjeInicial = {
          emisor: 'wannachat',
          texto: `Hola ${this.usuariodb.nombre}, mi nombre es WannaChat. Cuéntame, ¿cómo puedo ayudarte hoy?`
        }    
        this.mensajes.push(menasjeInicial)
      })
      console.log("aaaaaaaaaaaaaa",usuario?.uid)
    })


    
  }

  enviarMensaje(){
    this.showProgressBar = true;
    if(this.nuevoMensaje == "") return;

    let mensaje = {
      emisor: this.usuarioLogueado.uid,
      texto: this.nuevoMensaje
    }

    this.mensajes.push(mensaje)
    const mensajeEnviado = {
      question: this.nuevoMensaje
    }

    // Buscar respuesta
    this.chatgptservice.getRespuestaChatGpt(mensajeEnviado).subscribe(res => {
      let respuesta = {
        emisor: 'wannachat',
        texto: res[0].text
      }
      this.mensajes.push(respuesta)
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
        this.showProgressBar = false;
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
