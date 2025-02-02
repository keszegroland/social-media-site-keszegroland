import { ChangeEvent } from "react";
import { PostIdentifier } from "./PostTypes";

export interface MemberBaseInfo {
  firstName: string;
  lastName: string;
}

export interface MemberIdentity extends MemberImageProps {
  memberPublicId: string;
  username: string;
}

export interface NewMember extends MemberBaseInfo, MemberAuth {
  email: string;
}

export interface OneMemberProps {
  member: MemberIdentity;
}

export interface MemberImageProps extends MemberBaseInfo {
  imageColor: string;
}

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

/* export interface CommentDetails extends MemberData{
  comment: string;
} */

export interface MemberData {
  badgeColor: string;
  firstLetter: string;
  lastLetter: string;
  username: string;
  creationDate: Date;
  comment?: string;
}

export interface MemberDataProps {
  memberData: MemberData;
}

export interface ModalRightSideProps extends PostIdentifier, MemberDataProps {
  isNewCommentAdded: boolean;
  onNewCommentCreation: (isNewCommentAdded: boolean) => void;
}