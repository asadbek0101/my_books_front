import SearchIcon from "../icons/SearchIcon";
import XIcon from "../icons/_XIcon";
import "./assets/header-search-form.scss";

interface Props {
  readonly onChangeFormType: () => void;
}

export default function HeaderSearchForm({ onChangeFormType }: Props) {
  return (
    <div className="header-search-form">
      <SearchIcon color="rgb(114, 109, 109)" />
      <input
        className="search-input"
        placeholder="Raspberry"
        onChange={(event) => console.log(event.target.value)}
      />
      <button className="x-button" onClick={onChangeFormType}>
        <XIcon color="rgb(114, 109, 109)" size={14} />
      </button>
    </div>
  );
}
