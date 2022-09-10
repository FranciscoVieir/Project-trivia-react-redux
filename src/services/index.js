const URL = 'https://opentdb.com/api_token.php?command=request';

export const fetchApTokens = async () => {
  const request = await fetch(URL);
  const result = await request.json();
  return result;
};

export const getApiQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await request.json();
  return result;
};
