import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Clicks on startButton (.welcome__button) works correctly`, () => {
  const btnClickHandler = jest.fn();
  const wrapper = shallow(<WelcomeScreen
    maxMistakes={0}
    maxTime={0}
    onClick={btnClickHandler}
  />);

  const startButton = wrapper.find(`.welcome__button`);
  expect(startButton).toHaveLength(1);

  startButton.simulate(`click`);
  expect(btnClickHandler).toBeCalledTimes(1); // это jest
});
