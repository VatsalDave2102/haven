interface Props {
  px: string;
}

const Logo = ({ px }: Props) => {
  return <div className={`${px}`}>Logo</div>;
};

export default Logo;
