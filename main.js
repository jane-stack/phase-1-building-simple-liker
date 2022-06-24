// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorModal = document.querySelector("#modal")

document.addEventListener("DOMContentLoaded", () => {
  console.log("The DOM has loaded")
  errorModal.classList.add("hidden")

  clickListener()
})

function hideError() {
  errorModal.classList.add("hidden")
}
function findLikes() {
  const likeArr = document.querySelector(".like-glyph")
  likeArr.forEach((singularLike) => {
    singularLike.addEventListener("click", () => console.log("YOU FOUND ME! LIKE!"))
  })
}

function clickListener() {
  document.addEventListener("click", (e) => {
    if (e.target.classList[0] === "like-glyph") {
      mimicServerCall()
      .then(resp => {
        const activated = e.target.classList.contains("activated-heart")
        if (activated) {
          e.target.classList.remove("activated-heart")
          e.target.innerHTML = EMPTY_HEART
        } else {
          e.target.classList.add("activated-heart")
          e.target.innerHTML = FULL_HEART
        }
        // activated 
        // ? e.target.classList.remove("activated-heart") 
        // : e.target.classList.add("activated-heart")
      })
      .catch(error => {
        console.log(error);
        errorModal.remove("hidden");
        setTimeout(() => {
          hideError()
        }, 3000)
      })
    }
  })
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
