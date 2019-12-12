import ky from 'ky-universal';

export default function createDrupalBlogClient(apiUrl) {
    return {
        async fetchPosts() {
            const result = await ky(apiUrl, {
                searchParams: {
                    display_id: 'services_1',
                },
                mode: 'cors',
                credentials: 'omit'
            }).json();

            const normalisedData = result.map(post => {
                console.log(post.categories)
                const normalisedPost = {
                    ...post,
                    title: post.node_title,
                    categories: post.categories.split("|").map(category => { return { "title": category } }),
                    _createdAt: post.date
                };
                return normalisedPost;
            });

            console.log(normalisedData);

            return normalisedData;
        }
    };
}
