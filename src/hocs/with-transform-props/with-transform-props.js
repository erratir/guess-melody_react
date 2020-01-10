import React from 'react';

/**
 * Transform old props to the new
 * Это "промежуточный" HOC, нужен для того, чтобы HOC with-active-player остался абстрактным
 * и просто рендерел плеер какому-то компоненту и в то же время компонент GenreGameScreen (или др) остался абстрактным
 * и не знал, что в него рендарят именно плеер, а рендерил бы например ответы...
 * ---------------------------------------
 * Принимает на вход функцию (которая занимается трансформацией одних пропсов в другие), и возвращает обычный HOC,
 * который в свою очередь принимает на вход компонент и возвращает его с новыми пропсами.
 * @param {Function} transformFunc
 * @return {function(*): function(*=): *}
 */
const withTransformProps = (transformFunc) => (Component) => {
  const WithTransformProps = (props) => {
    const newProps = transformFunc(props);
    return <Component {...newProps} />;
  };

  return WithTransformProps;
};

export default withTransformProps;
