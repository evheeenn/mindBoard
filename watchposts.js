let renderPosts = (data) => {
  $.each(data, function () {
    let postBlock = $("<div>");
    postBlock.addClass(
      "post-block container col-xs-12 col-sm-7 col-md-7 col-lg-7 mx-auto"
    );
    $(".postcolumn").prepend(postBlock);

    let name = $("<p>");
    postBlock.append(name);
    name.text(this.name);

    let text = $("<i>");
    text.addClass("col-12");
    postBlock.append(text);
    text.text(`"${this.text}"`);

    let date = $("<p>");
    postBlock.append(date);
    date.addClass("date");
    date.text("Created at: " + this.createdAt);

    let likeBlock = $("<div>");
    likeBlock.addClass("like-block");
    likeBlock.css({
      display: "flex",
    });
    postBlock.append(likeBlock);

    let likeCount = $("<p>");
    likeCount.addClass("like");
    likeBlock.append(likeCount);
    likeCount.text(this.like);

    let like = $("<img>");
    like.addClass("like");
    like.attr("src", "img/unliked.svg");
    like.attr("width", "23");
    like.css({
      "margin-left": "7px",
    });
    likeBlock.append(like);

    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

    if (likedPosts.includes(this.id)) {
      like.attr("src", "img/like.svg");
    }

    like.on("click", () => {
      if (like.attr("src") === "img/unliked.svg") {
        like.attr("src", "img/like.svg");
        likedPosts.push(this.id);
        this.like += 1;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      } else {
        like.attr("src", "img/unliked.svg");
        let index = likedPosts.indexOf(this.id);
        if (index > -1) {
          likedPosts.splice(index, 1);
        }
        this.like -= 1;
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      }

      fetch(
        `https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post/${this.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this),
        }
      );
      likeCount.text(this.like);
    });
  });
};

let getData = () => {
  $.ajax({
    method: "GET",
    url: "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post",
    success: function (res) {
      renderPosts(res);
    },
  });
};

getData();
