import React from "react";
import Page from "../components/layout/Page";
import Double from "../components/layout/Double";
import SearchTerms from "../components/search/Terms";
import SearchArea from "../components/search/Area";
import { redirectUnauthenticated, parseQueryFromURL } from "../lib/isomorphic";
import {
  initSessionInfo,
  initInfoOnMe,
  initExplore
} from "../lib/store_initializers";
import { INextPageContextWithSaga } from "../redux/store";
import {
  setExploreNear,
  setExplorePasswords,
  setExploreQuery
} from "../redux/reducer/explore";
import Router from "next/router";

const Search = () => {
  return (
    <Page>
      <Double leftContent={<SearchTerms />} rightContent={<SearchArea />} />
    </Page>
  );
};

Search.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);
  if (redirectUnauthenticated(context, "/welcome")) {
    return {};
  }
  
  await Promise.all([initInfoOnMe(context), initExplore(context)]);
  return {};
};

export default Search;
