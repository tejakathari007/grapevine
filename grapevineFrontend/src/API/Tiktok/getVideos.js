export const getVideos = async ({ access_token, open_id }) => {
  const video = await fetch("https://open-api.tiktok.com/video/list/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: access_token,
      open_id: open_id,
      cursor: 0,
      max_count: 10,
      fields: [
        "embed_html",
        "embed_link",
        "like_count",
        "comment_count",
        "share_count",
        "view_count",
        "title",
      ],
    }),
  }).then((data) => data.json());

  const tiktokPost = video?.data?.videos?.map((v) => {
    return {
      embed_link: v.embed_link,
      like_count: v.like_count,
      share_count: v.share_count,
      title: v.title,
      view_count: v.view_count,
    };
  });
  if (tiktokPost) return tiktokPost;
  return [];
};
