

const PersonModal = ({name, image, body, email = '', phone = ''}) => (
  <div>
    <h2>{name}</h2>
    <img src={image} />
    <p>{body}</p>
    <h3>Contact</h3>
    <p>{email}</p>
    <p>{phone}</p>
  </div>
);

/* PersonModal.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string,
  phone: PropTypes.string
};

PersonModal.defaultProps = {
  email: '',
  phone: ''
}; */

export default PersonModal;
