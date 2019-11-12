import React from "react";
import Page from "../components/layout/Page";
import NewForm from "../components/new/form";
import { redirectUnauthenticated, isomorphicEndpoint } from "../lib/isomorphic";
import { initSessionInfo, initInfoOnMe } from "../lib/store_initializers";
import { INextPageContextWithSaga } from "../redux/store";
import fetch from 'isomorphic-fetch';
import {useRouter} from 'next/router';

const NewRoom = () => {
  const router = useRouter();

  const onSubmit = async ({name, password}) => {
    await fetch(isomorphicEndpoint('/room'), {
      method: "PUT",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, password})
    });
    router.push('/');
  };

  return (
    <Page>
      <div className="row justify-content-center pt-5">
        <div className="col-12 col-md-6">
          <NewForm onSubmit={onSubmit}/>
        </div>
      </div>
    </Page>
  );
};

NewRoom.getInitialProps = async (context: INextPageContextWithSaga) => {
  await initSessionInfo(context);
  if (redirectUnauthenticated(context, "/welcome")) {
    return {};
  }
  await initInfoOnMe(context);
};

export default NewRoom;
