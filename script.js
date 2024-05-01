
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

let posts = [
   {                                          
    'author': 'Mary',
    'locationImage': './logo/location.webp',
    'image' : './img/america1.webp',
    'description': 'Hollywood',
    'location': 'Los Angeles',
    'comments' : [],
    'likes' : 67,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    'profil' : './img/profil6.webp',
    
   },
   {
    'author': 'Steffi',
    'locationImage': './logo/location.webp',
    'image' : './img/america2.webp',
    'description': 'Rodeo Drive',
    'location': 'Beverly Hills',
    'comments' : [],
    'likes' : 55,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    'profil' : './img/profil5.webp',
    
   },
   {
    'author': 'Max',
    'locationImage': './logo/location.webp',
    'image' : './img/america3.webp',
    'description': 'La jolla',
    'location': 'San Diego',
    'comments' : [],
    'likes' : 26,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    'profil' : './img/Profil4.webp',
  },
  {
    'author': 'Olaf',
    'locationImage': './logo/location.webp',
    'image' : './img/america4.webp',
    'description': 'Balboa Park',
    'location': 'San Diego',
    'comments' : [],
    'likes' : 15,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    'profil' : './img/Profil3.webp',
    
   },
   {
    'author': 'Piri Shankhan',
    'locationImage': './logo/location.webp',
    'image' : './img/america5.webp',
    'description': 'Antelope Canyon',
    'location': 'Arizona',
    'comments' : [],
    'likes' : 85,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    'profil' : './img/Profil2.webp',
    
   },
   {
    'author': 'Paul',
    'locationImage': './logo/location.webp',
    'profil' : './img/Profil1.webp',
    'image' : './img/america6.webp',
    'description': 'Horseshoe Bend',
    'location': 'Arizona',
    'comments' : [],
    'likes' : 8,
    'isLiked': false,
    'likeBtn': './logo/nonlike.webp',
    }
];
getPosts();

function show(){
  
  let content = document.getElementById('content');
  content.innerHTML = '';
  
  for(let i = 0; i < posts.length; i++){
       const element = posts[i];

       content.innerHTML += `
         <div class="post">
            <div class=post2>
              <div class="Head">
                <p>${element['author']}</p>
                <img src="${element['profil']}" alt="">
                </div>
                  <img class="image" src="${element['image']}" alt="">
                    <p>${element['description']}</p>
                      <div class="post3">
                        <div class="Location">
                         <p>${element['location']}</p>
                         <img src="${element['locationImage']}" alt="">
                          </div>
                          <div class="likeContainer">
                        <img onclick="openComment(${i})" class="logo" src="logo/comment.webp" alt="">
                        <div class="likeContainer2">
                        <p id="likeCount${i}">${element['likes']}</p>
                        <img onclick="likePosts(${i})" class="logo" id="likeButton${i}" src="${element['likeBtn']}" alt="">
                      </div>
                  </div>
                </div>
              </div>
          </div>
      `; 
    }

    save();
    getPosts();
    
}

function openComment(i){
  let section = posts[i];
  let open = document.getElementById('content2');
  open.innerHTML = `
  <div id="next" class="FullSize"> 
    <div class="blackbox">
      <img class="box-img" src="${section['image']}" alt="">
        </div>
        <div class="blackbox2">
        <div class="blackbox3">${section['author']}</div>
        <div class="blackbox4" id="comment${i}"></div>
        <div class="blackbox5">
        <input id="input${i}" placeholder="Kommentiere...">
      <button id="btn1" onclick="addComment(${i})">Posten</button>
    </div> 
   </div>
  </div>
 `; 

let comments = document.getElementById(`comment${i}`);

  for (let j = 0; j < section['comments'].length; j++) {
      const kommentar = section['comments'][j];

      comments.innerHTML += `
      <div class="commentSection1">
        <img src="./logo/piri.webp" alt="">
         <span class="commentSection">${kommentar} 
         <button onclick="deleteComment(${i})">Löschen</button>
         <button>Bearbeiten</button>
         </span>
      </div>`;
    }

   closeComment();
   save();
   getPosts();
}

function addComment(index){
  let input = document.getElementById(`input${index}`);
  if(input.value.length > 0){
    posts[index]['comments'].push(input.value);
    input.value = '';
    openComment(index);
  }else {
    alert('Write Something')
  }

  save();
  getPosts();
}

function deleteComment(i){
   posts[i]['comments'].splice(0,1);
  
  save();
  getPosts();
  openComment(i);
}

function closeComment(){
 let close = document.querySelector('#next');
  close.addEventListener('click', (e) => {
    if(e.target == close){
      document.querySelector('#content2').classList.add('d-none');
    }
  });
  document.querySelector('#content2').classList.remove('d-none');
}

function save(){
  let text = JSON.stringify(posts);
  localStorage.setItem('post', text);
}

function getPosts(){
  let text = localStorage.getItem('post');
  if(text){
  posts = JSON.parse(text);
  }
}

function loadCount(i){
  let post = posts[i];
  let likes = document.getElementById(`likeCount${i}`);
  let button = document.getElementById(`likeButton${i}`)

  likes.innerHTML = post['likes'];
  button.src = post['likeBtn']
}

function likePosts(i){
    let post = posts[i]
     
    if(!post['isLiked']){
      post['likeBtn'] = './logo/like.webp';
      post['likes']++;
      post['isLiked'] = true;
      } else {
      post['likeBtn'] = './logo/nonlike.webp'
      post['likes']--;
      post['isLiked'] = false;
    }
    
  save();
  loadCount(i);
}







  
    
  
 
  




 
  