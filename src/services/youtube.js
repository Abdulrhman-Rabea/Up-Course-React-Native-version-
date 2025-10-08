const API_KEY = 'AIzaSyC6bGGDpOwsoLi3zie8G3wYQg6nd5e0wjc';

// get playlist videos
export async function getPlaylistVideos(playlistId, maxResults = 10) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.items) throw new Error('No videos found');

        // clean up the response
        return data.items.map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
        }));
    } catch (error) {
        console.error('Error fetching playlist videos:', error);
        return [];
    }
}
