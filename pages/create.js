import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";
import useSWRMutation from "swr/mutation";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const { status } = await response.json();
  console.log(status);
}

export default function CreatePlacePage() {
  const { trigger } = useSWRMutation("/api/places", sendRequest);

  const router = useRouter();
  const { push } = router;
  console.log(router);

  function addPlace(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const spotData = Object.fromEntries(formData);

    trigger(spotData);
    push("/");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Link href="/" passHref legacyBehavior>
        <StyledBackLink>back</StyledBackLink>
      </Link>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}
