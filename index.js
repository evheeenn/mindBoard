$('#post').on('submit', function(e) {
  e.preventDefault();
  let time = new Date()
  const newPost = {};
  newPost.name = $('#name').val();
  newPost.text = $('#text').val();
  newPost.createdAt = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()

  this.reset();

  fetch("https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(newPost)
  });
});
