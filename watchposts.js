class Comment {
  constructor(name, text, date){
    this.name = name
    this.text = text
    this.date = date
  }
}

let renderPosts = (data) => {
  $.each(data, function () {
    let postBlock = $("<div>");
    postBlock.addClass(
      "post-block container col-xs-12 col-sm-7 col-md-7 col-lg-7 mx-auto"
    );
    $(".postcolumn").prepend(postBlock);

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

    let commentButton = $('<img>').addClass('comment-button').attr('src', 'img/open.png').attr('width', '47')
    postBlock.append(commentButton)

    let form = $('<form>').addClass('comment-form')
    let legend = $('<legend>').text('Comment:')

    form.append(legend)
    let div = $("<div>");
    div.addClass("mb-3");
    form.append(div)

    let label = $("<label>");
    label.addClass("form-label");
    label.attr("for", "input1");
    label.text("Name:");
    div.append(label);

    let input = $("<input>");
    input.attr({
      type: "name",
      class: "form-control",
      id: "input1",
      required: true
    })
    div.append(input);
    
    let label2 = $("<label>");
    label2.addClass("form-label");
    label2.attr("for", "input2");
    label2.text("Text:");
    div.append(label2);

    let input2 = $("<input>");
    input2.attr({
      type: "text",
      class: "form-control",
      id: "input2",
      required: true
    })
    div.append(input2)

    form.append('<input type="submit" class="btn btn-outline-primary" value="Comment">');

    $(postBlock).append(form);

    let commentBlock = $('<div>').addClass('comment-block col-12')
    postBlock.append(commentBlock)

    let commentBlockButton = $('<div>').addClass('comment-visibility-button')
    form.append(commentBlockButton)

    let commentBlockButtonH1 = $('<h1>').text(`View comments...`)
    commentBlockButton.append(commentBlockButtonH1)
    
    let click = 0
    
    commentBlockButton.on('click', () => {
      commentBlock.css({
        'display': 'flex',
        'flex-direction': 'column'
      })

      commentBlockButtonH1.text(`Hide comments...`)

      click += 1

      if(click == 2){
        click = 0
        commentBlock.css({
          'display': 'none'
        })


  
        commentBlockButtonH1.text(`View comments...`)
      }

    })

    commentButton.on('click', () => {
      if (commentButton.attr("src") === "img/open.png") {
        commentButton.attr("src", "img/close.png");
        form.css({
          'display': 'block'
        })
      } else {
        commentButton.attr("src", "img/open.png");
        form.css({
          'display': 'none'
        })

        commentBlock.css({
          'display': 'none'
        })
      }
    })

    let obj = this
    
    form.on('submit', (e) => {
      e.preventDefault()
      let time = new Date()
      let comment = new Comment(input.val(), input2.val(), time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate())
      obj.comment.push(comment)

      fetch(
        `https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post/${obj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      form[0].reset()
    })

    
    let renderComments = (data) => {
      $.each(data, function() {
        console.log(this.name)
        let commentBody = $('<div>').addClass('comment-body col-xs-12')
        commentBlock.append(commentBody)
        let commentName = $('<p>').text(this.name).addClass('comment-name')
        commentBody.append(commentName)
        let commentText = $('<i>').text(`"${this.text}"`).addClass('comment-text col-12')
        commentBody.append(commentText)
        let commentDate = $('<p>').text(`Created at: ${this.date}`).addClass('comment-date')
        commentBody.append(commentDate)
      })
    }
  
    renderComments(obj.comment)
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
