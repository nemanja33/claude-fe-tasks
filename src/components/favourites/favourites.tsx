import "./favourites.css";

interface FavouritesTypes {
  clickHandler: () => void
}

const Favourites = ({
  clickHandler
}: FavouritesTypes) => {


  return (
    <div className="favourites">
      <span>Add to favourites</span>
      <button
        className="favourites__button" type="button"
        aria-label="click"
        onClick={clickHandler}
      ></button>
    </div>
  )
};

export { Favourites }
