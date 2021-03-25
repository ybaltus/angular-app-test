export class PostModel {
  private id: number;

  constructor(
    public title: string,
    public content: string
  ) {
  }

  getId(){
    return this.id;
  }

  setId(id: number){
    this.id = id;
  }
}
