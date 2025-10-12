import axios from "axios";

const API_KEY = "AIzaSyC6bGGDpOwsoLi3zie8G3wYQg6nd5e0wjc";

export async function fetchPlaylistVideos(playlistId) {
    try {
        const res = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
                part: "snippet,contentDetails",
                maxResults: 50,
                playlistId,
                key: API_KEY,
            },
        });

        return res.data.items.map(item => {
            const thumbnails = item.snippet.thumbnails || {};
            const thumbnail =
                thumbnails.medium?.url ||
                thumbnails.high?.url ||
                thumbnails.default?.url ||
                "";

            return {
                videoId: item.contentDetails?.videoId,
                title: item.snippet?.title || "Untitled",
                thumbnail,
                publishedAt: item.contentDetails?.videoPublishedAt || null,
            };
        });
    } catch (error) {
        console.error("YouTube API Error:", error.response?.data || error.message);
        return [];
    }
}
