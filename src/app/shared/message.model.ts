export class Message {
  constructor(
    public creator: string,
    public createdOn: number,
    public message: string,
    public comments?: []
  ) {}

  toJSON() {
    return {
      creator: this.creator,
      createdOn: this.createdOn,
      comments: [],
      message: this.message,
    };
  }
}
