import Header from './header';

type Props = {
  children: JSX.Element;
};
function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
