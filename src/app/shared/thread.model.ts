export class Thread {
  constructor(
    public creator: string,
    public createdOn: number,
    public message: string
  ) {}

  toJSON() {
    return {
      creator: this.creator,
      createdOn: this.createdOn,
      message: this.message,
    };
  }
}
