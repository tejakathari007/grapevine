export const getYoutubeVideos = async (access_token) => {
  const response = await fetch(
    "https://youtube.googleapis.com/youtube/v3/search?forMine=true&maxResults=25&type=video&key=AIzaSyDEIKpmLC0ojKhMfCvjcSgdF09U_Q5_icA",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  )
    .then((data) => data.json())
    .catch((err) => {
      throw new Error(err.message);
    });
  return response;
};
