

export class User {

  public uid: string;
  public nombre: string;
  public email: string;

  constructor( obj: DataObj ) {
    if ( obj ) {
      this.nombre = obj.nombre;
      this.email = obj.email;
      this.uid = obj.uid;
    } else {
      this.nombre = null;
      this.email = null;
      this.uid = null;
    }
  }

}

interface DataObj {
  nombre: string;
  email: string;
  uid: string;
}
