interface Author {
  name: string;
  photoUrl: string;
}

interface Message {
  id: string;
  author: Author;
  updated: string;
  content: string;
}

interface MessagesResponse {
  messages: Message[];
  pageToken?: string;
}