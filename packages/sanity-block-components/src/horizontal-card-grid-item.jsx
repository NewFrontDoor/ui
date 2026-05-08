
import styled from '@emotion/styled';


const Wrapper = styled('section')`
  display: grid;
  @media (min-width: 420px) {
    grid-template-columns: 200px 1fr;
    gap: 20px;
  }
`;

const Img = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// A regex to capture all non-absolute urls
const isRelative = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function HorizontalCard({
  title,
  description,
  image,
  link,
  LinkComponent
}) {
  const relative = link && isRelative.test(link);
  return relative ? (
    <Wrapper>
      <LinkComponent url={link}>
        <Img src={image} alt={title} />
      </LinkComponent>
      <LinkComponent url={link}>
        <div>
          <h3 sx={{variant: "styles.h3"}}>{title}</h3>
          {description}
        </div>
      </LinkComponent>
    </Wrapper>
  ) : link ? (
    <Wrapper>
      <a href={link}>
        <Img src={image} alt={title} />
      </a>
      <a href={link}>
        <div>
          <h3 sx={{variant: "styles.h3"}}>{title}</h3>
          {description}
        </div>
      </a>
    </Wrapper>
  ) : (
    <Wrapper>
      <div>
        <Img src={image} alt={title} />
        <h3 sx={{variant: "styles.h3"}}>{title}</h3>
        {description}
      </div>
    </Wrapper>
  );
}

/* HorizontalCard.propTypes = {
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string,
  LinkComponent: PropTypes.element
}; */
