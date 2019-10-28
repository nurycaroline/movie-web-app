import React from 'react';
import renderer from 'react-test-renderer';
import Movie from '.';

test('Movie', () => {
  const component = renderer.create(
    <Movie
      title="John Wick 3 - Parabellum"
      image="/cBO4u9qR1A7kSU299Qr3Ru9lvZ3.jpg"
      overview="Após assassinar o chefe da máfia Santino D'Antonio (Riccardo Scamarcio) no Hotel Continental, John Wick (Keanu Reeves) passa a ser perseguido pelos membros da Alta Cúpula sob a recompensa de U$14 milhões. Agora, ele precisa unir forças com antigos parceiros que o ajudaram no passado enquanto luta por sua sobrevivência."
      genres="Crime,Ação,Thriller"
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
