// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

let userButtons = document.querySelectorAll('.u-link'),
    lightbox = document.querySelector('.lightbox');

    

    function parseUserData(person) { // person is the database result
        let targetDiv = document.querySelector('.lb-content'),
        targetImg = lightbox.querySelector('img');

        let bioContent = `
            <p>${person.descript}</p>
            <p>${person.Price}</p>
            <p>${person.Link}</p>
        `;

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.imgsrc;

        lightbox.classList.add('show-lb');
    }


    function getUserData(event) {
        event.preventDefault();
        //debugger;
        //find the image closest to the anchor tag and get its src property
        let imgSrc = this.previousElementSibling.getAttribute('src');
        let url = `/users/${this.getAttribute('href')}`; // /1

        fetch(url) // go get the data
            .then(res => res.json()) // parse the json results into a plain object
            .then(data => {
                console.log("my data result is: ", data)

                data[0].imgsrc = imgSrc;  

                parseUserData(data[0]);
            })

            .catch((err) => {
                console.log(err)
            });
    }


    userButtons.forEach(button => button.addEventListener('click', getUserData));
    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.classList.remove('show-lb');
    });

})();