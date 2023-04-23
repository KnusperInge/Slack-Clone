export class Channelmodel {
  constructor(
    public ID: string,
    public name: string,
    public users: [],
    public creationDate: number,
    public creator: string,
    public messages: []
  ) {}
}
