
import Link from './link';

/** Navlink **/
// Basically just highlights on route and has a 'nav' variant prop
const Navlink = ({as, href, active, children}) => {
  return (
    <li sx={{variant: "styles.li"}}>
      <Link as={as} href={href} variant="nav" color={active ? 'active' : ''}>
        {children}
      </Link>
    </li>
  );
};

/* Navlink.propTypes = {
  as: PropTypes.string,
  active: PropTypes.bool,
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}; */

Navlink.defaulProps = {
  as: undefined,
  active: false
};

export default Navlink;
