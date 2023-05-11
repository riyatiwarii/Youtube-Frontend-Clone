export const SUGGESTIONS_URL = "http://suggestqueries.google.com/complete/search?client=firefox&q="
export const API_URL_PART_1 = "https://youtube.googleapis.com/youtube/v3/";
export const API_KEY = "&key=AIzaSyBMSVrr5nhDlc7U5p-w9i5mRjgk7sXda08"
export const API_DEFAULT_PART_2_URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=12&chart=mostPopular&regionCode=IN";
export const API_URL_SEARCH_PART_2 = "search?part=snippet&maxResults=16&type=video&q=";
export const API_SERACH_TEXT = "";

// https://www.googleapis.com/youtube/v3/search?key=AIzaSyDb2gLtHxUekWHm7ED878eqb1H9cAayfZc&part=snippet&relatedToVideoId=[VIDEO_ID]&type=video&maxResults=12
// https://www.googleapis.com/youtube/v3/search?key=AIzaSyDb2gLtHxUekWHm7ED878eqb1H9cAayfZc&part=snippet&relatedToVideoId=scNmYjoR-qM&type=video&maxResults=12

const API_URL = API_URL_PART_1 + API_DEFAULT_PART_2_URL + API_SERACH_TEXT + API_KEY;

export const SEARCH_API_URL = API_URL_PART_1 + API_URL_SEARCH_PART_2 + API_SERACH_TEXT + API_KEY;

export default API_URL;

export const commentsData = [
  {
    id: 1,
    body: "I think this topic is very interesting.",
    author: "Karen Smith",
    replies: [
      {
        id: 2,
        body: "I agree with you, Karen!",
        author: "Bob Johnson",
        replies: [
          {
            id: 3,
            body: "I also find it fascinating.",
            author: "Emily Davis",
            replies: [
              {
                id: 4,
                body: "Yes, this is a great discussion.",
                author: "Bob Johnson",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    body: "I have a different perspective on this topic.",
    author: "Michael Lee",
    replies: [
      {
        id: 6,
        body: "Interesting, can you share more about your viewpoint?",
        author: "Karen Smith",
        replies: [
          {
            id: 7,
            body: "I'm also curious to hear more.",
            author: "Emily Davis",
            replies: [
              {
                id: 8,
                body: "Me too!",
                author: "Bob Johnson",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    body: "I think we should all try to keep an open mind.",
    author: "Sarah Brown",
    replies: [
      {
        id: 10,
        body: "I completely agree, Sarah.",
        author: "Michael Lee",
        replies: [],
      },
      {
        id: 11,
        body: "Well-said, Michael.",
        author: "Jordan Cooper",
        replies: [],
      },
    ],
  },
];
