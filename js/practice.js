window.addEventListener('DOMContentLoaded', () => {

    // *Page Loaded*
    const mainTitle = document.querySelector('.main-title');
    mainTitle.textContent = 'Script file loaded successfully!';
    mainTitle.classList.toggle('_title-loaded');
    const cardItems = document.createElement('div');
    cardItems.className = 'card-items';
    cardItems.classList.add('page-block');
    const body = document.querySelector('body');
    body.appendChild(cardItems);

    // Button`s Onclick
    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            setTimeout(() => {
                button.blur();
            }, 250); 
        })
    })
    

    // Input`s Protection against Entering Invalid Values
    const inputs = document.querySelectorAll('.protect1');

    inputs.forEach(input => {
        input.addEventListener('focusout', function (e) {
            let value = Number(input.value);
            if (value < 0) {
                input.value = 0;
            } else {
                if (value > 10) {
                    input.value = 10;
                }
            }
        });
    })

    const input = document.querySelector('.protect2');

    input.addEventListener('focusout', function (e) {
        let value = Number(input.value);
        if (value < 0) {
            input.value = 0;
        }
    })

    // POST and GET requests with Fetch

    // POST 
    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    const postBtn = document.querySelector('.send-post');

    postBtn.addEventListener('click', (e) => {
        let post = createPost();
        if (typeof(createPost()) == "object") {
            postData('https://jsonplaceholder.typicode.com/posts', post)
                .then((data) => {
                    templateCard(data);
                });
            showBlock([block, cardItems]);
        } else {
            alert(createPost());
        }
    });

    // Create Post Function
    function createPost() {
        const sendPostId = document.querySelector('#sendPostId');
        let id = Number(sendPostId.value);
        if (!id) {
            return 'Error: Entered UserId Value is Null';
        }

        const sendPostTitle = document.querySelector('#sendPostTitle');
        let title = sendPostTitle.value;
        const sendPostBody = document.querySelector('#sendPostBody');
        let body = sendPostBody.value;
        if (!title && !body) {
            let newPost = {
                "userId":id,
                "id":"",
                "title":"None",
                "body":"None"
            };

            return newPost;
        } else {
            if (!title) {
                let newPost = {
                    "userId":id,
                    "id":"",
                    "title":"None",
                    "body":body
                };

                return newPost;
            } else {
                if (!body) {
                    let newPost = {
                        "userId":id,
                        "id":"",
                        "title":title,
                        "body":"None"
                    };

                    return newPost;
                }
            }
        }
        let newPost = {
            "userId":id,
            "id":"",
            "title":title,
            "body":body
        };

        return newPost;
    };

    // GET
    async function getData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    const getBtn = document.querySelector('.get-post');

    getBtn.addEventListener('click', (e) => {
        const getPostFrom = document.querySelector('#getPostFrom');
        let from = Number(getPostFrom.value);
        const getPostTo = document.querySelector('#getPostTo');
        let to = Number(getPostTo.value);
        getPostFrom.value = '';
        getPostTo.value = '';
        if (from > 0 && to > 0) {
            if (from > to) {
                alert('Get-Request Error: the Final Num can not be Less Initial Num');
            } else {
                getData('https://jsonplaceholder.typicode.com/posts')
                    .then((data) => {
                        data.forEach(post => {
                            if (post.userId >= from && post.userId <= to) {
                                templateCard(post);
                            }
                        });
                    });
                showBlock([block, cardItems]);
            }
        } else {
            alert('Get-Request Error: Range Values can not be Null (start with 1)');
        }
    });

    // Template Cards Function
    function templateCard(post) {
        const cardItem = document.createElement('div');
        cardItem.className = 'card-item';
        
        const cardItemId = document.createElement('div');
        cardItemId.className = 'card-item__id-block';
        cardItemId.textContent = `UserId: ${post.userId}`;
        // const svgId = document.createElement('svg');
        // svgId.className = 'card-item__svgId';
        // svgId.id = 'svgId';
        // svgId.setAttribute('viewBox', '0 0 41 41');
        // svgId.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        // svgId.textContent = 'Your browser does not support svg element';
        // const use = document.createElement('use');
        // use.setAttribute('xlink:href', 'img/icons.svg#circle');
        // svgId.appendChild(use);
        const cardItemTitle = document.createElement('div');
        cardItemTitle.className = 'card-item__title-block';
        const title = document.createElement('h3');
        title.className = 'card-item__title';
        title.textContent = post.title;
        cardItemTitle.appendChild(title);
        const cardItemBody = document.createElement('div');
        cardItemBody.className = 'card-item__body-block';
        const text = document.createElement('p');
        text.className = 'card-item__body';
        text.setAttribute('lang', 'eu');
        text.textContent = post.body;
        cardItemBody.appendChild(text);
        
        // cardItemId.appendChild(svgId);
        cardItem.appendChild(cardItemId);
        cardItem.appendChild(cardItemTitle);
        cardItem.appendChild(cardItemBody);
        cardItems.appendChild(cardItem);
        
        return;
    }

    // Delete Card Items Function
    const block = document.createElement('div');
    block.className = 'page-block';
    block.classList.add('buttons-block');

    const delButton = document.createElement('button');
    delButton.className = 'buttons-block__button';
    delButton.classList.add('button');
    delButton.textContent = 'Delete Cards List';
    delButton.addEventListener('click', (e) => {
        deleteCards();
    })

    block.appendChild(delButton);
    body.insertBefore(block, cardItems);

    hideBlock([block, cardItems]);

    function deleteCards() {
        cardItems.textContent = '';
        hideBlock([block, cardItems]);

        return;
    };

    // Toggle Blocks Functions (can take 1 arg)
    function showBlock(divs) {
        if (divs.constructor === Array) {
            divs.forEach(div => {
                div.classList.remove('_hidden');
            })
        } else {
            divs.classList.remove('_hidden');
        }
    };

    function hideBlock(divs) {
        if (divs.constructor === Array) {
            divs.forEach(div => {
                div.classList.add('_hidden');
            })
        } else {
            divs.classList.add('_hidden');
        }
    };
});
