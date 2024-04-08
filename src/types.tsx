interface Author {
  name: string;
  photoUrl: string;
}

interface Message {
  author: Author;
  content: string;
  id: string;
  realId?: string;
  updated: string;
}

interface MessagesResponse {
  messages: Message[];
  pageToken?: string;
}