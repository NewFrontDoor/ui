


const RenderSeriesComponent = ({id, title, image, link}) => {
  return (
    <div key={id}>
      <img src={image} alt="Sermon Art" />
      <p sx={{variant: "styles.p"}}>
        <a dangerouslySetInnerHTML={{__html: title}} href={link}  sx={{variant: "styles.a"}} />
      </p>
    </div>
  );
};

/* RenderSeriesComponent.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}; */

export default RenderSeriesComponent;
