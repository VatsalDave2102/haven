interface Props {
  width: string;
}

const Logo: React.FC<Props> = ({ width }) => {
  return <div className={`${width}`}>Logo</div>;
};

export default Logo;
