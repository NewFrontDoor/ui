
import format from 'date-fns/format';

const Sidebar = ({
  title,
  author,
  _createdAt,
  dateFormat = 'EEEE, MMMM do yyyy',
  readingLength,
  categories,
  Link,
  overrides = {}
}) => {
  return (
    <aside
      sx={{
        flex: '1 0 auto',
        height: ['150px' || '300px'],
        overflow: 'hidden',
        width: '250px',
        padding: '20px',
        position: 'sticky',
        top: ['40px' || '110px'],
        background: 'inherit',
        marginRight: '30px',
        ...overrides
      }}
    >
      <h2 sx={{variant: "styles.h2"}}>{title}</h2>
      <div>
        {author && (
          <Link link={author._id} data={author}>
            <p>{author.name}</p>
          </Link>
        )}
        <p>{format(new Date(_createdAt), dateFormat)}</p>
        <p>{readingLength.text}</p>
        <span sx={{display: ['none', 'block']}}>
          <ul>
            {categories.map((category) => (
              <li key={category.title + _createdAt}>
                <Link link={category._id} data={category}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </span>
      </div>
    </aside>
  );
};

/* Sidebar.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.object.isRequired,
  _createdAt: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string
    })
  ).isRequired,
  Link: PropTypes.func.isRequired,
  overrides: PropTypes.object,
  readingLength: PropTypes.object
};

Sidebar.defaultProps = {
  overrides: {},
  dateFormat: 'EEEE, MMMM do yyyy'
}; */

export default Sidebar;
