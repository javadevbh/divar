import { useScrollToTop } from "hooks/useScrollToTop";

function PageNotFound() {
  useScrollToTop();
  return (
    <div className="h-[1000px]">
      <img src="404.png" alt="pageNotFound" />
    </div>
  );
}

export default PageNotFound;
