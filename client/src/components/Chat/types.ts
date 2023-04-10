export type TData = {
  data: {
    user: {
      name: string;
    };
    message: string;
  };
};

export type TJoinRoom = {
  data: {
    room: string;
    users: TUser[];
  };
};

export type TUser = {
  isNewUser: boolean;
  user: {
    name: string;
    room: string;
  };
};
