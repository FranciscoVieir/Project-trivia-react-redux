const URL = 'https://opentdb.com/api_token.php?command=request';

const fetchApTokens = async () => {
  const request = await fetch(URL);
  const result = await request.json();
  return result;
};

export default fetchApTokens;
