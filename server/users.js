let users = [];

const addUser = (user) => {
  const isExistUser = users.find(
    (item) => item.name === user.name && item.room === user.room
  );
  !isExistUser && users.push(user);

  const currentUser = isExistUser || user;
  return { isNewUser: !isExistUser, user: currentUser };
};

const findUser = (params) => {
  const user = users.find(
    (item) => params.name === item.name && params.room === item.room
  );
  return user;
};

const getUsers = (room) => {
  return users.filter((item) => item.room === room);
};

const leaveUser = (params) => {
  const filterUsers = users.filter(
    (item) => item.name !== params.name && item.room === params.room
  );
  return filterUsers;
};

export { addUser, findUser, getUsers, leaveUser };
