import React, { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectExploreQuery,
  selectExploreNear,
  selectExplorePasswords
} from "../../redux/selectors";
import {
  setExploreQuery,
  setExploreNear,
  setExplorePasswords
} from "../../redux/reducer/explore";

const SearchTerms = () => {
  const dispatch = useDispatch();

  const exploreQuery = useSelector(selectExploreQuery);
  const onQueryChange = (event: FormEvent<HTMLInputElement>) => {
    dispatch(setExploreQuery(event.currentTarget.value));
  };

  const exploreNear = useSelector(selectExploreNear);
  const onChangeExploreNear = (event: FormEvent<HTMLInputElement>) => {
    dispatch(setExploreNear(event.currentTarget.checked));
  };

  const explorePasswords = useSelector(selectExplorePasswords);
  const onChangeExplorePasswords = (event: FormEvent<HTMLInputElement>) => {
    dispatch(setExplorePasswords(event.currentTarget.checked));
  };

  return (
    <>
      <div className="form-group">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={exploreQuery}
          onChange={onQueryChange}
        />
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="roomNearYou"
          checked={exploreNear}
          onChange={onChangeExploreNear}
        />
        <label className="form-check-label" htmlFor="roomNearYou">
          Near you
        </label>
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="roomUsePassword"
          checked={explorePasswords}
          onChange={onChangeExplorePasswords}
        />
        <label className="form-check-label" htmlFor="roomUsePassword">
          With passwords
        </label>
      </div>
    </>
  );
};

export default SearchTerms;
