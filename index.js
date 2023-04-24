class Post {
  constructor(name, text, like) {
    this.name = name;
    this.text = text;
    this.like = like;
    this.comment = []
  }
}

$("#post").on("submit", function (e) {
  e.preventDefault();
  let time = new Date();
  const newPost = new Post($("#name").val(), $("#text").val(), 0);
  newPost.createdAt =
    time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();

  this.reset();

  fetch("https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newPost),
  });
});
