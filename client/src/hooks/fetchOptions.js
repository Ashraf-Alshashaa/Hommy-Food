export const postOnAuthEndpoint = (body, method) => {
  return {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  };
};
