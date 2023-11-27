export interface YouTubeVideo {
  id: string;
  url: string;
  shorts_url: string;
  title: string;
  description: string | null;
  duration: number;
  duration_formatted: string;
  uploadedAt: string;
  unlisted: boolean;
  nsfw: boolean;
  thumbnail: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
  channel: {
    name: string;
    id: string;
    icon: string;
  };
  views: number;
  type: string;
  tags: string[];
  ratings: {
    likes: number;
    dislikes: number;
  };
  shorts: boolean;
  live: boolean;
  private: boolean;
}
