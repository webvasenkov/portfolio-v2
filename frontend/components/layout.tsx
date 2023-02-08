import Header from './header';
import NavigationLink from './navigationLink';

type Props = {
  children: JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <NavigationLink />
    </>
  );
}

export default Layout;
