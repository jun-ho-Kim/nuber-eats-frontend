import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import { VerifyEmail, VerifyEmailVariables } from "../../__generated__/VerifyEmail";

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($input: VerifyEmailInput) {
    VerifyEmail(input: $input) {
        error
        ok
    }
  }
`;

export const ConfirmEmail = () => {
  const {data: userData} = useMe();
  const client = useApolloClient();
  const onCompleted = (data:VerifyEmail) => {
    const {
      VerifyEmail: {ok}
    } = data;
    if(ok && userData?.me.id) {
      client.writeFragment({
        id: `User:${userData.me.id}`,
        fragment: gql`
          fragment VerifiyUser on User {
            verified
          }
        `,
        data: {
          verified: true
        },
      });
    }
  };
  const [VerifyEmail, {loading: verifyEmail}] = useMutation<
  VerifyEmail,
  VerifyEmailVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted
  });
  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    VerifyEmail({
      variables: {
          input: {
              code,
          },
      },
    });
  },[]);
  return (
      <div className="mt-52 flex flex-col items-center justify-center">
        <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
        <h4 className="text-gray-700 text-sm">Please wait, don`t close this page..</h4>
      </div>
  )
}
