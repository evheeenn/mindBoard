$('#post').on('submit', function(e) {
  e.preventDefault();

  const newPost = {};
  newPost.name = $('#name').val();
  newPost.text = $('#text').val();
  newPost.createdAt = new Date()

  this.reset();

  fetch("https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newPost)
  });
});

