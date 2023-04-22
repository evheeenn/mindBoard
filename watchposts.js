let renderPosts = (data) => {
    $.each(data, function () {  
        let time = new Date()
        let postBlock = $('<div>');
        postBlock.addClass('post-block container col-9 mx-auto');
        $('.postcolumn').prepend(postBlock);

        let name = $('<p>');
        postBlock.append(name);
        name.text(this.name);

        let text = $('<i>');
        text.addClass('col-12');
        postBlock.append(text);
        text.text(`"${this.text}"`);

        let date = $('<p>');
        postBlock.append(date);
        date.addClass('date')
        date.text('Created at: ' + time);
    });
};

let getData = () => {
    $.ajax({
        method: "GET",
        url: "https://6442d57333997d3ef91aa550.mockapi.io/api/mindboard/post",
        success: function (res) {
            renderPosts(res);
        }
    });
};

getData();
