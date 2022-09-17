import Text from '../../text';

type Props = {
  command: string;
};

function NotFound({ command }: Props) {
  return <Text text={`command not found: ${command}`} />;
}

export default NotFound;
