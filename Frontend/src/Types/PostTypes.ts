import { MemberIdentity } from "./MemberTypes";

export type MethodType = "POST" | "DELETE";

export type JWTTokenType = string | null;

export type EndpointType = `/api/likes/${string}` | `/api/savedPosts/${string}`;

type ActiveImgPathType = "/liked.svg" | "/saved.svg";
type ActiveImgTextType = "liked" | "saved";
type UnActicePathType = "/like.svg" | "/save.svg";
type UnActiveImgTextType = "like" | "save";

export interface FooterPostProps {
  postPublicId: string;
};

export interface LikeData {
  isPostLiked: boolean;
  usernameOfTheFirstLiker: string;
  numberOfLikes: number;
};

export interface ReactionButtonProps {
  status: boolean;
  handleAction: () => void;
  activeImgPath: ActiveImgPathType;
  activeImgText: ActiveImgTextType;
  unActiveImgPath: UnActicePathType;
  unActiveImgText: UnActiveImgTextType;
}

export interface LikeTextProps {
  numberOfLikes: number;
  usernameOfTheFirstLiker: string;
}

export interface NewPost {
  description: string;
  pictures: Picture[];
  tags: string;
}

export interface Picture {
  picturePublicId?: string;
  picture: string;
}

export interface Post {
  postPublicId: string;
  username: string;
  description: string;
  pictures: Picture[];
  tags: string;
  creationDate: Date;
  memberFirstName: string;
  memberLastName: string;
  memberImageColor: string;
}

export interface PostProps {
  post: Post
}

export interface CustomMenuItemProps {
  fileName: string;
  text: string;
  route: string;
  className?: string;
  onSignOutClick?: () => void;
}

export interface PageHeaderProps {
  headerName: string;
}

export interface TokenIdentifier {
  token: JWTTokenType;
}

export interface PostIdentifier {
  postPublicId: string;
}

export interface SavedPost extends PostIdentifier {
  pictures: Picture[];
}

export interface SavedPostProps {
  savedPost: SavedPost;
}

export interface Comment {
  commentPublicId: string;
  comment: string;
  creationDate: Date;
  member: MemberIdentity;
}

export interface CommentProps extends PostIdentifier {
  onNewCommentCreation: (isNewCommentAdded: boolean) => void;
}

export interface CommentSectionProps extends PostIdentifier {
  isNewCommentAdded: boolean;
  onCommentsFetched: () => void;
}

export interface DetailedSavedPostProps {
  savedPost: Post | null;
}

export interface OpenSavedPostProps extends PostIdentifier {
  onClose: () => void;
}

export interface FileUploaderProps {
  onUpload: (pictureObjList: File[]) => void;
}

export interface PictureCarouselProps {
  pictureList: File[];
}

export interface CarouselControlProps {
  onPrevious: () => void;
  onNext: () => void;
}

export interface CarouselProps {
  pictures: Picture[];
  divClassName: string;
  imgClassName: string;
}