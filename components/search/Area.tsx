import React from "react";
import { useSelector } from "react-redux";
import { selectExploreResults } from "../../redux/selectors";
import ResultItem from "./ResultItem";
import './Area.scss';

export default () => {
  const exploreResults = useSelector(selectExploreResults);
  return (
    <div className="card-columns explore-columns">
      {exploreResults.map(exploreResult => (
        <ResultItem key={exploreResult._id} exploreResult={exploreResult} />
      ))}
    </div>
  );
};
