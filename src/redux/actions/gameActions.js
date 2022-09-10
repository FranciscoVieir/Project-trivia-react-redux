import { REQUEST_QUESTIONS, SAVED_QUESTIONS } from '.';
import { getApiQuestions } from '../../services';

const requestApiQuestions = () => ({ type: REQUEST_QUESTIONS });
const savedApiQuestions = (response) => ({ type: SAVED_QUESTIONS, payload: response });
// const failedApiQuestions = (error) => ({ type: FAILED_QUESTIONS, payload: error });

export default function fetchApiQuestions(tokens, history) {
  return async (dispatch) => {
    const ERROR_CODE = 3;
    dispatch(requestApiQuestions());
    const { response_code: responseCode, results } = await getApiQuestions(tokens);
    if (responseCode === 0) {
      dispatch(savedApiQuestions(results));
    } else if (responseCode === ERROR_CODE) {
      history.push('/');
    }
  };
}
