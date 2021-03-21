import { Header, Footer } from "./index";
import { useUI, Sidebar } from "../UI";
import CartView from '../Cart/Cart'

interface Props {
  children: any
}

const Layout = (props) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{props.children}</div>
      <Footer />

      <Sidebar isOpen={displaySidebar} closeSidebar={closeSidebar} sidebarView={sidebarView}>
        {sidebarView === "CART" && <CartView />}
      </Sidebar>
    </>
  );
};

export default Layout;
