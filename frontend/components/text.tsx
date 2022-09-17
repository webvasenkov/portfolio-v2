import { Attributes } from 'react';

type Props = {
  text: string;
  rest?: Attributes;
};

function Text({ text, ...rest }: Props) {
  return (
    <>
      {text.split('\n').map((str: string) => (
        <p className='whitespace-pre-wrap' key={str} {...rest}>
          {str}
        </p>
      ))}
    </>
  );
}

export default Text;
