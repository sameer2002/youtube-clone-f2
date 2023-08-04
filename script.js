const apiKey ="AIzaSyCNrI9-FmKrpDL7r2UsrWsaoih9SVx5OHA";

const baseUrl=`https://www.googleapis.com/youtube/v3`;
/** @param {String} searchString;*/

const searchButon=document.getElementById("search");
const searchInput=document.getElementById("search_input");
const container=document.getElementById("container")
const content=document.getElementById("content")

searchButon.addEventListener("click",() =>{
    let searchString=searchInput.value.trim();
    if(searchString==""){
        return
    }
   
    getSearchResult(searchString);
    
    content.style.display = "none";
})

async function getSearchResult(searchString){
    let url=`${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=20`;
    try {
        // Fetch the data
        const response = await fetch(url);
        const result=await response.json();
    console.log(result)
    addDataOntoUI(result.items);
        // Get the content div
        
      } catch (error) {
        console.error('Failed to fetch and render videos:', error);
      }
    
}

function addDataOntoUI(videoList){

    videoList.forEach((video) => {
        const {snippet}=video;
        if (video.id.kind !== 'youtube#video') {
            return;
          }
        const videoElement=document.createElement("div");
        videoElement.className="video";
        videoElement.innerHTML=`
        <img src="${snippet.thumbnails
            .high.url}"
           alt="" data-id="${video.id.videoId}">
           <div class="title-div">
              <p>${snippet.title} </p>
              <b>${snippet.channelTitle}</b>
           </div>
        `;
        container.appendChild(videoElement);
        videoElement.querySelector('img').addEventListener('click', (event) => {
            // Get the video ID from the data-id attribute
            const videoId = event.target.getAttribute('data-id');
    
            // Redirect to the video details page
            window.location.href = `videoDetails.html?videoId=${videoId}`;
          });
        
    });

}
const CHANNEL_ID = 'UCBwmMxybNva6P_5VmxjzwqA';
let url2=`${baseUrl}/search?key=${apiKey}&channelId=${CHANNEL_ID }&part=snippet,id&order=date&maxResults=20`;
async function fetchAndRenderVideos() {
    try {
      // Fetch the data
      const response = await fetch(url2);
      const data = await response.json();
      console.log(data)
        renderData(data.items)
      // Get the content div
      
    } catch (error) {
      console.error('Failed to fetch and render videos:', error);
    }
  }
  
  // Fetch and render videos when the script loads
  fetchAndRenderVideos();
  function renderData(videoList){
    
    videoList.forEach((video) => {
        const {snippet}=video;
        const videoElement=document.createElement("div");
        videoElement.className="video";
        videoElement.innerHTML=`
        <img src="${snippet.thumbnails
            .high.url}"
           alt="" data-id="${video.id.videoId} ">
           <div class="title-div">
             <p>${snippet.title} </p>
             <b>${snippet.channelTitle}</b>
          </div>
        `;
        content.appendChild(videoElement)
          videoElement.querySelector('img').addEventListener('click', (event) => {
            // Get the video ID from the data-id attribute
            const videoId = event.target.getAttribute('data-id');
    
            // Redirect to the video details page
            window.location.href = `videoDetails.html?videoId=${videoId}`;
          });
        
    });
  }



 