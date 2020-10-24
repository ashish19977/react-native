import { ToastAndroid } from "react-native"

const fetchNews = async (newsFilter = {}) => {
    try {
        const { pageSize = 25 } = newsFilter
        let url = `https://newsapi.org/v2/top-headlines?country=${newsFilter.country}&category=${newsFilter.category}&pageSize=${pageSize}&apiKey=742be453b18d4c9c91d21042e0cca7da`
        const news = await fetch(url)
        let { status,totalResults,articles } = await news.json()
        if(status != 'ok'){
            ToastAndroid('Something went Wrong')
        }
        articles = articles.filter( article => article.title && article.description )
        articles.forEach(article => article.key = article.title)
        newsFilter.setData({ status,totalResults,articles })
    }
    catch(e){
        console.error(e)
    }
}

export { fetchNews }