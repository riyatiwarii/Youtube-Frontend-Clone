import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideos } from "../utils/dataSlice";
import { useSelector } from "react-redux";

const useVideos = (
  API_URL_PART_1,
  API_URL_PART_2,
  API_URL_PART_3,
  API_URL_PART_4
) => {
  const API_URL =
    API_URL_PART_1 + API_URL_PART_2 + API_URL_PART_3 + API_URL_PART_4;
  const { count } = useSelector((store) => store.countSlice);
  const [runAPI, setRunAPI] = useState(count);
  const categoryStatus = useSelector((state) => state.category.categoryStatus);
  const categoryId = useSelector((state) => state.category.categoryId);

  useEffect(() => {
    setRunAPI(count);
  }, [count]);

  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const handleAPIData = (data) => {
    dispatch(getVideos(data));
  };
  
  useEffect(() => {
    setData([]);
    getCard();
  }, [runAPI, categoryId]);

  useEffect(() => {
    handleAPIData([data, isLoading]);
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        getCard();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageToken]);

  async function getCard() {
    setIsLoading(true);
    let apiUrl;
    if (categoryStatus) {
      apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&key=AIzaSyA4OY3EkyINr3s5GtIZb2WsgFgswRwFlCA&videoCategoryId=${categoryId}&pageToken=${pageToken}`;
    } else {
      apiUrl = `${API_URL}&pageToken=${pageToken}`
    }

    const data = await fetch(apiUrl);
    const dataJson = await data.json();

    setPageToken(dataJson.nextPageToken);
    setIsLoading(false);
    setData((prevItems) => [...prevItems, ...dataJson?.items]);
  }

  return [data, isLoading];
};

export default useVideos;

// fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&key=AIzaSyBAaa0tRjEkM3XG96ef9WoNZGVLVJ89wvM&videoCategoryId=${categoryId}&pageToken=${pageToken}`)