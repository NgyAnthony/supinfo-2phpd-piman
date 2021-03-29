export interface Friend {
  id: number;
  name: string;
  email: string;
  email_verified_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface FriendRecord {
  id: number;
  friend: Friend;
}

export interface FriendWithPermissions {
  id: number;
  friend: Friend;
  read: boolean;
  write: boolean;
}
