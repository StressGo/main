import renderer from 'react-test-renderer';
import Chat from '../components/Chat'

it('renders correctly', () => {
  const tree = renderer
    .create(<Chat title = "yo" subtitle ="haha" image = "https://placeimg.com/140/140/any" onPress = {() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});