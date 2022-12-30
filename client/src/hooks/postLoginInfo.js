const postLoginInfo = async (url, loginInfo) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  return response.json();
};

export default postLoginInfo;
