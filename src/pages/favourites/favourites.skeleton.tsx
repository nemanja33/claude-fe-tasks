const items = 3;

const FavouritesSkeleton = () => {
  return (
    <div aria-label="Loading skeleton" aria-busy="true" role="status">
      <span className="skeleton skeleton--w10 skeleton--h10"></span>
      <span className="skeleton skeleton--w20 skeleton--h10"></span>
      <span className="spacer spacer--20"></span>
      {
        [...(Array(items).keys())].map((_, i) => (
          <div className="skeleton__flex" key={i}>
            <div>
              <span className="skeleton skeleton--w45 skeleton--h10"></span>
              <span className="skeleton skeleton--w45 skeleton--h10"></span>
            </div>
            <div>
              <span className="skeleton skeleton--w60 skeleton--h10"></span>
            </div>
          </div>
        ))
      }

    </div>
  )
};

export default FavouritesSkeleton;