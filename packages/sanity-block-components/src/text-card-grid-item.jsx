


export default function TextCard({title, description}) {
  return (
    <div>
      <h3 sx={{variant: "styles.h3"}}>{title}</h3>
      {description}
    </div>
  );
}

/* TextCard.propTypes = {
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
}; */
