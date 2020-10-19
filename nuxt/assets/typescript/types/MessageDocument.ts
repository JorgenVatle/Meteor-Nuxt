export interface MessageDocument {
  user: {
    name: string;
    picture: {
      thumbnail: string;
    }
  }
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
