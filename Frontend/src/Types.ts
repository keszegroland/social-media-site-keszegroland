import { ChangeEvent } from "react";

export type MethodType = "GET" | "POST" | "DELETE";

export type JWTTokenType = string | null;

export interface MemberIdentity {
  publicId: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface FooterPostProps {
  postPublicId: string;
};

export interface LikeData {
  isPostLiked: boolean;
  usernameOfTheFirstLiker: string;
  numberOfLikes: number;
};

export interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  icon?: JSX.Element;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface MemberAuth {
  username: string;
  password: string;
}

export interface JwtResponse {
  jwt: string;
  username: string;
  roles: Set<string>;
}

export interface NewMember {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export interface LikeButtonProps {
  isLiked: boolean;
  handleLikeAction: () => void;
}

export interface LikeTextProps {
  numberOfLikes: number;
  usernameOfTheFirstLiker: string;
}

export interface Post {
  publicId: string;
  username: string;
  description: string;
  picture: string;
  creationDate: string;
}

export interface PostProps {
  post: Post
}

export interface CustomMenuItemProps {
  fileName: string;
  text: string;
  route: string;
  className?: string;
}