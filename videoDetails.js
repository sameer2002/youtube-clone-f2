const API_KEY = 'AIzaSyCNrI9-FmKrpDL7r2UsrWsaoih9SVx5OHA';

// Function to fetch the video ID from the URL
function getVideoIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('videoId');
}

// Define the API URL for fetching video details
const DETAILS_API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,status&key=${API_KEY}`;

// Function to fetch and render video details
async function fetchAndRenderVideoDetails(videoId) {
    try {
      // Fetch the data
      const response = await fetch(`${DETAILS_API_URL}&id=${videoId}`);
      const data = await response.json();
  
      // Get the videoDetails div
      const videoDetailsDiv = document.getElementById('video-containers');
  
      // Check if the video data exists
      if (data.items.length > 0) {
        // Get the video data
        const videoData = data.items[0];
  
        // Create an iframe for the YouTube player
        const iframe = document.createElement('iframe');
  
        // Set the iframe source to the YouTube player URL for the selected video
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
        // Set some attributes
        iframe.setAttribute('frameborder', '1');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', '');
  
        // Append the iframe to the videoDetails div
        videoDetailsDiv.appendChild(iframe);
      /* <h2>${videoData.snippet.title}</h2>
          <p>${videoData.snippet.description}</p>
          <p>Views: ${videoData.statistics.viewCount}</p>
          <p>Likes: ${videoData.statistics.likeCount}</p>
          <p>Dislikes: ${videoData.statistics.dislikeCount}</p>
          <p>Comments: ${videoData.statistics.commentCount}</p>
          <p>Duration: ${videoData.contentDetails.duration}</p>*/
        // Set the inner HTML of the videoDetails div
        videoDetailsDiv.innerHTML += `
        <h2>${videoData.snippet.title}</h2>
        <div class="channel-details">
            <img src="https://images.unsplash.com/photo-1488372759477-a7f4aa078cb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="" srcset="">
            <p class="chanel-name">
            ${videoData.snippet.channelTitle}
            </p>
            <button>Subscribe</button>
        </div>
        <div class="likes">
            <p >
                <span class="material-symbols-outlined">
                    thumb_up
                </span> 
               <p>${videoData.statistics.likeCount}</p>
            </p>
            <p id="like">
                <span class="material-symbols-outlined">
                    thumb_down
                    </span>
            </p>
        </div>
        <div class="description">
            <div class="viewsnumber">
             Views: ${videoData.statistics.viewCount} 
            </div>
            <p>${videoData.snippet.description}</p>
        </div>
        <div class="comments-number">
        Comments: ${videoData.statistics.commentCount}
        </div>
        `;
      } else {
        videoDetailsDiv.innerHTML = 'No video data found';
      }
    } catch (error) {
      console.error('Failed to fetch and render video details:', error);
    }
  }
  
  // Fetch and render video details when the script loads
  //fetchAndRenderVideoDetails(getVideoIdFromUrl());
  





 // In videoDetails.js

// ... (other code)

// Define the API URL for fetching video comments


// Function to fetch and render video comments
async function fetchAndRenderVideoComments(videoId) {
    const COMMENTS_API_URL = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=5`;
  try {
    // Fetch the comments data
    const response = await fetch(COMMENTS_API_URL);
    const data = await response.json();
     console.log(data)
    // Get the videoDetails div
    const videoDetailsDiv = document.getElementById('comments-containers');

    // Create a comments container to hold the comments and replies
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('comments-container');

    // Render each comment and its replies
    data.items.forEach((item) => {
      const commentData = item.snippet.topLevelComment.snippet;
      const commentElement = createCommentElement(commentData);
      commentsContainer.appendChild(commentElement);

      // Check if there are replies
      if (item.replies && item.replies.comments.length > 0) {
        // Render each reply
        item.replies.comments.forEach((reply) => {
          const replyData = reply.snippet;
          const replyElement = createCommentElement(replyData, true);
          commentsContainer.appendChild(replyElement);
        });
      }
    });

    // Append the comments container to the videoDetails div
    videoDetailsDiv.appendChild(commentsContainer);
  } catch (error) {
    console.error('Failed to fetch and render video comments:', error);
  }
}

// Function to create a comment element
function createCommentElement(commentData, isReply = false) {
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');

  const author = commentData.authorDisplayName;
  const text = commentData.textDisplay;

  const commentInfo = document.createElement('p');
  commentInfo.innerHTML = `<strong>${author}</strong>: ${text}`;

  if (isReply) {
    commentElement.classList.add('reply');
    commentInfo.classList.add('reply-info');
  }

  commentElement.appendChild(commentInfo);
  return commentElement;
}

// Fetch and render video details and comments when the script loads
const videoId = getVideoIdFromUrl();
fetchAndRenderVideoDetails(videoId);
fetchAndRenderVideoComments(videoId);


const CHANNEL_ID = 'UCBwmMxybNva6P_5VmxjzwqA';
let url2=`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5`;
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
        
    });
  }