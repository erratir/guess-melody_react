/* 02:06 reduser.js*/
const initialState = {
  step: -1,
  mistakes: 0,
};

/**
 * Check user answers
 */
const BusinessLogic = {
  isArtistAnswerCorrect: (question, userAnswer) => {
    return userAnswer.artist === question.song.artist;
  },
  isGenreAnswerCorrect: (question, userAnswer) => {
    return userAnswer.every((it, i) => it === (
      question.answers[i].genre === question.genre
    ));
  }
};

const ActionCreator = {

  'INCREMENT_STEP': () => {
    return {
      type: `INCREMENT_STEP`,
      payload: 1,
    };
  },

  'INCREMENT_MISTAKES': (question, userAnswer, mistakes, maxMistakes) => {
    let isAnswerCorrect = false;

    switch (question.type) {
      case `genre`:
        isAnswerCorrect = BusinessLogic.isGenreAnswerCorrect(question, userAnswer);
        break;
      case `artist`:
        isAnswerCorrect = BusinessLogic.isArtistAnswerCorrect(question, userAnswer);
        break;
    }

    /* если текущий ответ не корректный и текущее кол-во ошибок+1 >= макс. кол-ву ошибок */
    if (!isAnswerCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET_GAME`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: isAnswerCorrect ? 0 : 1,
    };
  }

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case `INCREMENT_MISTAKES`: return Object.assign({}, state, {
      mistakes: state.mistakes + action.payload
    });

    case `RESET_GAME`:
      return initialState;
  }

  return state;
};

export {reducer, ActionCreator};
