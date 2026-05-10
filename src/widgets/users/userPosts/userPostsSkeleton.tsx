const items = 3;

const UserPostsSkeleton = () => {
  return (
    <div aria-label="Loading skeleton">
      {
        [...(Array(items).keys())].map((_, i) => (
          <div className="skeleton__flex" key={i}>
            <div>
              <span className="skeleton skeleton--w45 skeleton--h10"></span>
            </div>
          </div>
        ))
      }

    </div>
  )
};

export default UserPostsSkeleton;