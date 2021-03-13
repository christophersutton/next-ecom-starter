import Header from "./Header";
import Footer from "./Footer";
import { Sidebar, SidebarHeader } from "../Sidebar/Sidebar";
import CartView from "../../components/Cart/Cart";
import { useUI } from "../context.tsx";

const Layout = (props) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();

  let title = ''
  switch (sidebarView) {
    case 'CART': {
      title = 'Squeaky Cart'
    }

  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{props.children}</div>
      <Footer />

      <Sidebar isOpen={displaySidebar}>
        <SidebarHeader title={title}/>
        {sidebarView === "CART" && <CartView />}
      </Sidebar>
    </>
  );
};

export default Layout;
