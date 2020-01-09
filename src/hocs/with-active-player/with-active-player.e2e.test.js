import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActivePlayer from './with-active-player';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);


it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().activePlayer).toEqual(-1);

  wrapper.props().onPlayButtonClick(1);
  expect(wrapper.props().activePlayer).toEqual(1);

  wrapper.props().onPlayButtonClick(2);
  expect(wrapper.props().activePlayer).toEqual(2);

  wrapper.props().onPlayButtonClick(2); // вызываеем onPlayButtonClick повторно с тем же ID -> плеер должен становится
  expect(wrapper.props().activePlayer).toEqual(-1);
});
