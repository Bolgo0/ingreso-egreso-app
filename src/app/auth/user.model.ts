

export class User {

  public uid: string;
  public nombre: string;
  public email: string;

  constructor(nombre: string, email: string, uid: string) {
    this.nombre = nombre;
    this.email = email;
    this.uid = uid;
  }

}
