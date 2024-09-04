import styles from "./Callout.module.css";

type Props = {
  image: string;
  imageWidth: string;
  imageHeight: string;
  imageAlt: string;
  pitch: string;
  link: string;
};

export default function Callout({
  image,
  imageWidth,
  imageHeight,
  imageAlt,
  pitch,
  link,
}: Props) {
  return (
    <li className={styles.callout}>
      <a href={link} className="logo image">
        <img
          src={`/img/icons/${image}.svg`}
          width={imageWidth}
          height={imageHeight}
          className={image}
          alt={imageAlt}
        />
        <img
          src="/img/icons/javascripted-logo.svg"
          width="464"
          height="85"
          className="logo"
          alt="Original JavaScripted logo."
        />
        <p>{pitch}</p>
      </a>
    </li>
  );
}
