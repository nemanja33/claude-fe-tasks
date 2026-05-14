const LoginSkeleton = () => {
  return (
    <div className='wrap'>
      <div aria-label="Loading skeleton">
        <div className="skeleton__flex">
          <div>
            <span className="skeleton skeleton--w60 skeleton--h10"></span>
          </div>
          <div>
            <span className="skeleton skeleton--w60 skeleton--h10"></span>
          </div>
        </div>
        <span className="spacer spacer--20"></span>
        <span className="skeleton skeleton--w10 skeleton--h10"></span>
        <span className="skeleton skeleton--w20 skeleton--h10"></span>
        <span className="skeleton skeleton--w20 skeleton--h10"></span>
        <span className="skeleton skeleton--w10 skeleton--h10"></span>
      </div>
    </div>
  )
};

export default LoginSkeleton;