// define variables
let images = [];
let captions = [];
let descriptions = [];

// assign values
images.push("assets/1.jpg");
images.push("assets/2.jpg");
images.push("assets/3.jpg");
images.push("assets/4.jpg");
images.push("assets/5.jpg");
images.push("assets/6.jpg");

captions.push("Pikachu");
captions.push("Duck");
captions.push("Mario");
captions.push("Minion");
captions.push("Ice and Glass");
captions.push("Pretty Drink");

descriptions.push(
  "This is a picture of a Pikachu in the streets. Pikachu is a yellow pokemon."
);
descriptions.push(
  "This is a picture of a small duck. I've always loved ducks. Sometimes, I'll explain algorithms and problem-solving processes to an imaginary duck."
);
descriptions.push(
  "This is a picture of Mario. I am a big fan of Tanooki Mario in Mario Kart."
);
descriptions.push(
  "This is a picture of a Minion. I thought that Despicable Me was a decent movie series."
);
descriptions.push(
  "This is just a nice picture of some ice and glass that I found online."
);
descriptions.push(
  "This is a beautiful picture of a drink. I love purchasing tasty drinks. I would rather drink than eat, but I need to do both..."
);

loadImages(images);
loadCaptions(captions);
// loadDescriptions(descriptions) -> we don't need to load descriptions on this page

// ========== TEAM_ASSIGNMENT_3 ==========
// Add favorite and unfavorite buttons to each container
for (let i = 0; i < images.length; i++) {
  let containerNumber = i + 1;
  let containerID = "#container" + containerNumber;
  // console.log("containerID: " + containerID);

  let favoriteButton = document.createElement("button");
  favoriteButton.setAttribute("id", "favorite" + containerNumber);
  favoriteButton.setAttribute("class", "btn-container")
  favoriteButton.innerHTML = "Favorite";
  
  let unfavoriteButton = document.createElement("button");
  unfavoriteButton.setAttribute("class", "btn-container")
  unfavoriteButton.setAttribute("id", "unfavorite" + containerNumber);
  unfavoriteButton.innerHTML = "Unfavorite";
  
  let icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-heart fa-2x");
  icon.setAttribute("id", "icon" + containerNumber);
  icon.style.display = "none";

  // when favorite button is clicked, get the current image
  // store it as a cookie for 30 minutes, mapped to "favoritedImage"
  favoriteButton.addEventListener("click", () => {
    let cookieName = "favoritedImage" + (i+1);
    createCookie(cookieName, images[i], 30);

    console.log("FAVORITED current image: " + images[i]);

    favoriteButton.style.display = "none";
    icon.style.display = "inline-block";
  });
  
  // when unfavorite button is clicked, get the current image
  // delete the cookie value for it
  unfavoriteButton.addEventListener("click", () => {
    let cookieName = "favoritedImage" + (i+1);
    deleteCookie(cookieName);

    console.log("UNFAVORITED current image: " + images[i]);

    favoriteButton.style.display = "inline-block";
    icon.style.display = "none";
  });
  
  document.querySelector(containerID).appendChild(favoriteButton);
  document.querySelector(containerID).appendChild(icon);
  document.querySelector(containerID).appendChild(unfavoriteButton);
}



document.addEventListener("DOMContentLoaded", () => {
  // set icons to replace "favorite" button if the cookie exists
  for (let i = 0; i < images.length; i++) {
    let containerNumber = i + 1;
    let cookieName = "favoritedImage" + containerNumber;
    let favoriteButton = document.querySelector("#favorite" + containerNumber);
    let icon = document.querySelector("#icon" + containerNumber);

    if (getCookie(cookieName) != null) {
      // document.querySelector("#container" + (i+1)).style.backgroundColor = "red";
      favoriteButton.style.display = "none";
      icon.style.display = "inline-block";
    } else {
      favoriteButton.style.display = "inline-block";
      icon.style.display = "none";
    }
  }


});

// functions
function loadImages(images) {
  for (let i = 0; i < images.length; i++) {
    let imageNumber = i + 1; // account for arrays being 0-indexed
    let currImage = "#img" + imageNumber.toString(); // current image ID
    let currContainer = "#container" + imageNumber.toString();
    let imgAddress = images[i]; // current image address

    //TODO:
    let caption = captions[i];
    let description = descriptions[i];

    // this is where images are hosted, the src to render the initial images
    let srcUrl =
      "https://cis3110tommyho.s3.us-west-1.amazonaws.com/team_assignment2/" +
      imgAddress;
    // assign the corresponding src to the image
    document.querySelector(currImage).src = srcUrl;
    // this is the querystring to link to the corresponding detail page
    let hrefUrl =
      "tommyhoDetail.html?" +
      "img=" +
      srcUrl +
      "&caption=" +
      caption +
      "&description=" +
      description;
    // create an <a> element
    let link = document.createElement("a");
    // link the <a> element to the detail page
    link.href = hrefUrl;
    // append the <a> element to the container
    document.querySelector(currContainer).append(link);
    // append the image to the <a> element
    link.append(document.querySelector(currImage));
  }
}

function loadCaptions(captions) {
  for (let i = 0; i < captions.length; i++) {
    let captionNumber = i + 1; // account for arrays being 0-indexed
    let currCaption = "#caption" + captionNumber.toString(); // current caption ID
    let imgCaption = captions[i]; // current caption

    document.querySelector(currCaption).textContent = imgCaption;
  }
}

function loadDescriptions(descriptions) {
  for (let i = 0; i < images.length; i++) {
    let descriptionNumber = i + 1; // account for arrays being 0-indexed
    let currDescription = "#description" + descriptionNumber.toString(); // current image ID
    let imgDescription = descriptions[i]; // current image address

    document.querySelector(currDescription).textContent = imgDescription;
  }
}

// function to create cookie
function createCookie(name, value, minutes) {
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  let expires = "; expires=" + date.toUTCString() + ";";
  document.cookie = String(name) + "=" + String(value) + String(expires);
}

// delete cookie
function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
}

// get cookie
function getCookie(name) {
  let cookie = {};
  document.cookie.split(";").forEach((el) => {
    let [k, v] = el.split("=");
    cookie[k.trim()] = v;
  });
  return cookie[name];
}