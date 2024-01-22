import SearchIcon from "../icons/SearchIcon";
import "./assets/header-search-label.scss";

interface Props{
  readonly onChangeFormType: () => void;
}

export default function HeaderSearchLabel({
  onChangeFormType
}:Props) {
  return (
    <div className="header-search-label" onClick={onChangeFormType}>
      <SearchIcon color="#aba4a4" />
      <span className="header-search-label-title">
        Search for any training you want
      </span>
    </div>
  );
}
