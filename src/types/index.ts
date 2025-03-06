export interface AccountError {
  tags?: string;
  login?: string;
  password?: string;
}

export interface TagItem {
  text: string;
}

export interface Account {
  tags: string;
  type: "Локальная" | "LDAP";
  login: string;
  password: string | null;
  errors: AccountError;
  showPassword?: boolean;
  formattedTags?: TagItem[];
}
