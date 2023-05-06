export interface AnimeAPI {
  id: string;
  title: string;
  main_picture: {
    large: string;
    medium: string;
  };
  synopsis: string;
  status: string;
}
