import ContentBasedRecommender from "content-based-recommender";

const posts = [
    {
        id: "1000001",
        content: "Why studying javascript is fun?",
    },
    {
        id: "1000002",
        content: "The trend for javascript in machine learning",
    },
    {
        id: "1000003",
        content: "The most insightful stories about JavaScript",
    },
    {
        id: "1000004",
        content: "Introduction to Machine Learning",
    },
    {
        id: "1000005",
        content: "Machine learning and its application",
    },
    {
        id: "1000006",
        content: "Python vs Javascript, which is better?",
    },
    {
        id: "1000007",
        content: "How Python saved my life?",
    },
    {
        id: "1000008",
        content: "The future of Bitcoin technology",
    },
    {
        id: "1000009",
        content: "Is it possible to use javascript for machine learning?",
    },
];

const tags = [
    {
        id: "1",
        content: "Javascript",
    },
    {
        id: "2",
        content: "machine learning",
    },
    {
        id: "3",
        content: "application",
    },
    {
        id: "4",
        content: "introduction",
    },
    {
        id: "5",
        content: "future",
    },
    {
        id: "6",
        content: "Python",
    },
    {
        id: "7",
        content: "Bitcoin",
    },
];

const tagMap = tags.reduce((acc, tag) => {
    acc[tag.id] = tag;
    return acc;
}, {});
console.log(tagMap);
const recommender = new ContentBasedRecommender();

recommender.trainBidirectional(posts, tags);

for (let post of posts) {
    const relatedTags = recommender.getSimilarDocuments(post.id);
    const tags = relatedTags.map((t) => tagMap[t.id].content);
    // console.log(post.content, "related tags:", tags);
}
