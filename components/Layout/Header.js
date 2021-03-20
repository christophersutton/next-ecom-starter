import Link from "next/link";
import { useUI } from '../UI'
import { ShoppingCart } from '../UI/Icons'

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {

  const { openSidebar } = useUI();

  return (
    <nav className="">
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a>Embry</a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <Link href={href}>
                <a className="no-underline">{label}</a>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-right space-x-4">
          <li>
            <button onClick={()=> openSidebar()}><ShoppingCart className={"w-6 h-6"}/></button>
          </li>
        </ul>
      </ul>
    </nav>
  );
};
export default Header;
