import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActivePlayer from './with-active-player';

Enzyme.configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should change state (activePlayer) when call onPlayButtonClick`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.instance().render().props).toHaveProperty(`renderPlayer`);

  expect(wrapper.state().activePlayer).toEqual(-1);

  wrapper.instance()._onPlayButtonClick(1);
  expect(wrapper.state().activePlayer).toEqual(1);

  wrapper.instance()._onPlayButtonClick(2);
  expect(wrapper.state().activePlayer).toEqual(2);

  wrapper.instance()._onPlayButtonClick(2); // вызываеем onPlayButtonClick повторно с тем же ID -> плеер должен становится
  expect(wrapper.state().activePlayer).toEqual(-1);
});
