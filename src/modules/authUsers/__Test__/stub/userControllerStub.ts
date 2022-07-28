export const data = () => {
  return {
    statusCode: 200,
    success: true,
    message: 'Google Callback return result',
    data: {
      _id: '123',
      name: 'Aman',
      email: 'test@gmail.com',
      token: '1234567hjwebdcfwev890',
      createdAt: '123',
    },
  };
};

export const returnUser = () => {
  return {
    originalId: '123',
    name: 'Aman Verma',
    email: 'aman.verma1@successive.tech',
    token: 'eyJhbG2NTYiLCJwcm92aWRlciI6Imdvb2eEQ',
    createdAt: '2022-07-07T04:37:32.295Z',
  };
};
