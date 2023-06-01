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
  role: string = 'assistant';

  constructor(private authService: AuthService, private chatgptservice: ChatGptServiceService, private usersService: UsersServiceService) {

    this.mensajes = [];
  }

  async ngOnInit(): Promise<void>{
    this.mensajes = [];
   // window.location.reload();
    this.authService.getUserLogged().subscribe(async (usuario)=> {
      this.usuarioLogueado = usuario;
      console.log('creacion ChatComponent');
      if (usuario) {
        this.usersService.getUserById(usuario?.uid).subscribe((user) => {
          this.usuariodb = user;
          let menasjeInicial = {
            emisor: 'wannachat',
            texto: `Hola ${this.usuariodb.nombre}, mi nombre es WannaChat. Cuéntame, ¿cómo puedo ayudarte hoy?`,
          };
          this.mensajes.push(menasjeInicial);
        });
        console.log('aaaaaaaaaaaaaa', usuario?.uid);
      }
    })
  }

  async enviarMensaje(){
    if(!this.nuevoMensaje) return;
    this.showProgressBar = true;
    let mensaje = {
      emisor: this.usuarioLogueado.uid,
      texto: this.nuevoMensaje
    }

    this.mensajes.push(mensaje)
    const mensajeEnviado = {
      role: this.role,
      content: this.nuevoMensaje
    }

    // Buscar respuesta
    this.chatgptservice.getRespuestaChatGpt(mensajeEnviado).subscribe(res => {
      let respuesta = {
        emisor: 'wannachat',
        texto: res[0].message.content
      }
      this.mensajes.push(respuesta)
      setTimeout(() => {
        this.scrollToTheLastElementByClassName()
        this.showProgressBar = false;
        this.role = 'user';
      }, 10);
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
  cerrarChat(){
    this.mostrarChat = false;
    const menasjeInicial = {
      emisor: 'wannachat',
      texto: `Hola ${this.usuariodb.nombre}, mi nombre es WannaChat. Cuéntame, ¿cómo puedo ayudarte hoy?`,
    };
    this.mensajes = [];
    this.mensajes.push(menasjeInicial);
    this.showProgressBar = false;
  }
}
