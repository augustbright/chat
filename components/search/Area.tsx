import React from "react";
import { useSelector } from "react-redux";
import { selectExploreResults } from "../../redux/selectors";
import ResultItem from "./ResultItem";
import "./Area.scss";

export default () => {
  const exploreResults = useSelector(selectExploreResults);

  if (exploreResults.length) {
    return (
        <div className="card-columns explore-columns">
          {exploreResults.map(exploreResult => (
            <ResultItem key={exploreResult._id} exploreResult={exploreResult} />
          ))}
        </div>
      );    
  }
  return (
      <div className="d-flex justify-content-center pt-3 text-secondary">
          No rooms are found...
      </div>
  );
};
