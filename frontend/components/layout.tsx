import Header from './header';
import MailButton from './mailButton';

type Props = {
  children: JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <MailButton />
    </>
  );
}

export default Layout;
