export interface UserInitiator {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface UserTarget {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface SentFriendRequestInterface {
  id: number;
  user_initiator: UserInitiator;
  user_target: UserTarget;
}
